# labs-next-js

[![Quality gate status](https://sonarcloud.io/api/project_badges/measure?project=Agustin-Perezz_labs-next-js&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Agustin-Perezz_labs-next-js)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Agustin-Perezz_labs-next-js&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Agustin-Perezz_labs-next-js)

A lab for advanced Next.js 16 concepts. Each route under `src/app/rendering-strategies/` shows one rendering model with a working example and an inline explanation.

The repo is not a starter. It is a place to try ideas that the Next.js 16 App Router makes possible: cache components, partial prerendering, server actions, Suspense streaming, and the new cache APIs.

## Rendering Strategies

The routes under `src/app/rendering-strategies/` show how the App Router renders a page. Each route has a card that tells you what the strategy does, plus a live piece of data that proves it.

| Route                          | Model                            | What it shows                                              |
| ------------------------------ | -------------------------------- | ---------------------------------------------------------- |
| `/rendering-strategies/ssg`    | Static Site Generation           | HTML prerendered at build time                             |
| `/rendering-strategies/ssr`    | Server-Side Rendering            | A fresh timestamp on every request                         |
| `/rendering-strategies/isr/1`  | Incremental Static Regeneration  | Cache becomes stale after 60 seconds, then regenerates      |
| `/rendering-strategies/csr`    | Client-Side Rendering            | The browser fetches data after hydration                   |
| `/rendering-strategies/ppr`    | Partial Prerendering             | Static shell plus a dynamic clock streamed through Suspense |

A Next.js 16 note: the project sets `cacheComponents: true` in `next.config.ts`. This removes the legacy route segment configs (`export const revalidate`, `dynamicParams`). Pages now opt into caching with the `"use cache"` directive and opt out of prerendering with `await connection()` inside a `<Suspense>` boundary.

## Tech Stack

| Area            | Choice                                         |
| --------------- | ---------------------------------------------- |
| Framework       | Next.js 16 (App Router, cacheComponents)       |
| UI runtime      | React 19                                       |
| Language        | TypeScript (strict)                            |
| Components      | base-ui + shadcn                               |
| Styling         | Tailwind CSS v4                                |
| Forms           | react-hook-form + zod                          |
| Lint / Format   | Biome 2                                        |
| Unit tests      | Vitest + Testing Library (jsdom)               |
| Coverage        | `@vitest/coverage-istanbul` (lcov → SonarCloud) |
| E2E             | Playwright (Chromium)                          |
| Monitoring      | Sentry (`@sentry/nextjs`)                      |
| Security scan   | Snyk (SARIF → GitHub Code Scanning)            |
| Code quality    | SonarCloud (static analysis + Quality Gate)    |
| Package manager | pnpm 9                                         |
| Git hooks       | Husky + nano-staged                            |

## Folder Structure

```
labs-next-js/
├── .github/
│   └── workflows/
│       └── ci.yml                # Shift-left chain: static → unit → sonar → build → e2e (+ snyk)
├── docs/                         # Engineering guidelines
│   ├── 01_COMPONENT-PATTERNS.md
│   ├── 02_FRONTEND-FOLDER-STRUCTURE.md
│   └── 03_TYPESCRIPT-STANDARDS.md
├── public/                       # Static assets served at root
├── src/
│   ├── app/
│   │   └── rendering-strategies/ # One folder per rendering model
│   ├── components/
│   │   └── ui/                   # Reusable base-ui / shadcn primitives
│   └── lib/
│       └── utils.ts              # Shared utilities (cn, helpers)
├── tests/                        # Playwright E2E (tests/e2e/) + Vitest unit (tests/unit/)
├── biome.json                    # Linter and formatter configuration
├── sonar-project.properties      # SonarCloud analysis configuration
├── next.config.ts                # Next.js configuration (cacheComponents enabled)
├── package.json
├── playwright.config.ts
├── vitest.config.ts              # Unit test + coverage configuration
└── tsconfig.json                 # Path alias: @/* -> ./src/*
```

See [`AGENTS.md`](./AGENTS.md) for the engineering conventions for agents and contributors.

## Setup

1. Copy `.env.example` to `.env.local`. Then fill in the values:

   ```bash
   cp .env.example .env.local
   ```

2. Install the dependencies and the Playwright browsers:

   ```bash
   pnpm install
   pnpm test:install
   ```

3. Start the dev server:

   ```bash
   pnpm dev
   ```

The app runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                 | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `pnpm dev`             | Start the dev server                                     |
| `pnpm build`           | Make the production build                                |
| `pnpm start`           | Start the production server                              |
| `pnpm lint`            | Run Biome lint and format checks                         |
| `pnpm format`          | Auto-format with Biome                                   |
| `pnpm typecheck`       | Run the TypeScript type check (`tsc --noEmit`)           |
| `pnpm test`            | Run the unit tests (Vitest)                              |
| `pnpm test:unit`       | Run the unit tests (Vitest)                              |
| `pnpm test:unit:watch` | Run the unit tests in watch mode                         |
| `pnpm test:coverage`   | Run the unit tests with coverage (writes `lcov.info`)    |
| `pnpm test:e2e`        | Run the Playwright E2E tests                             |
| `pnpm test:ui`         | Open the Playwright interactive UI                       |
| `pnpm test:install`    | Install the Playwright Chromium browser                  |

## Git Hooks

[Husky](https://typicode.github.io/husky/) manages the Git hooks:

- **pre-commit** runs `nano-staged`, which executes `biome check --staged` on the staged files.
- **pre-push** runs `pnpm typecheck && pnpm test:unit && pnpm test:e2e`.

The `prepare` script installs the hooks automatically when you run `pnpm install`.

## CI (GitHub Actions)

The `.github/workflows/ci.yml` workflow runs on push to `main` and on pull requests. It is a shift-left chain. Each stage gates the next one. A red PR stops early so it does not waste SonarCloud tokens or browser minutes.

1. **static** — Biome lint plus the TypeScript type check.
2. **unit** — Vitest unit tests with coverage. Uploads the `coverage-report` artifact.
3. **sonar** — SonarCloud analysis plus the Quality Gate. Reads the `lcov.info` from the `unit` stage.
4. **build** — production build with Sentry source map upload.
5. **e2e** — Playwright E2E tests. This stage runs last because the browsers cost the most.
6. **snyk** — scans the dependencies for high-severity vulnerabilities and uploads the results as SARIF to GitHub Code Scanning. This stage runs in parallel with `build` and continues on error.

```
static ──> unit ──> sonar ──┬──> build ──> e2e
                            └──> snyk
```

Coverage feeds the SonarCloud Quality Gate. `pnpm test:coverage` writes `coverage/lcov.info`. The `sonar-project.properties` file points SonarCloud at this report. The Quality Gate enforces a coverage of 80% on new code.

### Coverage Scope

The gate covers only `src/app/**` and `src/hooks/**`. The gate excludes `src/components/**` and `src/lib/**`. The Playwright E2E suite checks the excluded surfaces through user flows.

Reason: the UI primitives and the utilities are thin and generic. End-to-end flows check them better than per-file unit tests. This scoping keeps the unit tests focused on code that branches per route: pages, actions, feature components, and hooks.

The Vitest and the SonarCloud coverage configurations must agree. SonarCloud counts any source file that the LCOV report does not list as 0% covered. The two configurations to keep in sync are:

- `vitest.config.ts` `coverage.include` — the allow-list of files that Vitest instruments.
- `sonar-project.properties` `sonar.coverage.exclusions` — the complementary block-list. Sonar needs an entry here for every file that is not in `coverage.include`.

### Required GitHub Secrets

Configure these in **Settings → Secrets and variables → Actions**:

| Secret                   | Description                              |
| ------------------------ | ---------------------------------------- |
| `SONAR_TOKEN`            | SonarCloud analysis token                |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN (client plus server)          |
| `SENTRY_AUTH_TOKEN`      | Sentry token for the source map upload   |
| `SENTRY_ORG`             | Sentry organization slug                 |
| `SENTRY_PROJECT`         | Sentry project slug                      |
| `SNYK_TOKEN`             | Snyk API token for the dependency scan   |

## Documentation

- [Component Patterns](./docs/01_COMPONENT-PATTERNS.md)
- [Frontend Folder Structure](./docs/02_FRONTEND-FOLDER-STRUCTURE.md)
- [TypeScript Standards](./docs/03_TYPESCRIPT-STANDARDS.md)
