# Deploy pe AWS — Elastic Beanstalk

Aplicația rulează ca un singur container Docker pe Elastic Beanstalk, cu Postgres în RDS și
fișierele media în S3.

## De ce Beanstalk și nu ECS

Beanstalk administrează instanța (deploy, log-uri, health check, rollback); ECS ar cere în plus
un load balancer, care costă singur ~18 $/lună. Pentru un singur site nu aduce nimic în schimb.
Mediul se creează **single instance**, adică fără load balancer.

Cost lunar orientativ (eu-central-1): instanță t3.small ~15 $, disc ~2 $, RDS db.t4g.micro
~13 $ + ~3 $ stocare, S3 și CloudFront câțiva cenți. Deci **~33 $/lună**, din care jumătate
este baza de date.

## Ce se creează, în ordine

| Pas | Serviciu | De ce |
|---|---|---|
| 1 | RDS Postgres | tot conținutul din CMS: articole, produse, proiecte, utilizatori admin |
| 2 | S3 | fișierele încărcate din `/admin` |
| 3 | IAM | un utilizator cu drepturi doar pe acel bucket |
| 4 | ECR | imaginea Docker construită local sau în CI |
| 5 | Beanstalk | rulează imaginea |
| 6 | CloudFront + ACM | HTTPS și cache pentru fișierele statice |

## 1. RDS Postgres

- Engine **PostgreSQL 17**, template *Production* sau *Dev/Test*, clasă **db.t4g.micro**,
  20 GB gp3, **Single-AZ** (Multi-AZ dublează costul).
- **Public access: No.** Baza rămâne în subnetul privat; nu se conectează nimeni de pe laptop.
- Notează endpointul, portul, userul și parola: intră în `DATABASE_URI`.
- Grupul de securitate al bazei: intrare pe portul **5432 doar dinspre grupul de securitate al
  instanței Beanstalk** (se completează după pasul 5), nu dinspre `0.0.0.0/0`.

## 2. S3 pentru media

- Bucket nou, ex. `almek-media-prod`, în aceeași regiune.
- **Block all public access: pornit.** Fișierele sunt servite prin aplicație, care verifică
  drepturile; bucketul nu trebuie să fie public.

## 3. IAM

Utilizator nou, fără acces la consolă, cu chei de acces și această politică (înlocuiește numele
bucketului):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow", "Action": ["s3:ListBucket"], "Resource": "arn:aws:s3:::almek-media-prod" },
    { "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::almek-media-prod/*" }
  ]
}
```

## 4. ECR — construiește și urcă imaginea

Din rădăcina proiectului, cu `CONT` = ID-ul contului AWS și `REGIUNE` = regiunea:

```bash
aws ecr create-repository --repository-name almek --region REGIUNE
aws ecr get-login-password --region REGIUNE | docker login --username AWS --password-stdin CONT.dkr.ecr.REGIUNE.amazonaws.com

docker build -t almek:latest .
docker tag almek:latest CONT.dkr.ecr.REGIUNE.amazonaws.com/almek:latest
docker push CONT.dkr.ecr.REGIUNE.amazonaws.com/almek:latest
```

Imaginea se construiește **local sau în CI, niciodată pe instanță**: `next build` cere ~2 GB și
ar epuiza memoria unei instanțe mici.

Completează același URI în `Dockerrun.aws.json` (câmpul `Image.Name`).

## 5. Mediul Beanstalk

- Aplicație nouă → mediu **Web server**, platformă **Docker pe 64bit Amazon Linux 2023**.
- Capacitate: **Single instance**, tip **t3.small**. (Pe `t4g.small`, cu ~20% mai ieftin,
  imaginea trebuie construită pentru ARM — vezi comentariul din `Dockerfile`.)
- Rolul instanței are nevoie de politica `AmazonEC2ContainerRegistryReadOnly`, altfel nu poate
  descărca imaginea din ECR.
- Variabile de mediu (Configuration → Updates, monitoring and logging → Environment properties):

| Variabilă | Valoare |
|---|---|
| `DATABASE_URI` | `postgres://user:parola@endpoint-rds:5432/almek` |
| `PAYLOAD_SECRET` | șir aleator lung: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `S3_BUCKET` | `almek-media-prod` |
| `S3_REGION` | regiunea bucketului |
| `S3_ACCESS_KEY_ID` | cheia de la pasul 3 |
| `S3_SECRET_ACCESS_KEY` | secretul de la pasul 3 |

