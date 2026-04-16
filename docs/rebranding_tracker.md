# Rebranding Progress Tracker: `better-t-stack` → `kps`

## Overview

- **Brand**: `kps` / `KPS`
- **Domain**: `kps.pqky.dev`
- **Author**: Ky Phan
- **Status**: ▓░░░░░░░░░ (0% Complete)

---

## ✅ Phase 1: Package & Namespace Renaming

- [x] 1.1 Root `package.json`
- [x] 1.2 CLI `package.json` (`create-kps`)
- [x] 1.3 Types `package.json` (`@kps/types`)
- [x] 1.4 Template Generator `package.json` (`@kps/template-generator`)
- [x] 1.5 Backend `package.json` (`@kps/backend`)
- [x] 1.6 Create-BTS Alias Package (`create-kps`)
- [x] 1.7 Web App `package.json` (Internal dependencies)
- [x] 1.8 `changelogithub.config.ts` (Decision #1: Skipped)
- [x] 1.9 Rename `packages/create-bts` → `packages/create-kps`
- [x] 1.10 Update proxy files in `packages/create-kps`

## ✅ Phase 2: Physical File Renaming

- [x] 2.1 `apps/cli/src/utils/bts-config.ts` → `kps-config.ts`
- [x] 2.2 `packages/template-generator/src/bts-config.ts` → `kps-config.ts`
- [x] 2.3 Update all import references for renamed files

## ✅ Phase 3: Source Code Updates — Packages Layer

- [x] 3.1 `packages/types/src/schemas.ts`
- [x] 3.2 `packages/types/src/types.ts`
- [x] 3.3 `packages/types/src/json-schema.ts`
- [x] 3.4 `packages/template-generator/src/kps-config.ts`
- [x] 3.5 `packages/template-generator/src/index.ts`
- [x] 3.6 `packages/template-generator/src/utils/reproducible-command.ts`
- [x] 3.7 `packages/template-generator/src/processors/readme-generator.ts`
- [x] 3.8 Update all `.ts` files in `packages/template-generator/src/` (Recursive)
- [x] 3.9 `packages/template-generator/templates/base/package.json.hbs`
- [x] 3.10 `packages/backend/convex/stats.ts`

## ⏺ Phase 4: Source Code Updates — Apps Layer

- [ ] 4.1 CLI Source Files
  - [ ] `apps/cli/src/cli.ts`
  - [ ] `apps/cli/src/index.ts`
  - [ ] `apps/cli/src/mcp.ts`
  - [ ] `apps/cli/src/constants.ts`
  - [ ] `apps/cli/src/utils/kps-config.ts`
  - [ ] `apps/cli/src/utils/render-title.ts` (ASCII Art)
  - [ ] `apps/cli/src/utils/telemetry.ts`
  - [ ] `apps/cli/src/commands/meta.ts`
  - [ ] `apps/cli/src/commands/history.ts`
  - [ ] `apps/cli/src/helpers/core/detect-project-config.ts`
  - [ ] `apps/cli/src/helpers/core/post-installation.ts`
  - [ ] `apps/cli/src/helpers/addons/mcp-setup.ts`
  - [ ] `apps/cli/tsdown.config.ts`
  - [ ] Batch replace in `apps/cli/src/` (Recursive)
- [ ] 4.2 CLI Test Files
  - [ ] `apps/cli/test/` batch replace
- [ ] 4.3 Web App Source Files
  - [ ] `apps/web/src/` batch replace

## ⏺ Phase 5: CI/CD, Scripts & Configuration

- [ ] 5.1 GitHub Workflows
  - [ ] `release.yaml`
  - [ ] `pr-preview.yaml`
- [ ] 5.2 Scripts
  - [ ] `bump-version.ts`
  - [ ] `canary-release.ts`
- [ ] 5.3 Root Files
  - [ ] `AGENTS.md`
  - [ ] `README.md`

## ⏺ Phase 6: Documentation

- [ ] 6.1 Core Docs (`docs/*.md`)
- [ ] 6.2 CLI Docs (`docs/cli/*.md`)
- [ ] 6.3 Web Docs (`apps/web/content/docs/`)

## ⏺ Phase 7: Post-Processing

- [ ] 7.1 Handlebars Templates (.hbs) updates
- [ ] 7.2 Run `bun install` & `bun run generate-templates`
- [ ] 7.3 Verification (Build, Test, Functional CLI run)
