FROM node:22.15.0-alpine

USER root

RUN apk add --no-cache openssl
RUN corepack enable

WORKDIR /app

# Workspace metadata. Build context must be the repo root:
#   docker build -f apps/backend/Dockerfile -t backend-dev .
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

RUN pnpm install --frozen-lockfile

COPY apps/backend ./apps/backend
COPY apps/frontend ./apps/frontend

RUN mkdir -p apps/backend/uploads
RUN chown -R node:node /app

USER node

WORKDIR /app/apps/backend

# Create .env file if it doesn't exist
RUN touch .env

CMD ["pnpm", "start:dev"]
