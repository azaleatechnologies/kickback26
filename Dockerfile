# syntax=docker/dockerfile:1.7

# -----------------------------------------------------------------------------
# July 3rd Kickback '26 — site Dockerfile
# Multi-stage build for Next.js 16 with output: "standalone".
# Final image is minimal: just node + the standalone server bundle.
# Target: Coolify on the Azalea mini.
# -----------------------------------------------------------------------------

ARG NODE_VERSION=22-alpine

# ---- Stage 1: deps ----------------------------------------------------------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

# libc6-compat needed by some npm deps (e.g. sharp on Alpine).
RUN apk add --no-cache libc6-compat

# Copy the Prisma schema before install so the `postinstall: prisma generate`
# script has a schema to read.
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci --no-audit --no-fund


# ---- Stage 2: builder -------------------------------------------------------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# ---- Stage 3: runner --------------------------------------------------------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as a non-root user for safety.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Public static assets.
COPY --from=builder /app/public ./public

# Standalone server bundle + the static build output.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
