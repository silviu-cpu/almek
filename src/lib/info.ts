/* ---------------------------------------------------------------------------
   Continutul paginilor din meniul "Informatii", preluat de pe almekwoodarch.ro.

   Nu trece prin CMS: layout-urile sunt facute pe masura (carduri de pret, pasi
   numerotati, acordeon), iar textul e tehnic si stabil. Intr-un editor de text
   bogat s-ar pierde exact structura care le face lizibile.

   PRETURILE sunt copiate identic de pe site. Nu exista o alta sursa care sa le
   confirme — trebuie verificate inainte de publicare.
   --------------------------------------------------------------------------- */

import type { StaticImageData } from "next/image";

import { variantImages, type InfoImage } from "./variante-images";

import aboutAtelier from "../../public/images/despre/atelier.png";
import aboutDetaliu from "../../public/images/despre/detaliu-lemn.png";
import aboutEchipa from "../../public/images/despre/echipa.png";
import aboutInterior from "../../public/images/despre/interior.png";
import aboutMontaj from "../../public/images/despre/montaj.png";
import stepsImbinare from "../../public/images/etape/imbinare.png";
import stepsSantier from "../../public/images/etape/santier.png";
import processMontajIzolatie from "../../public/images/procesul-tehnologic/montaj-izolatie.jpg";
import processMontajLanteti from "../../public/images/procesul-tehnologic/montaj-lanteti.png";
import processPremontaj from "../../public/images/procesul-tehnologic/premontaj.png";
import wallDubluA from "../../public/images/procesul-tehnologic/perete-dublu-a.png";
import wallDubluB from "../../public/images/procesul-tehnologic/perete-dublu-b.png";
import wallLambrisatA from "../../public/images/procesul-tehnologic/perete-lambrisat-a.png";
import wallLambrisatB from "../../public/images/procesul-tehnologic/perete-lambrisat-b.png";
import wallSimpluA from "../../public/images/procesul-tehnologic/perete-simplu-a.jpg";
import wallSimpluB from "../../public/images/procesul-tehnologic/perete-simplu-b.jpg";
import woodCasa from "../../public/images/de-ce-lemn/casa-lemn.png";
import woodFibra from "../../public/images/de-ce-lemn/fibra-lemn.png";

export type InfoSection = { title: string; body: string[] };
export type ProcessStep = { nr: string; title: string; body: string };
export type Faq = { question: string; answer: string[] };

/* --- Despre noi -------------------------------------------------------- */

export const aboutLead =
  "ALMEK desfășoară ca activitate de bază tâmplăria și dulgheria din lemn care se finalizează în: case de locuit, căsuțe de vacanță, căsuțe de grădina, mobilier de grădina, obiecte de mobilier și decorative pentru amenajare spațiului interior privat și public.";

export const aboutIntro: string[] = [
  "Suntem o echipă care valorizează un mediu de viață ecologic și sănătos. Având în vedere aceste valori, ne-am organizat producția într-un mod în care să lase generațiile viitoare cu un mediu de viață demn.",
  "Printr-o exploatare responsabilă urmată de o împădurire constantă, lemnul ne poate transforma mediul construit în unul sănătos și de durată.",
];

/** Imaginile de deschidere, langa `aboutIntro`: cea mare si detaliul decalat peste colt. */
export const aboutIntroImages = {
  main: {
    image: aboutAtelier,
    alt: "Îmbinare de grinzi din lemn masiv în atelierul ALMEK",
  },
  detail: {
    image: aboutDetaliu,
    alt: "Fibra lemnului de rășinoase folosit în construcție, în prim-plan",
  },
};

export type AboutStoryBlock = {
  body: string[];
  image: StaticImageData;
  alt: string;
};

/**
 * „Angajamentul nostru" de pe live, impartit in trei blocuri, fiecare langa o
 * imagine. Textul e neschimbat — doar regrupat. Primul paragraf al primului
 * bloc e randat ca citat, deci trebuie sa ramana fraza scurta despre pasiune.
 */
export const aboutStory: AboutStoryBlock[] = [
  {
    body: [
      "Pasiunea noastră pentru lemn nu este doar o meserie – este o artă pe care o trăim zi de zi.",
      "Suntem o echipă de oameni dedicați, inspirați de frumusețea naturală a lemnului și de dorința de a transforma această resursă nobilă în spații care aduc confort, armonie și autenticitate.",
      "Cu măiestrie și atenție la fiecare detaliu, prelucrăm lemnul pentru a da viață locuințelor calde și primitoare, căsuțelor de grădină pline de farmec, teraselor elegante, foișoarelor și pergolelor rafinate, dar și pieselor de mobilier interior și exterior care îmbină funcționalitatea cu estetica.",
    ],
    image: aboutEchipa,
    alt: "Casă din lemn masiv construită de echipa ALMEK",
  },
  {
    body: [
      "Fiecare proiect poartă amprenta respectului nostru pentru natură, pentru tradiție și pentru clienții care ne aleg.",
      "Ne angajăm să oferim soluții personalizate, construite cu grijă, durabilitate și design contemporan – pentru ca fiecare element din lemn să devină o expresie a confortului și a rafinamentului.",
    ],
    image: aboutInterior,
    alt: "Interior amenajat cu mobilier și finisaje din lemn masiv",
  },
  {
    body: [
      "Trăim într-o lume care redescoperă esența echilibrului. A venit momentul să învățăm să ne dezvoltăm în armonie cu natura, bazându-ne pe principii durabile și responsabile. Valorile se transformă — iar odată cu ele, și modul nostru de a privi viața și resursele din jur.",
      "Materialismul și risipa lasă loc respectului pentru natură, pentru meșteșugul autentic și pentru simplitatea care durează în timp. Ne îndepărtăm de consumerism și de irosirea resurselor, alegând conștient sustenabilitatea, calitatea și durabilitatea.",
      "La Almek Wood Arch credem că lemnul ne reconectează la originile noastre, la ritmul natural al vieții. Prin munca noastră, închidem cercul — readucem în prezent legătura autentică dintre om și natură, reinterpretată într-o formă modernă, funcțională și estetică.",
    ],
    image: aboutMontaj,
    alt: "Casă din lemn în curs de montaj la locul destinației",
  },
];

/** Cele patru valori — fiecare de o fraza, deci stau ca patru carduri egale. */
export const aboutValues: InfoSection[] = [
  {
    title: "Grijă față de mediul înconjurător",
    body: [
      "Pe tot parcursul activității noastre avem permanent în atenție impactul asupra mediului și reducerea acestuia.",
    ],
  },
  {
    title: "Profesionalism în relația cu furnizorii",
    body: [
      "Acordăm o atenție deosebită selecției furnizorilor. Avem relații foarte strânse cu fiecare dintre aceștia, bazate pe încredere și respect reciproc. Selectăm doar furnizori care dețin certificări și exploatează responsabil.",
    ],
  },
  {
    title: "Țintă spre rezultate excelente",
    body: [
      "Suntem preocupați de atingerea obiectivelor strategice stabilite. Ne mobilizăm să ne îmbunătățim în permanență produsele oferite și să reducem semnificativ amprenta de carbon a mediului construit, să fim într-un continuu progres urmărind pașii dezvoltării durabile.",
    ],
  },
  {
    title: "Respectul față de angajați",
    body: [
      "Noi credem în potențialul fiecărei persoane. Suntem o echipă formată din profesioniști, suntem onești, receptivi față de nou, flexibili și dornici de a realiza lucruri deosebite.",
    ],
  },
];

