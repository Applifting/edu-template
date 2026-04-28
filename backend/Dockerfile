FROM node:22.15.0-alpine

USER root

RUN apk add --no-cache openssl
RUN corepack enable

WORKDIR /app

# Workspace metadata. Build context must be the repo root:
#   docker build -f backend/Dockerfile -t backend-dev .
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

RUN pnpm install --frozen-lockfile

COPY backend ./backend
COPY frontend ./frontend

RUN mkdir -p backend/uploads
RUN chown -R node:node /app

USER node

WORKDIR /app/backend

# Create .env file if it doesn't exist
RUN touch .env

CMD ["pnpm", "start:dev"]
