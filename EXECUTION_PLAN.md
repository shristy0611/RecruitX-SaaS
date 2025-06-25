## RecruitX – Ultra-Granular Execution Plan

> Keep this file open during development. Mark each task with ✅ when done.

### Legend
- **Epic X-Y-Z**  
  `X` = Epic number.  
  `Y` = Sub-epic index.  
  `Z` = Ticket number.  
Example: `3-1-04` is Epic 3, group 1, ticket 04.

---

### Coding Techniques Reference (SOTA – 2025)
1. **Test-Driven Development (TDD)** – Write failing unit test before implementation.
2. **Strict Typing** – TypeScript `strict=true`; use generic utility types.
3. **Functional Core / Imperative Shell** – Pure functions in `packages/*`; side-effects isolated in API routes & workers.
4. **Idempotent Server Actions** – Ensure safe retries by making DB writes idempotent (use unique job IDs).
5. **Observability-First** – Structured logging (Pino), distributed tracing (OpenTelemetry).
6. **Security by Default** – Parametrised queries (Prisma), HTTP headers (CSP, CSRF), S3 bucket policies "private".
7. **Infrastructure as Code** – `fly.toml`, `vercel.json`, Supabase migrations.
8. **Continuous Benchmarking** – Weekly eval set regression test for AI models.
9. **GitHub Actions with Matrix Testing** – Chrome + WebKit; Node v18/v20.
10. **Code Review Checklist** – Performance, security, readability, test coverage.

---

### Epics & Micro-Tasks
_(copy of plan shared in chat)_

#### EPIC 0 — Repository & DX bootstrap
- ✅ 0-1-01 Create GitHub repo `recruitx` → push current prototype.
- ✅ 0-1-02 Add MIT licence & `README.md` high-level vision.
- ✅ 0-1-03 Run `corepack enable && pnpm --version` (lock to pnpm).
- ✅ 0-1-04 Init `turbo.json` workspace: `apps/` + `packages/`.
- ✅ 0-1-05 Add `.vscode` settings: `"typescript.tsdk": "node_modules/typescript/lib"`.
- ✅ 0-1-06 Install prettier/eslint configs (`@shadcn/eslint-config`).
- ✅ 0-1-07 Add Husky pre-commit: `pnpm lint && pnpm test --silent`.
- ✅ 0-1-08 GitHub Action: Node 20 matrix, cache pnpm, run `turbo run lint test`.
- ✅ 0-1-09 Enable Dependabot (npm + GitHub-actions).
- ✅ 0-1-10 Add `commitlint` + Conventional Commits workflow.

_DoD: PR passes CI, commit style enforced, dev gets zero warnings on `pnpm dev`._

#### EPIC 0.2 — Folder Architecture (Monorepo layout)
- ✅ 0-2-01 Create top-level directories: `apps/`, `packages/`, `scripts/`, `docs/`.
- ✅ 0-2-02 Inside `apps/` add `web/` (Next.js front-end) and `worker/` (queue consumers).
- ✅ 0-2-03 Inside `packages/` add `db/` (Prisma), `ai/` (ML helpers), `ui/` (shared UI components), `config/` (typescript, eslint, tailwind presets).
- ✅ 0-2-04 Move `recruiter_ai_prototype.tsx` → `apps/web/src/app/(prototype)/page.tsx` temporarily.
- ✅ 0-2-05 Create placeholder `README.md` inside each package with description.
- ✅ 0-2-06 Add empty `.gitkeep` files to commit empty dirs.
- ✅ 0-2-07 Root `tsconfig.json` extends `@tsconfig/strictest/tsconfig.json`; path aliases set (`@/db`, `@/ai`).
- ✅ 0-2-08 Configure `turbo.json` pipelines: `build`, `dev`, `lint`, `test` across apps & packages.
- ✅ 0-2-09 Verify `pnpm install` completes without hoisting errors.
- ✅ 0-2-10 Commit & push folder skeleton to `main` branch.

_DoD: Repository tree matches architecture diagram; CI passes after skeleton commit._

#### EPIC 1 — Multi-tenant Auth & Account model
- ✅ 1-1-00 Init `package.json` for `apps/web` to enable local dependencies.
- ✅ 1-1-01 Install Clerk: `pnpm add @clerk/nextjs`.
- ✅ 1-1-02 Create Clerk app; copy `.env.local` keys.
- ✅ 1-1-03 Wrap Next.js root layout with `<ClerkProvider/>`.
- ✅ 1-1-04 Replace prototype "AI Ready" badge with real user avatar + sign-out.
- ✅ 1-1-05 Add Prisma (`packages/db`) and generate schema.
- ✅ 1-1-06 Model `Workspace` + `WorkspaceUser` (multi-PK).
- 1-1-07 Add `POST /api/workspaces` to create workspace after first login.
- 1-1-08 Seed DB in `prisma/seed.ts` with sample workspace & user.
- 1-1-09 Write `getCurrentWorkspace()` util reading cookie `activeWorkspaceId`.
- 1-1-10 UI: workspace switcher in header (`shadcn/ui` popover).

_DoD: Two browser sessions have isolated data._

#### EPIC 2 — Billing & Quotas
- 2-1-01 Create Stripe test account and three prices; copy IDs to `.env`.
- 2-1-02 Backend util `getOrCreateStripeCustomer(userId)`.
- 2-1-03 `POST /api/billing/checkout` → Stripe Checkout session.
- 2-1-04 Front-end modal "Upgrade Plan".
- 2-1-05 Webhook route verifying signature.
- 2-1-06 Upsert `StripeSubscription` table.
- 2-1-07 Add Redis counter `used:<workspaceId>:<yyyymm>`.