/* --- Etapele necesare --------------------------------------------------- */

export const stepsIntro: string[] = [
  "Pentru a vă face o imagine în ansamblu asupra a ceea ce trebuie luat în considerare înainte de începerea procesului de construcție, și pentru a vă ajuta să planificați „etapele necesare”, am compilat câțiva pași de îndrumare, ce vă vor ajuta la evitarea surprizelor neplăcute care pot apărea dacă un detaliu important este uitat.",
  "Puteți găsi răspunsuri la multe întrebări în secțiunea Întrebări frecvente, iar dacă aveți nevoie de informații suplimentare puteți completa formularul de contact și noi vă vom răspunde la toate întrebările.",
];

/** Imaginile de langa `stepsIntro`: cea mare si detaliul decalat peste colt. */
export const stepsIntroImages = {
  main: {
    image: stepsSantier,
    alt: "Casă din lemn în construcție, pe șantier",
  },
  detail: {
    image: stepsImbinare,
    alt: "Îmbinare de grinzi din lemn masiv, în detaliu",
  },
};

/*
 * Pe site pasul „Îmbinarea lemnului" apare de doua ori, identic, iar ultimul
 * bloc poarta titlul „Prelucrarea interiorului" desi textul lui vorbeste despre
 * predare si receptie. Duplicatul a fost scos, iar ultimul pas a primit titlul
 * care ii descrie continutul.
 */
export const steps: ProcessStep[] = [
  {
    nr: "01",
    title: "Discuția inițială",
    body: "Hai să discutăm împreună despre procesul de construire a casei. Vom răspunde la întrebări și vom oferi sfaturi cu privire la teren, dimensiunea casei, timpul de construcție și buget. Dacă este necesar, vă vom ajuta să găsiți un arhitect. Consultația este întotdeauna gratuită.",
  },
  {
    nr: "02",
    title: "Planurile construcției",
    body: "Pentru a face o ofertă inițială, aveți nevoie de o idee despre dimensiunea și soluția arhitecturală a casei. O simplă schiță este suficientă pentru a începe. De asemenea, putem lua ca bază unul dintre proiectele noastre anterioare sau soluții standard, pe care le adaptăm nevoilor clientului.",
  },
  {
    nr: "03",
    title: "Ofertă de preț",
    body: "Odată ce deciziile importante au fost luate, convenim asupra unui buget precis și a unui plan de execuție a lucrărilor. Dacă doriți să faceți o parte din lucrare singuri sau să o comandați de la altă parte, vom lua în considerare acest lucru. Totuși, credem că cea mai bună calitate este garantată de o soluție completă.",
  },
  {
    nr: "04",
    title: "Autorizație de construire",
    body: "Înainte de semnarea unui contract, trebuie să ne asigurăm că locuința poate fi construită în locația dorită. Pentru a face acest lucru, trebuie să solicitați o autorizație de construire de la autoritățile locale. Procesul de solicitare a unei autorizații de la autoritățile locale durează aproximativ 2 săptămâni.",
  },
  {
    nr: "05",
    title: "Contractul",
    body: "Contractul specifică domeniul de aplicare final al lucrărilor, programul și condițiile de plată. După semnarea contractului și plata avansului, vom începe lucrările.",
  },
  {
    nr: "06",
    title: "Proiectul de lucru",
    body: "Inginerul nostru va pregăti desenele finale, pe baza cărora casa va intra în producție. În această etapă, putem încă rafina și modifica detaliile și soluțiile nodurilor. De asemenea, este înțelept să stabiliți un plan final al camerei.",
  },
  {
    nr: "07",
    title: "Producția pereților",
    body: "Prelucrarea lemnului pentru confecționarea structurilor se face în hala noastră. Echipe specializate își folosesc priceperea și experiența celor 20 de ani pentru a transforma lemnul uscat și atent pregătit într-o construcție durabilă.",
  },
  {
    nr: "08",
    title: "Îmbinarea lemnului",
    body: "Bucățile de lemn sunt special prelucrate, apoi îmbinate în hala noastră, unde întreaga construcție este ridicată pentru prima oară, într-o hală special amenajată, apoi demontată cu mare grijă. Fiecare piesă este special marcată, urmând să fie adusă la locația beneficiarului pentru a fi asamblată în locația finală.",
  },
  {
    nr: "09",
    title: "Prelucrarea interiorului",
    body: "Executăm lucrări de amenajări interioare cu ajutorul propriilor dulgheri sau al unor parteneri cu experiență. Toate detaliile sunt discutate cu clientul în prealabil la momentul facerii ofertei și sunt uneori ajustate ulterior, în mod continuu.",
  },
  {
    nr: "10",
    title: "Predarea și recepția",
    body: "După finalizarea construcției, se semnează un certificat de predare și recepție, ceea ce încheie construcția actuală. Beneficiarul încă ne poate contacta în continuare, fie pentru eventuale extinderi, pentru servicii post-vânzare sau alte intervenții asupra construcției. De asemenea, se solicită recepția de la autoritățile locale. După emiterea acesteia, procesul de construire este complet recunoscut de către autorități.",
  },
];

/* --- Întrebări frecvente ------------------------------------------------ */

/* Pe site intrebarea „Cat dureaza constructia casei ?" apare de doua ori, cu
   raspuns identic; a fost pastrata o singura data. */