- Pachetul de deploy este un zip cu **`Dockerrun.aws.json` și folderul `.platform/`** în
  rădăcină (nu într-un subfolder):

```powershell
Compress-Archive -Path Dockerrun.aws.json, .platform -DestinationPath deploy.zip -Force
```

- După prima pornire, completează regula de intrare a bazei de date (pasul 1) cu grupul de
  securitate al instanței.

## 6. HTTPS prin CloudFront

Mediul rămâne fără load balancer, deci instanța nu are certificat propriu. HTTPS-ul îl face
CloudFront, care stă în fața ei:

- **Certificat ACM în regiunea us-east-1** (CloudFront acceptă certificate doar de acolo), pentru
  domeniu și `www`. Validare prin DNS.
- **Origine**: adresa mediului Beanstalk (`…elasticbeanstalk.com`), protocol *HTTP only*, port 80.
- **Comportamente**, în această ordine:
  - `/_next/static/*`, `/models/*`, `/images/*` → politica *CachingOptimized*: fișiere
    imutabile, cu hash în nume sau schimbate doar la deploy.
  - implicit (`*`) → *CachingDisabled* și *AllViewer* (toate antetele, cookie-urile și
    parametrii transmiși), altfel autentificarea din `/admin` și coșul nu funcționează.
  - *Viewer protocol policy*: **Redirect HTTP to HTTPS**; metode permise: toate
    (`GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`), pentru admin și API.
- **DNS**: domeniul arată spre distribuția CloudFront (Route 53 alias sau CNAME la registrar).
- După un deploy care schimbă fișierele din `public/`, invalidează `/models/*` și `/images/*`.

Load balancerul se poate adăuga oricând mai târziu (~18 $/lună în plus), fără schimbări în cod.

## 7. Primul utilizator admin

După ce mediul e verde, deschide `https://domeniu/admin`. Payload cere crearea primului cont.
Nu există utilizator implicit.

## Ce se întâmplă la fiecare deploy

1. `docker build` + `docker push` (pasul 4).
2. `eb deploy` sau încărcarea unui zip nou în consolă.
3. La pornire, aplicația rulează singură **migrările nerulate** din `src/migrations`
   (`prodMigrations` în `src/payload.config.ts`). Nu există pas manual de migrare.

## După o schimbare de colecție

Schema producției se schimbă **numai prin migrări comise** (în producție `push` e oprit):

```bash
docker start almek-db          # Postgres local
npm run migrate:create         # generează migrarea și actualizează src/migrations/index.ts
git add src/migrations && git commit
```

## Capcane cunoscute

- **nginx limitează încărcările la 1 MB** implicit. `.platform/nginx/conf.d/uploads.conf` ridică
  limita la 25 MB; fără el, orice imagine urcată din `/admin` primește 413.
- **Baza de date nu e accesibilă de pe laptop** (subnet privat). Pentru inspecție, folosește un
  tunel SSH prin instanță sau RDS Query Editor.
- **`sharp`** e copiat explicit în imagine, împreună cu binarele lui din `@img`: urmărirea de
  fișiere a lui Next îl ratează des, iar fără el redimensionările din colecția Media cad.
- **Paginile din CMS nu sunt prerandate** (`connection()` în `src/lib/cms.ts`), deci build-ul nu
  are nevoie de acces la baza de date. Nu adăuga variabile de bază de date în etapa de build.
