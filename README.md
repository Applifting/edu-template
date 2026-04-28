# [4IT580: Agilní vývoj webových aplikací](http://4it580.vse.cz/) na [VŠE](https://www.vse.cz/)

## [📖 4IT580: Docs](https://4it5801-public.gitlab.io/)

## JavaScript

We will be using [Node.js](https://nodejs.org/). Please see [`.nvmrc`](./.nvmrc) to find current node.js version we are using.

### Reference

- [JavaScript reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [TypeScript docs](https://www.typescriptlang.org/docs/)

### Literature

- **[React docs](https://react.dev/learn)**
- books:
  - [You Don't Know JS (book series)](https://github.com/getify/You-Dont-Know-JS/tree/1st-ed)
    - [Up & Going](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/up%20%26%20going/README.md)
    - [Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/scope%20%26%20closures/README.md)
    - [ES6 & Beyond](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/es6%20%26%20beyond/README.md)
  - [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do)

### JavaScript Packages

- [pnpm CLI docs](https://pnpm.io/cli/install)
- Useful commands:
  - `pnpm install` (install local dependencies - based on `package.json` and `pnpm-lock.yaml` files)
  - `pnpm add <package-name>` (install new NPM package and add it as a dependency to `package.json`)
  - `pnpm <script-name>` (eg. `pnpm start`, `pnpm format`, see `"scripts"` section in `package.json`)
- Search for packages:
  - [npmjs.com](https://www.npmjs.com/)

## Project Requirements

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (the version is pinned via `packageManager` in `package.json`; `corepack` will pick it up)

## Local Installation

First download and install [Node.js](https://nodejs.org/en/download/) version described in [`./.nvmrc`](./.nvmrc) manually, or use a Node version manager like [nvm](https://github.com/nvm-sh/nvm), [nvm-windows](https://github.com/coreybutler/nvm-windows) or [fnm](https://github.com/Schniz/fnm).

```shell
corepack enable
pnpm install
```

## pnpm Workspaces

This project uses [pnpm Workspaces](https://pnpm.io/workspaces). The packages are listed in `pnpm-workspace.yaml`. There are command aliases at the repo root to help you run scripts in each workspace:

- `pnpm frontend <script-name>` (alias for `pnpm --filter frontend <script-name>`)
- `pnpm backend <script-name>` (alias for `pnpm --filter backend <script-name>`)

## Run everything (recommended)

Starts the database (via Docker), seeds it, then runs the backend and
frontend dev servers side by side:

```shell
pnpm dev
```

This is equivalent to:

1. `pnpm backend docker:up:wait` — `docker compose up -d --wait` with a MariaDB
   healthcheck so the DB is reachable before moving on.
2. `pnpm backend seed` — syncs the Prisma schema and seeds example users and
   quacks. Safe to run repeatedly.
3. `pnpm dev:servers` — runs `pnpm backend start:dev` and `pnpm frontend dev`
   in parallel.

Stop the database container when you're done:

```shell
pnpm dev:down
```

## Run Frontend

```shell
pnpm frontend dev
```

## Run Backend

```shell
pnpm backend start
```

## Run Checks

To run Prettier, ESLint, and TypeScript checks run following command:

```shell
pnpm check-all
```

## Server Setup

### SSH

- `ssh username@vse.handson.pro`
- frontend code: `cd ~/code/cviceni/frontend`

### Domains

- [dev-frontend-**username**-vse.handson.pro](http://dev-frontend-username-vse.handson.pro)
- [dev-backend-**username**-vse.handson.pro](http://dev-backend-username-vse.handson.pro)