export const faqs: Faq[] = [
  {
    question: "Cât costă construcția unei case?",
    answer: [
      "Costul depinde de Varianta Grosimii Pereților necesară zonei de amplasare a casei și de complexitatea Proiectului.",
      "Prețurile pe mp, cât și Variantele Grosimii Pereților, le puteți vizualiza în pagina Variante și costuri.",
    ],
  },
  {
    question: "Ce tip de fundație este necesară pentru o casă din lemn?",
    answer: [
      "Fundația se realizează în funcție de Studiul Geo întocmit de un geo-tehnician autorizat și în funcție de sarcinile de greutate ale construcției.",
      "Casa din lemn poate fi așezată pe oricare dintre tipurile de fundație folosite în construcția de case, condițiile oferite de terenul pe care va fi amplasată fiind însă hotărâtoare.",
      "Vă recomandăm realizarea unei fundații din beton armat, deasupra căreia va fi turnată o placă betonată armată, această soluție oferind durabilitate Proiectului.",
    ],
  },
  {
    question: "Cât durează construcția casei?",
    answer: [
      "Durata de fabricație pentru construcția Casei depinde de complexitatea Proiectului.",
      "Casele se pre-montează la sediul de producție, se demontează după vizitele necesare, se livrează și se montează final la locul destinației.",
      "În general, pentru construcția unei case cu o suprafață medie de 100 mp, durează 1 lună la sediul de producție și în jur de 2 săptămâni pe teren, la locul destinației.",
    ],
  },
  {
    question: "Va trebui Proiect pentru construirea casei din lemn?",
    answer: [
      "În general, da. Depinde de legile Administrației locale.",
      "Autorizația de Construire se emite de către Primărie, pe baza Proiectului, a Certificatului de Urbanism și a Avizelor necesare.",
    ],
  },
  {
    question: "Ce trebuie să asigure Beneficiarul?",
    answer: [
      "Beneficiarul trebuie să asigure următoarele Domenii de Activitate, cu Firmă Autorizată în domeniul respectiv, deoarece acestea reprezintă materiale auxiliare necesare finalizării construcției, materiale care nu țin de domeniul nostru de activitate. De asemenea, ne oferim disponibilitatea informării spre furnizorii acestor materiale necesare sau putem evalua, în funcție de alegeri și de preferințe, și introduce în costul inițial al construcției casei:",
      "Proiectul Autorizat, cu detaliile necesare pentru execuție și Autorizația de Construire.",
      "Ignifugare, dacă se dorește, operație care se va stabili împreună și cu constructorul, la sediul de producție, deoarece vor trebui realizate câteva teste pe material. Pentru garanție totală asupra cauzelor de incendiu, se recomandă ignifugarea construcției cu Firmă Autorizată în domeniu.",
      "Transport construcție la locul destinației.",
      "Învelitoarea, folia anti condens și dispersie, accesoriile și jgheaburile – se plasează peste acoperiș: țiglă ceramică, tablă ambutisată, olană etc., în funcție de ceea ce se dorește sau de ceea ce se impune de către zona în care construcția va fi amplasată.",
      "Costul montajului învelitoarei, doar dacă aceasta este alta decât țiglă ceramică sau tablă ambutisată, sau dacă acoperișul va fi realizat cu o complexitate mai mare decât în 4 ape.",
      "Izolația ignifugă dorită – polistiren expandat ignifug, vată minerală, termoizolație din lână de oaie etc., care se plasează sub învelitoare, sub dușumeaua parterului și, după caz, între pereții lambrisați sau între pereții dubli. Montajul izolației ignifuge necesare este inclus în preț.",
      "Baiț pentru dorințe suplimentare de culoare și costul manoperii punerii în operă.",
      "Placa betonată și fundația, după caz, în funcție de Proiect.",
      "Instalații electrice, sanitare și termice.",
      "Dacă construcția va fi realizată pe o rază mai mare de 50 km față de orașul Râmnicu Vâlcea, manopera montajului la fața locului este inclusă în preț, mai puțin transportul, cazarea și mesele persoanelor necesare pentru montaj sau costul diurnei.",
      "Firma noastră este autorizată pe domeniul producției și montajului construcțiilor din lemn masiv. Casa va fi realizată „la cheie” din perspectiva domeniului nostru de activitate și se oferă Garanție și Instrucțiuni de folosire și păstrare a calității.",
    ],
  },
  {
    question: "Sunt greu de întreținut casele de acest tip?",
    answer: [
      "De altfel, ca la oricare alt material necesar realizării unei case. Pentru orice material expus exteriorului este nevoie de întreținere cu lac specific protejării datorită intemperiilor, asigurând prevenirea efectelor de eroziune; tratamentul trebuie repetat atunci când materialul o cere, ceea ce se observă prin aspect.",
      "Odată cu aplicarea pe suprafață, lacul formează o peliculă suficient de solidă și densă ce previne excesul de umiditate, apariția eroziunii și alte acțiuni externe.",
      "Acest tratament destinat protecției lemnului este foarte important, ușurând întreținerea pe termen lung.",
      "Se poate realiza personal, după o consultare prealabilă, sau, la cerere, cu unul ori mai mulți delegați specializați din partea societății, contra cost lac, manoperă și deplasare.",
    ],
  },
  {
    question: "Se acordă Garanție?",
    answer: [
      "Se acordă Garanție și Instrucțiuni de folosire și păstrare a calității.",
      "Documentul este disponibil la cerere, în format PDF.",
    ],
  },
  {
    question: "Cum se comportă la foc casa din lemn?",
    answer: [
      "Lemnul masiv are un conținut de apă de aproximativ 15% și, înainte ca lemnul să ia foc, trebuie ca apa să se evapore. Ignifugarea lemnului este foarte importantă, deoarece ajută la încetinirea propagării focului și, totodată, la timpul necesar așteptării intervenției Departamentului de Pompieri.",
      "Ignifugarea este procedeul prin care lemnul este tratat cu substanțe care duc la încetinirea propagării focului (fire retardant – termenul folosit în engleză pentru astfel de produse redă mai exact rolul lor).",
      "Prin ignifugare se mărește rezistența lemnului la ardere. Practic, se îngreunează aprinderea lemnului, se reduce viteza de ardere a acestuia și viteza de propagare a flăcărilor pe suprafața protejată.",
      "Ignifugarea nu trebuie lăsată la întâmplare, indiferent dacă este vorba despre o casă, un centru comercial sau un spațiu public.",
    ],
  },
  {
    question:
      "Ce se poate spune despre rezistența caselor din lemn la cutremure?",
    answer: [
      "Toate soluțiile structurale utilizate în casele construite de noi sunt gândite pentru condiții de siguranță. Acest lucru asigură că familia proprietarului va avea o casă cu o lungă durată de utilizare, în condiții de siguranță. La proiectarea casei ne bazăm pe experiența noastră în construcțiile de case din lemn masiv, pe rezultatele studiilor și cercetărilor științifice disponibile, cât și pe indicațiile arhitecților cu care colaborăm.",
      "O casă construită în întregime din lemn masiv este rezistentă la activități seismice datorită flexibilității sale.",
      "Există materiale video care testează rezistența la cutremur a unei case construite integral din lemn masiv, pe o masă de agitare care simulează peste 7 grade pe scara Richter.",
    ],
  },
  {
    question: "Cât de eficientă energetic este o casă din lemn?",
    answer: [
      "Casele construite în întregime din lemn fac ușor de folosit energia gratuită oferită de soare, vânt și umbră.",
      "Pereții din lemn masiv dețin capacitatea unică de a absorbi și păstra căldura și de a o elibera înapoi în aer atunci când acesta devine mai rece în interior, cât și de a absorbi și păstra răcoarea și de a o elibera atunci când aerul devine mai cald.",
      "Astfel, pereții din lemn masiv absorb și conservă energia solară primăvara, toamna și iarna, iar dulapii eliberează lent în casă, în timpul nopții, căldura acumulată în timpul zilei, aducând economii la facturile de încălzire.",
      "Sistemul funcționează și invers: vara, răcoarea nopților este stocată în pereții din lemn masiv, ceea ce face posibilă menținerea temperaturii interioare la un nivel plăcut pe parcursul zilei.",
      "O casă confortabilă și eficientă energetic trebuie să fie bine izolată. Pe lângă calitățile lemnului masiv ca material izolator, contează și materialele folosite pentru izolație, care asigură izolare termică, fonică și protecție la incendiu.",
    ],
  },
  {
    question: "Unde se poate construi o casă din lemn?",
    answer: [
      "Casa construită în întregime din lemn masiv simbolizează realitatea arhitecturii și a designului actual, deoarece o mare importanță o deține abordarea față de materialele de construcții inteligente, iar lemnul masiv se află ca material principal în această categorie.",
      "Casa îmbină confortul cu funcționalitatea, indiferent de locație — la mare, la munte sau în centrul orașului — deoarece lemnul oferă posibilități nelimitate de proiectare, este un material flexibil și se adaptează dorințelor arhitecților și designerilor, putând fi ușor combinat cu alte materiale.",
      "Casa este proiectată potrivit dorințelor și nevoilor individuale, pe baza specificațiilor constructorului, ale arhitectului și, după caz, ale designerului, într-o relație armonioasă cu peisajul înconjurător.",
    ],
  },
  {
    question: "Casa din lemn poate fi modificată în timp?",
    answer: [
      "Casa în întregime din lemn poate fi modificată în timp, adaptată unor noi cerințe, necesități sau pretenții ridicate de către proprietar. Structura permite recondiționări, recompartimentări și redefinirea spațiilor, extinderi și noi destinații funcționale.",
    ],
  },
];

