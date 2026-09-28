# syntax=docker/dockerfile:1

# Imaginea de productie. Build-ul se face aici sau in CI, NU pe instanta:
# `next build` cere ~2 GB, iar instanta mica de Beanstalk ar ramane fara memorie.
#
# Imaginea e amd64 (t3.*). Pentru o instanta ARM (t4g.*, ~20% mai ieftina)
# construieste cu `docker buildx build --platform linux/arm64`.

FROM node:24-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# npm fixat la versiunea care a scris lock-ul. Cu npm 10 (cel din imaginile
# Node 22) `npm ci` refuza lock-ul: "Missing: @emnapi/runtime ... from lock
# file" — npm 10 si npm 11 trateaza diferit dependentele optionale de platforma.
RUN npm i -g npm@11.6.2 && npm ci

FROM node:24-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build-ul NU atinge baza de date: paginile din CMS apeleaza `connection()`, deci
# nu sunt prerandate. Nu are nevoie de DATABASE_URI si nici de acces la RDS.
RUN npm run build

FROM node:24-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    HOSTNAME=0.0.0.0

# Utilizator fara privilegii: un proces compromis nu e root in container.
RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

# `output: "standalone"` (next.config.ts) scoate un server minimal, cu doar
# dependentele chiar folosite — de aceea nu copiem tot node_modules.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# `sharp` (redimensionarile din colectia Media) se incarca dinamic, cu binare
# native: urmarirea de fisiere a lui Next il rateaza des, asa ca il copiem
# explicit, impreuna cu binarele lui din `@img`.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/sharp ./node_modules/sharp
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@img ./node_modules/@img

USER nextjs
EXPOSE 8080

# Migrarile bazei de date ruleaza la pornire, din `prodMigrations`
# (src/payload.config.ts) — fara CLI Payload si fara pas separat de deploy.
CMD ["node", "server.js"]
