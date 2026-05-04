# Generic Next.js app Dockerfile for pnpm monorepo (standalone output)
# Build from repo root: docker build -f Dockerfile.app --build-arg APP_NAME=admin-frontend .

ARG APP_NAME
ARG APP_PORT=3000
ARG NEXT_PUBLIC_API_URL=https://api.hamrotourist.com

# ---- installer + builder ----
FROM node:20-alpine AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /monorepo
COPY . .
RUN pnpm install --frozen-lockfile
ARG APP_NAME
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NODE_ENV=production
# Build all shared packages first
RUN pnpm --filter "./packages/**" build 2>/dev/null || true
# Build the specific app
RUN pnpm --filter ${APP_NAME} build

# ---- runtime: standalone output ----
FROM node:20-alpine AS runner
ARG APP_NAME
ARG APP_PORT
ENV NODE_ENV=production
ENV PORT=${APP_PORT}
ENV HOSTNAME=0.0.0.0
ENV APP_NAME=${APP_NAME}
WORKDIR /app
# Copy the standalone build (self-contained, no need for node_modules)
COPY --from=builder /monorepo/apps/${APP_NAME}/.next/standalone/ ./
# Copy static assets - must be next to server.js
COPY --from=builder /monorepo/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
# Copy public directory - must be next to server.js for static asset serving
COPY --from=builder /monorepo/apps/${APP_NAME}/public ./apps/${APP_NAME}/public/
EXPOSE ${APP_PORT}
CMD ["sh", "-c", "node apps/${APP_NAME}/server.js"]