/* --- De ce casă din lemn ------------------------------------------------ */

export const woodIntro: string[] = [
  "Lemnul este, dintre toate materialele de construcții, unicul natural. O resursă regenerabilă, un material versatil și rentabil utilizat într-o mare varietate de aplicații și situații, se integrează în orice decor și este potrivit pentru orice tip de construcții arhitecturale, atât structurale cât și estetice.",
  "Prin realizarea unui echilibru între funcționalitate și obiectivele de cost, cu un impact redus asupra mediului și contribuind semnificativ la reducerea amprentei de carbon a mediului construit, se poate spune că lemnul este un material ideal de construcție pentru o casă durabilă.",
  "Lemnul este ușor de utilizat, curat și precis: se prelucrează industrial, construcția se pre-montează, se demontează, apoi se livrează și se montează final la locul destinației. Astfel erorile sunt eliminate și există mai puține deșeuri.",
];

/** Imaginile de langa `woodIntro`: cea mare si detaliul decalat peste colt. */
export const woodIntroImages = {
  main: {
    image: woodCasa,
    alt: "Casă din lemn masiv construită de ALMEK",
  },
  detail: {
    image: woodFibra,
    alt: "Fibra lemnului masiv, în prim-plan",
  },
};

export const woodBenefitsLead =
  "Casele prefabricate sunt cu adevărat confortabile, frumoase și bine gândite, până la cele mai mici detalii, oferind anumite avantaje față de alte tipuri de construcții:";

/** Avantajele, asa cum sunt listate pe site. */
export const woodBenefits: string[] = [
  "Timp de execuție redus față de o construcție clasică",
  "Se pot construi în orice perioadă a anului",
  "Câștig de 5–7% din suprafața utilă față de o construcție clasică",
  "Construcție ușoară, adaptabilă la terenuri instabile sau în pantă",
  "Asamblare rapidă, reducând durata și costurile de șantier",
  "Sistemul permite demontarea și relocarea casei",
  "Rezistență la cutremure și vânturi puternice",
  "Economice, ecologice și sănătoase",
  "Eficiență energetică (termică)",
  "Umiditate optimă a aerului din interior",
  "Izolare fonică",
  "Rezistență în caz de incendiu și ignifugare",
  "Elasticitate — rezistență la activități seismice",
  "Trec testul timpului, cu întreținere ușoară",
  "Prezența naturii în mediul interior",
  "Cost redus, economic și de mediu",
];

export type InfoTab = {
  title: string;
  /** Paragrafe; `**text**` se randeaza ingrosat, ca pe site-ul live. */
  body: string[];
  points?: string[];
  link?: { label: string; href: string };
};

/**
 * Cele opt taburi de pe live, cu textul lor integral. Paragrafele foarte lungi
 * de acolo sunt despartite in mai multe, fara sa se schimbe cuvintele; s-au
 * corectat doar greselile de tipar si doua traduceri gresite („conexiuni de
 * unghii" -> „prin cuie", „a absorbit 119 studenti" -> „a inclus").
 */
export const woodTabs: InfoTab[] = [
  {
    title: "Eficiență energetică (termică)",
    body: [
      "Una dintre cele mai bune caracteristici ale unei case de lemn este capacitatea de respirație, ceea ce permite lemnului să respire și să mențină aerul proaspăt în casă pe toată durata anului. Caracteristicile bune de izolare termică a unei case din lemn reprezintă motivul esențial pentru o climă ambientală sănătoasă, atât pe timpul iernii cât și vara.",
      "Diferența de temperatură dintre pereții casei și aerul din interior este mult mai redusă față de construcțiile clasice, menținând temperatura mai constantă în interior, ajutând astfel la economisirea costurilor de încălzire. Din acest motiv o casă din lemn se încălzește mai ușor iarna chiar și după o perioadă îndelungată în care nu a mai fost locuită. O problemă importantă este cât se cheltuiește într-o lună cu încălzirea sau răcirea spațiului în care se locuiește. Din cercetări reiese că o locuință construită în întregime din lemn masiv ajută la un consum eficient al energiei. **Astfel, s-a ajuns la concluzia că o casă construită în întregime din lemn masiv este eficientă energetic.**",
      "**O casă confortabilă și eficientă energetic trebuie să fie bine izolată.** În afară de capacitatea unică a lemnului masiv ca material izolator termic, sunt foarte importante și materialele termoizolante folosite pentru izolația suplimentară necesară, acestea asigurând izolare termică, fonică și protecție la incendiu. Materialele termoizolante suplimentare (polistiren expandat ignifug, vată minerală, termoizolație din lână de oaie etc.) sunt ușor de instalat, rezistă pe toată durata de viață a locuinței fără să necesite întreținere și se plasează în zonele necesare, zone determinate astfel încât să nu afecteze calitățile naturale ale lemnului.",
      "**Lemnul se dovedește, de asemenea, a fi o alegere bună pentru arhitecții care doresc să îndeplinească standardul Passive House (casa pasivă) sau să creeze o clădire cu energie zero.**",
    ],
  },
  {
    title: "Umiditatea optimă a aerului din interior — calitatea aerului respirat",
    body: [
      "Lemnul folosit funcționează ca un izolator termic, menținând totodată umiditatea la un nivel optim și contribuind la un trai sănătos prin lipsa efectului de „pereți umezi”, adică a igrasiei, mucegaiului etc. Prin urmare, aerul dintr-o casă de lemn este mai curat și mai ușor de respirat, împiedicând în același timp răspândirea microorganismelor dăunătoare.",
      "Absența electricității statice în acest tip de casă previne formarea prafului, astfel că persoanele care suferă de alergii beneficiază de aerul curat din încăpere — casele din lemn sunt o alternativă excelentă la cărămizile cu praf și la casele de mortar de care suntem atât de dependenți.",
    ],
  },
  {
    title: "Izolare fonică",
    body: [
      "Lemnul conține, de asemenea, proprietăți acustice extrem de căutate. Poate absorbi sunetul și ecourile și este un material preferat pentru construirea structurilor unde acustica este primordială, cum ar fi sălile de concerte.",
    ],
  },
  {
    title: "Rezistența în caz de incendiu și ignifugarea",
    body: [
      "Lemnul masiv are o rezistență inerentă la foc, care îi conferă un avantaj în ceea ce privește rezistența la temperaturi ridicate. Spre deosebire de oțel, care se poate extinde sau chiar prăbuși la temperatură ridicată, lemnul se usucă și devine mai puternic pe măsură ce crește temperatura.",
      "Deși este un material combustibil, se comportă bine din punct de vedere al rezistenței structurale la foc, deoarece elementele masive se consumă relativ lent, cu o viteză de 0,5–0,7 mm/minut, ceea ce presupune o scădere a secțiunii transversale de 1 cm pe fiecare față într-un sfert de oră, timp în care temperatura incendiului poate să ajungă la 700–800 °C.",
    ],
  },
  {
    title: "Elasticitate — rezistența la activități seismice",
    body: [
      "O altă caracteristică importantă a lemnului este rezistența la torsiune și încovoiere, capacitatea de a se îndoi sub presiune fără a se rupe. Acest lucru îl face ideal pentru folosirea în construcții aflate în zone predispuse la vânt puternic și în același timp oferă siguranță în cazul unui cutremur, datorită capacității de a absorbi undele seismice. Limita elastică a lemnului și rezistența maximă sunt mai mari atunci când sarcinile sunt aplicate pentru o perioadă scurtă de timp, ceea ce se întâmplă în cazul evenimentelor cu vânt puternic.",
      "Ca și în cazul performanțelor seismice, faptul că aceste construcții din lemn au tendința de a avea numeroase conexiuni prin cuie înseamnă, de asemenea, că au mai multe căi de încărcare, deci există mai puține șanse ca structura să se prăbușească dacă unele conexiuni cedează. Acest fapt, împreună cu greutatea proprie redusă, permite construcțiilor realizate din lemn să reziste la seisme cu magnitudine de peste 8 grade pe scara Richter.",
    ],
    link: {
      label: "Vezi testul seismic pe YouTube",
      href: "https://www.youtube.com/watch?v=VHtrMq617gk",
    },
  },
  {
    title: "Case care trec testul timpului și întreținere ușoară",
    body: [
      "Deși în domeniul construcțiilor s-a progresat mult, lemnul rămâne material principal, iar evoluția a implicat și adoptarea de soluții performante de tratare a lemnului împotriva dăunătorilor. Există multe clădiri din lemn masiv care au sute de ani și sunt încă utilizate activ. Construirea caselor în întregime din lemn masiv este un obicei destul de practicat atât la noi în țară, cât și în multe țări dezvoltate care încurajează un mediu construit sănătos prin folosirea de materiale naturale, inteligente și consum redus de energie.",
      "Cea mai mare responsabilitate este ca toate casele realizate, pentru a rezista la testul timpului, să fie construite astfel încât proprietarul să se bucure de siguranță și, totodată, să lăsăm în urma noastră o locuință trainică. O construcție din lemn realizată corect rezistă sute de ani. Soluțiile structurale utilizate sunt aplicate pentru condiții de siguranță. Acest lucru asigură că familia proprietarului va avea o casă cu o lungă durată de utilizare, în condiții de siguranță.",
      "La proiectarea casei ne bazăm pe rezultatele și experiența acumulată, pe indicațiile arhitecților cu care lucrăm, cât și pe studiile și cercetările științifice disponibile. **Se acordă garanție și instrucțiuni de folosire și păstrare a calității.** Întreținerea este ușoară, de tip obișnuit, și se face o dată la câțiva ani — de altfel, ca pentru oricare alt material necesar realizării unei case.",
    ],
  },
  {
    title: "Importanța prezenței naturii în mediul interior",
    body: [
      "Chiar dacă clădirile devin din ce în ce mai dependente și concepute pentru tehnologie, nevoia umană de a se conecta cu natura nu se schimbă. Lemnul are caracteristici unice la care majoritatea oamenilor răspund intuitiv. Această conexiune pozitivă este documentată de un număr tot mai mare de cercetări și constituie un atu valoros în spațiile umplute cu dispozitive și ecrane electronice, materiale sintetice și iluminat artificial.",
      "Oamenii simt o legătură instinctivă și o atracție pentru materialele naturale, iar mulți designeri citează atributele calde ale lemnului ca motiv pentru utilizarea sa. Dovezile sugerează, de asemenea, că lemnul expus contribuie la simțul de bunăstare al unei persoane. Într-un birou sau o școală, s-a dovedit că lemnul îmbunătățește performanța și productivitatea; în spital, are un impact pozitiv asupra recuperării pacienților.",
      "Un studiu efectuat la Universitatea din British Columbia și FPInnovations a constatat că prezența suprafețelor vizuale din lemn într-o încăpere a redus activarea sistemului nervos simpatic (SNS). SNS este responsabil pentru răspunsurile de stres fiziologic la om, cum ar fi creșterea tensiunii arteriale și a ritmului cardiac, în timp ce inhibă sistemul parasimpatic, responsabil cu digestia, recuperarea și repararea funcțiilor în organism. Studiul a inclus 119 studenți, fiecare într-unul din patru medii de birou diferite, unele cu suprafețe de lemn și altele fără. Stresul, măsurat prin activarea SNS, a fost mai mic în sălile cu lemn în toate perioadele studiului. **Studiul a concluzionat că lemnul este o modalitate de a crea un mediu construit mai sănătos.**",
    ],
  },
  {
    title: "Cost redus din punct de vedere economic și al mediului",
    body: [
      "Casele din lemn masiv au o amprentă de carbon pozitivă. Lemnul folosit în construcția caselor funcționează ca un burete de carbon de-a lungul vieții acesteia. În plus, procesul de fabricație al unei locuințe din lemn consumă cea mai mică energie atunci când se compară cu metodele alternative de construcție.",
      "Printr-o exploatare responsabilă urmată de o împădurire constantă, lemnul ne poate transforma mediul construit în unul sănătos și durabil. Copacii tineri au o capacitate mai mare de a prelucra dioxidul de carbon și de a elibera oxigenul în atmosferă, rată care încetinește la atingerea maturității. Indiferent dacă copacii sunt recoltați și utilizați ulterior în producție sau se descompun în mod natural, ciclul este în desfășurare. Dar atunci când copacii sunt transformați în produse și folosiți în arhitectura clădirilor, începe o nouă fază de diminuare a emisiilor de carbon: lemnul dintr-o clădire asigură stocarea fizică a carbonului care ar fi emis înapoi în atmosferă.",
      "Lemnul a fost întotdeauna apreciat pentru frumusețea, abundența și caracterul său practic, dar multe din caracteristicile inerente ale acestuia se ridică la provocări actuale. În mod obișnuit, lemnul costă mai puțin din punct de vedere economic și din punct de vedere al mediului, oferind în același timp mai mult în ceea ce privește frumusețea, versatilitatea și performanța sa. Valorile tradiționale ale lemnului, împreună cu cele mai noi tehnologii, conferă avantaje prin:",
    ],
    points: [
      "Rentabilitate într-o varietate de proiecte",
      "Adaptabilitate în utilizarea lui în provocări noi",
      "Cost scăzut din punct de vedere al mediului, de-a lungul ciclului său de viață: de la sursă, din păduri regenerabile gestionate cu atenție, la un rol de eficiență energetică pe toată durata vieții și, de multe ori, la reciclarea și reutilizarea lui în alte proiecte",
      "Conexiune unică om–natură, care a fost dintotdeauna intuitivă, dar care acum este documentată în cercetare",
    ],
  },
];

/* --- Procesul tehnologic ------------------------------------------------ */

export type WallVariant = {
  price: string;
  summary: string;
  details: string[];
};

export type WallType = {
  id: string;
  /** Eticheta scurta din tab („Perete simplu"). */
  label: string;
  /** Numele variantei, titlul mare din panou („Varianta Kit"). */
  name: string;
  title: string;
  /**
   * Randarile de pe live (almekwoodarch.ro). Prima e si iconita din tab. Pe
   * live stau amandoua langa prima varianta de pret, deci sunt vederi ale
   * tipului de perete, nu cate una pe grosime.
   */
  images: { image: StaticImageData; alt: string }[];
  variants: WallVariant[];
  note?: string;
  layers?: string[];
};

export const processIntro =
  "Presupune un timp de execuție redus. Sistemul de construcție al unei case de lemn din dulapi prefabricați este simplu și intuitiv, comparabil cu un lego pentru adulți. Piesele din lemn se îmbină între ele pe orizontală prin dublu nut și feder și prin chertare la capete, completând un perete perfect etanș la aer și umiditate, garantând o rezistență adecvată.";

export const wallTypes: WallType[] = [
  {
    id: "perete-simplu",
    label: "Perete simplu",
    name: "Varianta Kit",
    title: "Perete simplu din dulapi masivi de 40 mm sau de 60 mm grosime",
    images: [
      { image: wallSimpluA, alt: "Colț de perete simplu din dulapi masivi, pe fundație — randare 3D" },
      { image: wallSimpluB, alt: "Perete simplu din dulapi masivi — a doua randare 3D" },
    ],
    variants: [
      {
        price: "De la 380 Euro/mp",
        summary: "Pereți exteriori și interiori simpli de 40 mm grosime",
        details: [
          "Grosime exterioară 40 mm",
          "Coeficient transfer termic 2,093 W/m²K",
        ],
      },
      {
        price: "De la 420 Euro/mp",
        summary: "Pereți exteriori și interiori simpli de 60 mm grosime",
        details: [
          "Grosime exterioară 60 mm",
          "Coeficient transfer termic 1,583 W/m²K",
        ],
      },
    ],
    note: "Acestui tip de perete i se poate adăuga ulterior izolație pe suprafața interioară sau exterioară, putând fi apoi lambrisat sau finisat cu sistem de tencuială decorativă. Se impune condiția ca o parte a peretelui să fie lăsată liberă pentru ca lemnul să poată respira.",
  },
  {
    id: "perete-lambrisat",
    label: "Perete lambrisat",
    name: "Varianta Lambrisată",
    title: "Pereți exteriori simpli, lambrisați pe interior",
    images: [
      { image: wallLambrisatA, alt: "Colț de perete lambrisat, cu izolație și lambriu interior — randare 3D" },
      { image: wallLambrisatB, alt: "Perete lambrisat pe interior — a doua randare 3D" },
    ],
    variants: [
      {
        // NECONCORDANTA PE LIVE: /procesul-tehnologic da 420 Euro/mp pentru
        // aceasta varianta, /variante-si-costuri da 520. Ambele sunt copiate
        // ca atare; de confirmat care e corect inainte de publicare.
        price: "De la 420 Euro/mp",
        summary:
          "Perete exterior de 40 mm, rezervă pentru izolația ignifugă de 100 mm și lambriu interior de 20 mm",
        details: [
          "Pereți interiori de 40 mm",
          "Grosime exterioară 160 mm",
          "Coeficient transfer termic 0,319 W/m²K",
        ],
      },
      {
        price: "De la 560 Euro/mp",
        summary:
          "Perete exterior de 60 mm, rezervă pentru izolația ignifugă de 100 mm și lambriu interior de 20 mm",
        details: [
          "Pereți interiori de 60 mm",
          "Grosime exterioară 180 mm",
          "Coeficient transfer termic 0,303 W/m²K",
        ],
      },
    ],
    layers: [
      "Dulapi masivi de 40 sau 60 mm grosime",
      "Folie anticondens",
      "Structură montanți izolație",
      "Izolație ignifugă de minim 100 mm grosime",
      "Folie barieră de vapori",
      "Lambriu interior de 20 mm grosime și colțare de finalizare",
    ],
    note: "Atenție: pentru varianta lambrisată construcția se realizează în două etape — două faze de montaj la locul destinației. Lambrisarea se face în a doua fază, deoarece construcția are nevoie de cel puțin 6 luni de tasare a zonelor de îmbinare. Manopera montajului la fața locului este inclusă în preț.",
  },
  {
    id: "perete-dublu",
    label: "Perete dublu",
    name: "Varianta Robustă",
    title: "Pereți exteriori dubli, cu izolație între ei",
    images: [
      { image: wallDubluA, alt: "Colț de perete dublu din dulapi masivi, cu izolație între rânduri — randare 3D" },
      { image: wallDubluB, alt: "Perete dublu din dulapi masivi — a doua randare 3D" },
    ],
    variants: [
      {
        price: "De la 650 Euro/mp",
        summary:
          "Două rânduri de pereți exteriori de 40 mm și rezervă pentru izolația ignifugă de 100 mm între ei",
        details: [
          "Pereți interiori de 40 mm",
          "Grosime exterioară 180 mm",
          "Coeficient transfer termic 0,276 W/m²K",
        ],
      },
      {
        price: "De la 700 Euro/mp",
        summary:
          "Două rânduri de pereți exteriori de 60 mm și rezervă pentru izolația ignifugă de 100 mm între ei",
        details: [
          "Pereți interiori de 60 mm",
          "Grosime exterioară 220 mm",
          "Coeficient transfer termic 0,254 W/m²K",
        ],
      },
    ],
    layers: [
      "Dulapi masivi de 40 sau 60 mm grosime",
      "Folie anticondens",
      "Structură montanți izolație",
      "Izolație ignifugă de minim 100 mm, plasată între cei doi pereți",
      "Folie barieră de vapori",
      "Dulapi masivi de 40 sau 60 mm grosime",
    ],
  },
];

/**
 * Prima imagine e cea mare; a doua, daca exista, e detaliul decalat peste colt.
 */
export type ProcessNote = InfoSection & {
  images: { image: StaticImageData; alt: string }[];
};

/*
 * Pozele de montaj sunt reale, de pe almekwoodarch.ro. Pentru premontaj live-ul
 * are doar o ilustratie stock (o casa pe structura usoara, nu din lemn masiv),
 * deci aici sta un placeholder pana vine o fotografie din atelier.
 */
export const processNotes: ProcessNote[] = [
  {
    title: "Pe toată durata de execuție și montaj, prioritizăm protecția mediului",
    images: [
      {
        image: processPremontaj,
        alt: "Îmbinare de grinzi din lemn masiv la premontaj, în atelier",
      },
    ],
    body: [
      "În funcție de varianta de construcție a pereților aleasă, se studiază schițele din proiectul de execuție, se scurtează elementele la dimensiunile optime, apoi începe premontajul construcției la sediul de producție.",
      "Premontajul verifică și remediază îmbinările pereților cu tocurile ferestrelor și ale ușilor și realizează elementele necesare acoperișului — căpriori, grinzi, bazii și astereală. Are un rol important în reducerea deșeurilor rezultate din prelucrarea materiei prime și scurtează timpul asamblării finale.",
      "Urmează demontarea și finisarea fiecărui element pe mașina de calibrat și șlefuit, parțial manual, apoi aplicarea stratului de protecție final: grund antibacterian, baiț, lac sau impregnanți cerați.",
      "Pentru finisajul lemnului folosim produse pe bază de apă și ceară, marca RENNER și Sirca.",
      "Toate elementele sunt ambalate și notate pe grupe pentru a fi transportate la destinație, unde se face montajul final al casei.",
    ],
  },
  {
    title: "Casa se reasamblează pe platforme betonate pregătite",
    images: [
      {
        image: processMontajIzolatie,
        alt: "Echipa ALMEK montează lănteții și izolația acoperișului peste folia de dispersie",
      },
      {
        image: processMontajLanteti,
        alt: "Lănteți pentru învelitoare, fixați peste folia de dispersie a acoperișului",
      },
    ],
    body: [
      "Montarea începe prin ridicarea pereților; progresiv, odată cu evoluția lor, se așează tocăria. După ce s-a ajuns la cota de înălțime maximă se așează grinzile și căpriorii pe pereții portanți. Când toate elementele sunt aliniate și perfect îmbinate începe montajul asterealei, care se îmbină prin nut și feder progresiv, de la streașină până la coame și dolii.",
      "Peste astereală se așează folia barieră de vapori, fixată în capse, și casetele separatoare între care se va așeza izolația. Izolarea acoperișului se face cu material izolant ignifug — vată minerală bazaltică, polistiren expandat ignifug. Sistemul de amplasare a izolației deasupra asterealei permite ca grinzile și căpriorii să rămână aparenți.",
      "Peste izolație se așează un alt rând de folie de dispersie, prinsă tot în capse, apoi se montează lănteții pentru fixarea învelitorii. Se montează învelitoarea aleasă (țiglă, tablă, șindrilă) și accesoriile ei — dolii, coame.",
      "După toate acestea începe montarea podelei interioare. Pentru pardoseală se adaugă lănteții de susținere, care ajută și la ancorarea casei pe fundație, iar între ei se așează izolația ignifugă.",
    ],
  },
];

/* --- Variante și costuri ------------------------------------------------ */

export type PriceOption = { title: string; price: string; description: string };

/** Un rand dintr-un tab: preturile in stanga, imaginile in dreapta. */
export type PriceBlock = {
  title: string;
  subtitle?: string;
  options: PriceOption[];
  note?: string;
  images: InfoImage[];
};

export type PriceGroup = {
  id: string;
  /** Eticheta scurta din tab. */
  tab: string;
  title: string;
  intro: string[];
  /** Imagini langa intro — pentru grupul fara preturi (mobilier). */
  introImages?: InfoImage[];
  blocks: PriceBlock[];
  included?: { title: string; items: string[] };
  disclaimer?: string;
};

const INTERIOR_WALLS_NOTE =
  "Pereți interiori de compartimentare din dulapi de lemn de 40 mm sau 60 mm grosime, în funcție de varianta aleasă (V1 / V2).";

export const priceGroups: PriceGroup[] = [
  {
    id: "case",
    tab: "Case din lemn",
    title: "Case din lemn",
    intro: ["Pereții structurali ai unei case din lemn se împart în 3 categorii:"],
    blocks: [
      {
        title: "A. Perete simplu",
        subtitle: "Format din dulapi masivi de 40 mm sau de 60 mm grosime.",
        options: [
          {
            title: "Varianta 1",
            price: "De la 380 Euro/mp",
            description:
              "Pereți exteriori și pereți interiori din lemn masiv (pereții care formează compartimentările interioare) de 40 mm grosime.",
          },
          {
            title: "Varianta 2",
            price: "De la 420 Euro/mp",
            description:
              "Pereți exteriori și pereți interiori din lemn masiv (pereții care formează compartimentările interioare) de 60 mm grosime.",
          },
        ],
        images: variantImages.caseA,
      },
      {
        title: "B. Perete exterior lambrisat",
        subtitle:
          "Format din dulapi masivi de 40 mm sau 60 mm grosime, spațiu tehnic pentru adăugarea izolației de 100 mm (minim necesar) și lambriu interior de 20 mm grosime.",
        options: [
          {
            title: "Varianta 1",
            price: "De la 520 Euro/mp",
            description:
              "Perete exterior din lemn masiv de 40 mm grosime, rezervă pentru izolația de 100 mm și lambriu la interior de 20 mm. Grosime totală perete exterior: 160 mm.",
          },
          {
            title: "Varianta 2",
            price: "De la 560 Euro/mp",
            description:
              "Perete exterior din lemn masiv de 60 mm grosime, rezervă pentru izolația de 100 mm și lambriu la interior de 20 mm. Grosime totală perete exterior: 180 mm.",
          },
        ],
        note: INTERIOR_WALLS_NOTE,
        images: variantImages.caseB,
      },
      {
        title: "C. Perete exterior dublu",
        subtitle:
          "Format din două rânduri de dulapi de lemn de 40 mm sau 60 mm grosime și spațiu tehnic între ele pentru adăugarea izolației de 100 mm (minim necesar).",
        options: [
          {
            title: "Varianta 1",
            price: "De la 650 Euro/mp",
            description:
              "Două rânduri de pereți exteriori de 40 mm grosime și spațiu tehnic pentru izolația de 100 mm între ei. Grosime totală perete exterior: 180 mm.",
          },
          {
            title: "Varianta 2",
            price: "De la 700 Euro/mp",
            description:
              "Două rânduri de pereți exteriori de 60 mm grosime și rezervă pentru izolația de 100 mm între ei. Grosime totală perete exterior: 220 mm.",
          },
        ],
        note: INTERIOR_WALLS_NOTE,
        images: variantImages.caseC,
      },
    ],
    included: {
      title: "Componente incluse în costurile prezentate",
      items: [
        "Lemn masiv de esență ușoară, tip molid–pin, culoare natur, uscat până la 14% umiditate stabilizată.",
        "Finisaj de exterior cu impregnant cerat pigmentat, aplicat într-un singur strat.",
        "Finisaj de interior cu lac transparent pe bază de apă, aplicat într-un singur strat.",
        "Tocăria necesară ușilor exterioare, din lemn masiv și parțial stratificat. Ușile în sine sunt opționale și nu intră în preț.",
        "Tocăria necesară ferestrelor și luminatoarelor. Ferestrele și luminatoarele în sine sunt opționale și nu intră în preț.",
        "Uși interioare model clasic, din lemn masiv și parțial stratificat, cu feronerie și chedere de etanșare.",
        "Pereți exteriori și interiori despărțitori din dulapi de lemn masiv, cu îmbinare în dublu nut și feder pe orizontală, chertați pe colțuri.",
        "Lambriu interior din molid/pin de 20 mm, finisat cu lac pe bază de apă (pentru varianta B).",
        "Grinzi, căpriori și dulapi din lemn masiv și stratificat pentru zonele de rezistență la acoperiș.",
        "Pazie perimetrală din lemn masiv de 20 mm, finisată cu impregnant cerat pigmentat.",
        "Acoperiș tip astereală, finisaj tip lambriu de 20 mm, dispus pe grinzi aparente. Casete separatoare pentru rezerva izolației de 100 mm.",
        "Elemente din lemn — șipci și contrașipci — necesare instalării sistemului de învelitoare.",
        "Membrană bitum cu ardezie pentru ruperea legăturilor între lemn și beton.",
        "Elemente speciale de consolidare a construcției pe placa betonată.",
        "Manoperă montaj izolații necesare, montajul învelitoarei și montajul construcției la fața locului.",
      ],
    },
    disclaimer:
      "Estimările nu includ tâmplăria exterioară (uși de exterior, ferestre), învelitoarea acoperișului și accesoriile aferente, nici materialele izolatoare — acestea se aleg în funcție de nivelul de eficiență energetică dorit. Costurile includ doar montajul acestor componente.",
  },
  {
    id: "casute",
    tab: "Căsuțe de grădină",
    title: "Căsuțe de grădină",
    intro: [
      "Transformă-ți grădina într-un spațiu cu adevărat special.",
      "Căsuțele de grădină nu mai sunt doar simple anexe — pot deveni un atelier de creație, un birou liniștit, un colț de relaxare, un mic cinema în aer liber, o zonă tip spa sau o magazie cu stil.",
      "Fiecare proiect este diferit, iar pentru ca noua construcție să se potrivească cu spațiul disponibil realizăm fiecare căsuță la comandă.",
    ],
    blocks: [
      {
        title: "Avem trei variante de execuție pentru realizarea căsuței de grădină",
        options: [
          {
            title: "Varianta 1",
            price: "De la 350 Euro/mp",
            description: "Perete din lemn masiv de 40 mm grosime.",
          },
          {
            title: "Varianta 2",
            price: "De la 370 Euro/mp",
            description: "Perete din lemn masiv de 60 mm grosime.",
          },
          {
            title: "Varianta 3",
            price: "De la 330 Euro/mp",
            description:
              "Construcție tip timber framing — structură din lemn 100×45 mm, placată la exterior cu lambriu din lemn.",
          },
        ],
        images: variantImages.casute,
      },
    ],
    disclaimer:
      "Aceste căsuțe sunt proiectate fără pereți interiori de compartimentare, oferind un spațiu deschis și flexibil. Dimensiunile construcției sunt limitate, în funcție de specificul fiecărui proiect și de criteriile tehnice de execuție.",
  },
  {
    id: "terase",
    tab: "Foișoare și terase",
    title: "Terase și foișoare",
    intro: [
      "Calcul estimativ al costurilor de producție pentru foișoare și terase din lemn.",
      "Ca reper orientativ, costul se estimează pe baza unui preț pe metru pătrat, în funcție de suprafața construită desfășurată și de varianta aleasă pentru balustrade sau, după caz, pentru pereți închiși cu panouri din lemn, sticlă ori sisteme culisante.",
    ],
    blocks: [
      {
        title: "1. Model deschis",
        subtitle: "Fără balustradă perimetrală",
        options: [
          {
            title: "Preț orientativ",
            price: "De la 330 Euro/mp",
            description:
              "Structură din lemn masiv sau stratificat: stâlpi de susținere, grinzi principale și astereală din lambriu. Fără balustrade sau închideri perimetrale — potrivit pentru spații aerisite, cu design minimalist.",
          },
        ],
        images: variantImages.terase1,
      },
      {
        title: "2. Model tradițional",
        subtitle: "Cu balustradă tradițională",
        options: [
          {
            title: "Preț orientativ",
            price: "De la 330 Euro/mp",
            description:
              "Stâlpi, grinzi, astereală din lambriu și balustradă perimetrală în stil tradițional. Se potrivește cu grădini cu aspect natural sau peisaje pitorești.",
          },
        ],
        images: variantImages.terase2,
      },
      {
        title: "3. Model clasic",
        subtitle: "Cu balustradă din lamele de lemn",
        options: [
          {
            title: "Preț orientativ",
            price: "De la 350 Euro/mp",
            description:
              "Panouri cu lamele orizontale tip jaluzea sau montanți rectangulari din lemn masiv, configurabili în diferite modele, de la linii simple la forme mai elaborate.",
          },
        ],
        images: variantImages.terase3,
      },
      {
        title: "4. Model clasic",
        subtitle: "Cu balustradă elegantă",
        options: [
          {
            title: "Preț orientativ",
            price: "De la 350 Euro/mp",
            description:
              "Păstrează elementele de bază — stâlpi, grinzi, astereală — dar se evidențiază prin detalii fine și linii stilizate. Ideal pentru grădini moderne sau clasice.",
          },
        ],
        images: variantImages.terase4,
      },
      {
        title: "5. Model semi-închis",
        subtitle: "1/2 pereți tip jaluzea / riflaj",
        options: [
          {
            title: "Preț orientativ",
            price: "De la 370 Euro/mp",
            description:
              "Închideri parțiale, pe una sau două laturi, cu panouri din lemn tip jaluzea, riflaj sau stelaj. Asigură intimitate, umbrire și protecție împotriva vântului sau ploii.",
          },
        ],
        images: variantImages.terase5,
      },
      {
        title: "6. Model închis",
        subtitle: "Pereți complet închiși",
        options: [
          {
            title: "Preț orientativ",
            price: "De la 400 Euro/mp",
            description:
              "Pereți din panouri de lemn tip jaluzea, panouri fixe sau culisante din lemn și sticlă ori rame din lemn stratificat cu sticlă. Transformă foișorul într-un spațiu semi-interior, utilizabil tot anul.",
          },
        ],
        images: variantImages.terase6,
      },
    ],
    disclaimer:
      "Acest calcul are caracter estimativ și nu reflectă particularitățile de arhitectură ale fiecărui proiect în parte.",
  },
  {
    id: "mobilier",
    tab: "Mobilier",
    title: "Mobilier interior",
    intro: [
      "Fiecare piesă de mobilier din lemn masiv este unică. Dincolo de funcționalitate, mobilierul realizat din esențe tari sau ușoare poartă amprenta personalității tale și reflectă stilul tău de viață.",
      "De aceea costurile nu sunt standard, ci se calculează în funcție de complexitatea proiectului, tipul de esență dorită, dimensiuni și finisaje.",
      "Putem produce la comandă o gamă variată de piese din lemn masiv, pentru interior sau pentru grădină: o scară din lemn, câteva trepte, un blat din lemn stratificat, un perete riflat, un leagăn pentru grădină sau un set complet de mobilier interior.",
    ],
    introImages: variantImages.mobilier,
    blocks: [],
  },
];
