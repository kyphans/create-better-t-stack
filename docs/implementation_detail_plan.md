# Kế hoạch Rebranding: `better-t-stack` → `kps`

## Mục tiêu

Tuỳ biến toàn bộ source code, module, lệnh CLI, và tài liệu của dự án gốc để chuyển đổi hoàn toàn tên thương hiệu `better-t-stack` thành keyword mới **`kps`** và tên miền cấu hình đi kèm **`kps.pqky.dev`**.

## Bảng ánh xạ thương hiệu (Brand Mapping Table)

Đây là bảng tra cứu chính cho toàn bộ quá trình rebranding. Mọi phase đều tham chiếu bảng này.

| Pattern gốc                   | Pattern mới              | Ghi chú                                       |
| ----------------------------- | ------------------------ | --------------------------------------------- |
| `better-t-stack` (kebab-case) | `kps`                    | Package names, CLI identifiers                |
| `Better-T-Stack` (Title-Case) | `KPS`                    | Display text, descriptions                    |
| `Better T Stack` (spaced)     | `KPS`                    | UI strings, MCP tool titles                   |
| `BetterTStack` (PascalCase)   | `Kps`                    | Schema names, TypeScript types                |
| `betterTStack` (camelCase)    | `kps`                    | Variable names, JSON keys                     |
| `@better-t-stack/`            | `@kps/`                  | npm scope prefix                              |
| `create-better-t-stack`       | `create-kps`             | CLI binary name, npm package                  |
| `create-bts`                  | `create-kps`             | CLI alias package                             |
| `bts` (abbreviation)          | `kps`                    | Config filenames, function prefixes, env vars |
| `better-t-stack.dev`          | `kps.pqky.dev`           | Domain URLs                                   |
| `r2.better-t-stack.dev`       | `r2.kps.pqky.dev`        | Schema/CDN URL                                |
| `BTS_TELEMETRY`               | `KPS_TELEMETRY`          | Environment variable                          |
| `BTS_TELEMETRY_DISABLED`      | `KPS_TELEMETRY_DISABLED` | Environment variable                          |
| `BTS_CONFIG_FILE`             | `KPS_CONFIG_FILE`        | Constant name                                 |
| `bts.jsonc`                   | `kps.jsonc`              | Generated config filename                     |

> [!WARNING]
> **QUAN TRỌNG**: Thứ tự thay thế cần ưu tiên pattern dài hơn trước - ví dụ `create-better-t-stack` phải thay trước `better-t-stack`, `@better-t-stack/` phải thay trước `better-t-stack` - để tránh partial match.

---

## Phase 1: Đổi tên Packages & Monorepo Config

**Mục tiêu**: Cập nhật tất cả `package.json` trong monorepo để thay đổi package names, dependencies, và scripts.

**Phải làm đầu tiên** vì mọi thay đổi source code ở phase sau đều phụ thuộc vào tên package mới.

### 1.1 Root `package.json`

**File**: [package.json](file:///d:/My-Project/create-better-t-stack/package.json)

Thay đổi:

```diff
- "name": "better-t-stack",
+ "name": "kps",

- "dev:cli": "turbo run dev --filter=create-better-t-stack",
+ "dev:cli": "turbo run dev --filter=create-kps",

- "build:cli": "turbo run build --filter=create-better-t-stack",
+ "build:cli": "turbo run build --filter=create-kps",

- "deploy:convex": "turbo run --filter=@better-t-stack/backend deploy",
+ "deploy:convex": "turbo run --filter=@kps/backend deploy",
```

### 1.2 CLI `package.json`

**File**: [apps/cli/package.json](file:///d:/My-Project/create-better-t-stack/apps/cli/package.json)

Thay đổi:

```diff
- "name": "create-better-t-stack",
+ "name": "create-kps",

- "better-t-stack",   (trong keywords)
+ "kps",

- "homepage": "https://better-t-stack.dev/",
+ "homepage": "https://kps.pqky.dev/",

- "url": "git+ https://github.com/kyphans/kps.git",
+ "url": "git+https://github.com/kyphans/create-kps.git",

- "create-better-t-stack": "dist/cli.mjs"
+ "create-kps": "dist/cli.mjs"

- "@better-t-stack/template-generator": "workspace:*",
- "@better-t-stack/types": "workspace:*",
+ "@kps/template-generator": "workspace:*",
+ "@kps/types": "workspace:*",
```

### 1.3 Types `package.json`

**File**: [packages/types/package.json](file:///d:/My-Project/create-better-t-stack/packages/types/package.json)

Thay đổi:

```diff
- "name": "@better-t-stack/types",
+ "name": "@kps/types",

- "description": "TypeScript types and schemas for create-better-t-stack CLI",
+ "description": "TypeScript types and schemas for create-kps CLI",

- "better-t-stack",   (trong keywords)
+ "kps",

- "homepage": "https://better-t-stack.dev/",
+ "homepage": "https://kps.pqky.dev/",

- "url": "git+ https://github.com/kyphans/kps.git",
+ "url": "git+https://github.com/kyphans/create-kps.git",
```

### 1.4 Template Generator `package.json`

**File**: [packages/template-generator/package.json](file:///d:/My-Project/create-better-t-stack/packages/template-generator/package.json)

Thay đổi:

```diff
- "name": "@better-t-stack/template-generator",
+ "name": "@kps/template-generator",

- "description": "Virtual file system generator for Better-T-Stack templates...",
+ "description": "Virtual file system generator for KPS templates...",

- "better-t-stack",   (trong keywords)
+ "kps",

- "homepage": "https://better-t-stack.dev/",
+ "homepage": "https://kps.pqky.dev/",

- "url": "git+ https://github.com/kyphans/kps.git",
+ "url": "git+https://github.com/kyphans/create-kps.git",

- "@better-t-stack/types": "^3.27.0",
+ "@kps/types": "^3.27.0",
```

### 1.5 Backend `package.json`

**File**: [packages/backend/package.json](file:///d:/My-Project/create-better-t-stack/packages/backend/package.json)

```diff
- "name": "@better-t-stack/backend",
+ "name": "@kps/backend",
```

### 1.6 Create-BTS Alias Package → Create-KPS

**File**: [packages/create-bts/package.json](file:///d:/My-Project/create-better-t-stack/packages/create-bts/package.json)

```diff
- "name": "create-bts",
+ "name": "create-kps",

- "description": "... (alias for create-better-t-stack)",
+ "description": "... (alias for create-kps)",

- "better-t-stack",   (trong keywords)
+ "kps",

- "bts",   (trong keywords)
+ "kps",

- "homepage": "https://better-t-stack.dev/",
+ "homepage": "https://kps.pqky.dev/",

- "url": "git+ https://github.com/kyphans/kps.git",
+ "url": "git+https://github.com/kyphans/create-kps.git",

- "create-bts": "cli.js"   (trong bin)
+ "create-kps": "cli.js"

- "create-better-t-stack": "^3.27.0"   (trong dependencies)
+ "create-kps": "^3.27.0"
```

Cũng cần cập nhật 3 proxy files trong `packages/create-bts/`:

**File**: `packages/create-bts/cli.js` — Đổi `create-better-t-stack` → `create-kps`
**File**: `packages/create-bts/index.js` — Đổi `create-better-t-stack` → `create-kps`
**File**: `packages/create-bts/index.d.ts` — Đổi `create-better-t-stack` → `create-kps`

> [!TIP]
> Cân nhắc rename thư mục `packages/create-bts` → `packages/create-kps` nếu muốn nhất quán hơn. Nếu rename, cần cập nhật `release.yaml` workflow nữa.

### 1.7 Web App `package.json`

**File**: [apps/web/package.json](file:///d:/My-Project/create-better-t-stack/apps/web/package.json)

```diff
- "@better-t-stack/backend": "workspace:*",
- "@better-t-stack/template-generator": "workspace:*",
- "@better-t-stack/types": "workspace:*",
+ "@kps/backend": "workspace:*",
+ "@kps/template-generator": "workspace:*",
+ "@kps/types": "workspace:*",

- "create-better-t-stack": "workspace:*",
+ "create-kps": "workspace:*",
```

### 1.8 Changelog Config

**File**: [changelogithub.config.ts](file:///d:/My-Project/create-better-t-stack/changelogithub.config.ts)

```diff
- repo: "AmanVarshney01/create-better-t-stack",
+ repo: "kyphans/create-kps",
```

---

## Phase 2: Đổi tên Files vật lý

**Mục tiêu**: Rename các file có chứa keyword `bts` trong tên thành `kps`.

### 2.1 CLI config file

```
apps/cli/src/utils/bts-config.ts → apps/cli/src/utils/kps-config.ts
```

Sau khi rename, cập nhật tất cả import references:

- `apps/cli/src/helpers/core/detect-project-config.ts`: `import { readBtsConfig } from "../../utils/bts-config"` → `import { readKpsConfig } from "../../utils/kps-config"`

### 2.2 Template generator config file

```
packages/template-generator/src/bts-config.ts → packages/template-generator/src/kps-config.ts
```

Sau khi rename, cập nhật import references:

- `packages/template-generator/src/index.ts`: `export { writeBtsConfigToVfs } from "./bts-config"` → `export { writeKpsConfigToVfs } from "./kps-config"`

### 2.3 (Tuỳ chọn) Rename thư mục `packages/create-bts`

```
packages/create-bts/ → packages/create-kps/
```

---

## Phase 3: Cập nhật Source Code — Packages Layer

**Mục tiêu**: Thay đổi tất cả brand references trong `packages/types`, `packages/template-generator`, `packages/backend`.

### 3.1 `packages/types/src/schemas.ts`

Các thay đổi cần thực hiện:

| Dòng | Thay đổi                                                                                     |
| ---- | -------------------------------------------------------------------------------------------- |
| L127 | `"better-t-stack"` (trong McpServerSchema enum) → `"kps"`                                    |
| L449 | `BetterTStackConfigSchema` → `KpsConfigSchema`                                               |
| L471 | `BetterTStackConfigFileSchema` → `KpsConfigFileSchema`                                       |
| L478 | `"https://r2.better-t-stack.dev/schema.json"` → `"https://r2.kps.pqky.dev/schema.json"`      |
| L479 | `"Better-T-Stack Configuration"` → `"KPS Configuration"`                                     |
| L480 | `"Configuration file for Better-T-Stack projects"` → `"Configuration file for KPS projects"` |

### 3.2 `packages/types/src/types.ts`

| Dòng | Thay đổi                                       |
| ---- | ---------------------------------------------- |
| L27  | `BetterTStackConfigSchema` → `KpsConfigSchema` |
| L56  | `BetterTStackConfig` → `KpsConfig`             |

### 3.3 `packages/types/src/json-schema.ts`

| Dòng | Thay đổi                                                                                        |
| ---- | ----------------------------------------------------------------------------------------------- |
| L25  | `BetterTStackConfigSchema` → `KpsConfigSchema`                                                  |
| L114 | `getBetterTStackConfigJsonSchema` → `getKpsConfigJsonSchema`                                    |
| L146 | `betterTStackConfig: getBetterTStackConfigJsonSchema()` → `kpsConfig: getKpsConfigJsonSchema()` |

### 3.4 `packages/template-generator/src/kps-config.ts` (renamed từ bts-config.ts ở Phase 2)

Nội dung cần thay đổi:

| Pattern                                                | Mới                                              |
| ------------------------------------------------------ | ------------------------------------------------ |
| `import type { BetterTStackConfig, ...`                | `import type { KpsConfig, ...`                   |
| `import ... from "@better-t-stack/types"`              | `import ... from "@kps/types"`                   |
| `const BTS_CONFIG_FILE = "bts.jsonc"`                  | `const KPS_CONFIG_FILE = "kps.jsonc"`            |
| `writeBtsConfigToVfs`                                  | `writeKpsConfigToVfs`                            |
| `const btsConfig: BetterTStackConfig`                  | `const kpsConfig: KpsConfig`                     |
| `$schema: "https://r2.better-t-stack.dev/schema.json"` | `$schema: "https://r2.kps.pqky.dev/schema.json"` |
| `npx create-better-t-stack add`                        | `npx create-kps add`                             |
| `pnpm dlx create-better-t-stack add`                   | `pnpm dlx create-kps add`                        |
| `bun create better-t-stack add`                        | `bun create kps add`                             |
| `// Better-T-Stack`                                    | `// KPS`                                         |
| `https://www.better-t-stack.dev/` (4 URLs)             | `https://www.kps.pqky.dev/`                      |
| `vfs.writeFile(BTS_CONFIG_FILE, ...)`                  | `vfs.writeFile(KPS_CONFIG_FILE, ...)`            |

### 3.5 `packages/template-generator/src/index.ts`

```diff
- export { writeBtsConfigToVfs } from "./bts-config";
+ export { writeKpsConfigToVfs } from "./kps-config";
```

### 3.6 `packages/template-generator/src/utils/reproducible-command.ts`

```diff
- import type { ProjectConfig } from "@better-t-stack/types";
+ import type { ProjectConfig } from "@kps/types";

- return "bun create better-t-stack@latest";
+ return "bun create kps@latest";

- return "pnpm create better-t-stack@latest";
+ return "pnpm create kps@latest";

- return "npx create-better-t-stack@latest";
+ return "npx create-kps@latest";
```

### 3.7 `packages/template-generator/src/processors/readme-generator.ts`

```diff
- import type { ProjectConfig } from "@better-t-stack/types";
+ import type { ProjectConfig } from "@kps/types";

- with [Better-T-Stack]( https://github.com/kyphans/kps)
+ with [KPS](https://github.com/kyphans/create-kps)

- https://www.better-t-stack.dev/docs/guides/cloudflare-alchemy
+ https://www.kps.pqky.dev/docs/guides/cloudflare-alchemy
```

### 3.8 Tất cả các `.ts` files trong `packages/template-generator/src/`

Quét recursive và thay:

- `@better-t-stack/types` → `@kps/types` (generator.ts, types.ts, và mọi file khác)
- `writeBtsConfigToVfs` → `writeKpsConfigToVfs` (nếu có reference)

### 3.9 `packages/template-generator/templates/base/package.json.hbs`

```diff
- "name": "better-t-stack",
+ "name": "kps",
```

### 3.10 `packages/backend/convex/stats.ts`

Kiểm tra và thay `create-better-t-stack` → `create-kps` (nếu có reference tới npm package name)

---

## Phase 4: Cập nhật Source Code — Apps Layer

**Mục tiêu**: Thay đổi brand references trong `apps/cli` và `apps/web`.

### 4.1 CLI Source Files

#### `apps/cli/src/cli.ts`

```diff
- createBtsCli → createKpsCli
- startBtsMcpServer → startKpsMcpServer
- "create-better-t-stack mcp" → "create-kps mcp"
- "Better T Stack MCP server" → "KPS MCP server"
```

#### `apps/cli/src/index.ts`

Danh sách thay đổi chi tiết:

| Pattern                                                | Mới                                         |
| ------------------------------------------------------ | ------------------------------------------- |
| `from "@better-t-stack/types/json-schema"`             | `from "@kps/types/json-schema"`             |
| `type BetterTStackConfig` (import)                     | `type KpsConfig`                            |
| `BetterTStackConfig` (export type)                     | `KpsConfig`                                 |
| `"betterTStackConfig"` (trong SchemaNameSchema enum)   | `"kpsConfig"`                               |
| `name: "create-better-t-stack"` (2 lần)                | `name: "create-kps"`                        |
| `"Create a new Better-T-Stack project"`                | `"Create a new KPS project"`                |
| `"Show Better-T-Stack sponsors"`                       | `"Show KPS sponsors"`                       |
| `"Open Better-T-Stack documentation"`                  | `"Open KPS documentation"`                  |
| `"Add addons to an existing Better-T-Stack project"`   | `"Add addons to an existing KPS project"`   |
| `createBtsCli`                                         | `createKpsCli`                              |
| `from "create-better-t-stack"` (trong JSDoc examples)  | `from "create-kps"`                         |
| `import ... from "@better-t-stack/template-generator"` | `import ... from "@kps/template-generator"` |
| Tất cả `Better-T-Stack` trong JSDoc comments           | `KPS`                                       |

#### `apps/cli/src/mcp.ts`

Danh sách thay đổi (rất nhiều):

| Pattern                                                 | Mới                        |
| ------------------------------------------------------- | -------------------------- |
| Tất cả `"Better T Stack"`                               | `"KPS"`                    |
| `name: "create-better-t-stack"` (McpServer constructor) | `name: "create-kps"`       |
| `"bts_get_stack_guidance"`                              | `"kps_get_stack_guidance"` |
| `"bts_get_schema"`                                      | `"kps_get_schema"`         |
| `"bts_plan_project"`                                    | `"kps_plan_project"`       |
| `"bts_create_project"`                                  | `"kps_create_project"`     |
| `"bts_plan_addons"`                                     | `"kps_plan_addons"`        |
| `"bts_add_addons"`                                      | `"kps_add_addons"`         |
| `createBtsMcpServer`                                    | `createKpsMcpServer`       |
| `startBtsMcpServer`                                     | `startKpsMcpServer`        |
| Tất cả references tới `bts_*` trong guidance text       | `kps_*`                    |

#### `apps/cli/src/constants.ts`

```diff
- from "@better-t-stack/types"
+ from "@kps/types"

- from "@better-t-stack/template-generator"
+ from "@kps/template-generator"

- projectName: "my-better-t-app",
- relativePath: "my-better-t-app",
+ projectName: "my-kps-app",
+ relativePath: "my-kps-app",
```

#### `apps/cli/src/utils/kps-config.ts` (renamed từ bts-config.ts ở Phase 2)

```diff
- import type { BetterTStackConfig } from "@better-t-stack/types";
+ import type { KpsConfig } from "@kps/types";

- const BTS_CONFIG_FILE = "bts.jsonc";
+ const KPS_CONFIG_FILE = "kps.jsonc";

- readBtsConfig → readKpsConfig
- updateBtsConfig → updateKpsConfig
- BetterTStackConfig → KpsConfig (type references)
- Tất cả BTS_CONFIG_FILE → KPS_CONFIG_FILE
```

#### `apps/cli/src/utils/render-title.ts`

```diff
- const simplifiedTitle = `Better T Stack`;
+ const simplifiedTitle = `KPS`;
```

Đồng thời thay đổi ASCII art `TITLE_TEXT` thành KPS version (thiết kế mới).

#### `apps/cli/src/utils/telemetry.ts`

```diff
- BTS_TELEMETRY_DISABLED → KPS_TELEMETRY_DISABLED
- BTS_TELEMETRY → KPS_TELEMETRY
```

#### `apps/cli/src/utils/sponsors.ts`

Kiểm tra và thay bất kỳ URL nào chứa `better-t-stack.dev` → `kps.pqky.dev`.

#### `apps/cli/src/commands/meta.ts`

```diff
- const DOCS_URL = "https://better-t-stack.dev/docs";
- const BUILDER_URL = "https://better-t-stack.dev/new";
+ const DOCS_URL = "https://kps.pqky.dev/docs";
+ const BUILDER_URL = "https://kps.pqky.dev/new";

- intro(pc.magenta("Better-T-Stack Sponsors"));
+ intro(pc.magenta("KPS Sponsors"));
```

#### `apps/cli/src/commands/history.ts`

```diff
- "Create a project with: create-better-t-stack my-app"
+ "Create a project with: create-kps my-app"
```

#### `apps/cli/src/helpers/core/detect-project-config.ts`

```diff
- import { readBtsConfig } from "../../utils/bts-config";
+ import { readKpsConfig } from "../../utils/kps-config";

- readBtsConfig → readKpsConfig (function call)

- isBetterTStackProject → isKpsProject
- path.join(projectDir, "bts.jsonc") → path.join(projectDir, "kps.jsonc")
```

#### `apps/cli/src/helpers/core/post-installation.ts`

```diff
- "Like Better-T-Stack?" → "Like KPS?"
- " https://github.com/kyphans/kps" → "https://github.com/kyphans/create-kps"
```

#### `apps/cli/src/helpers/addons/mcp-setup.ts`

```diff
- key: "better-t-stack",
- label: "Better T Stack",
- name: "better-t-stack",
+ key: "kps",
+ label: "KPS",
+ name: "kps",

- "create-better-t-stack@latest mcp"
+ "create-kps@latest mcp"
```

#### `apps/cli/src/helpers/core/add-handler.ts`

Tìm và thay tất cả import `@better-t-stack/*` → `@kps/*`, `readBtsConfig` → `readKpsConfig`, `isBetterTStackProject` → `isKpsProject`.

#### `apps/cli/src/helpers/addons/skills-setup.ts`

Tìm và thay tất cả references `@better-t-stack/*` → `@kps/*`.

#### `apps/cli/src/prompts/addons.ts`

```diff
- "Install MCP servers, including Better T Stack, via add-mcp"
+ "Install MCP servers, including KPS, via add-mcp"
```

#### `apps/cli/src/helpers/database-providers/neon-setup.ts`

```diff
- "Better T Stack referral" → "KPS referral" (3 nơi)
```

#### `apps/cli/src/types.ts`

Kiểm tra và thay tất cả re-exports từ `@better-t-stack/types` → `@kps/types`.

#### `apps/cli/src/validation.ts`

Tìm và thay tất cả import từ `@better-t-stack/*`.

#### `apps/cli/tsdown.config.ts`

```diff
- BTS_TELEMETRY: process.env.BTS_TELEMETRY || "0",
+ KPS_TELEMETRY: process.env.KPS_TELEMETRY || "0",
```

#### Quét toàn bộ `apps/cli/src/` recursive

Pattern search cho tất cả `*.ts` files:

1. `@better-t-stack/types` → `@kps/types`
2. `@better-t-stack/template-generator` → `@kps/template-generator`
3. `create-better-t-stack` → `create-kps`
4. `better-t-stack` → `kps` (chỉ context-aware, tránh thay `better-auth`)
5. `Better T Stack` → `KPS`
6. `Better-T-Stack` → `KPS`
7. `BetterTStack` → `Kps`
8. `betterTStack` → `kps`
9. `Bts` prefix functions → `Kps` prefix
10. `bts` prefix functions → `kps` prefix

### 4.2 CLI Test Files

Tất cả files trong `apps/cli/test/*.test.ts` và `apps/cli/test/*.ts`:

Pattern search tương tự như 4.1. Các file cần đặc biệt chú ý:

| File                                   | Thay đổi chính                                                                     |
| -------------------------------------- | ---------------------------------------------------------------------------------- |
| `test/setup.ts`                        | Import paths                                                                       |
| `test/test-utils.ts`                   | Import paths                                                                       |
| `test/mcp.test.ts`                     | `bts_*` tool names → `kps_*`, "Better T Stack"                                     |
| `test/input-schemas.test.ts`           | `BetterTStackConfigSchema` → `KpsConfigSchema`, `betterTStackConfig` → `kpsConfig` |
| `test/addon-setup-regressions.test.ts` | `create-better-t-stack`, `bts.jsonc` → `kps.jsonc`                                 |
| `test/add-handler.test.ts`             | `bts.jsonc` → `kps.jsonc`, `isBetterTStackProject`                                 |
| `test/addon-options.test.ts`           | `bts.jsonc` → `kps.jsonc`                                                          |
| `test/db-setup-options.test.ts`        | `bts.jsonc` → `kps.jsonc`                                                          |
| `test/silent-create-output.test.ts`    | `BTS_TELEMETRY_DISABLED` → `KPS_TELEMETRY_DISABLED`                                |

### 4.3 Web App Source Files

Quét toàn bộ `apps/web/src/**/*.ts`, `apps/web/src/**/*.tsx`:

Pattern search và replace:

1. `@better-t-stack/backend` → `@kps/backend`
2. `@better-t-stack/template-generator` → `@kps/template-generator`
3. `@better-t-stack/types` → `@kps/types`
4. `create-better-t-stack` → `create-kps`
5. `better-t-stack.dev` → `kps.pqky.dev`
6. `Better-T-Stack` → `KPS`
7. `Better T Stack` → `KPS`
8. `BetterTStack` → `Kps`
9. `betterTStack` → `kps`

Danh sách file cần thay (dựa trên grep results):

| File                                                                  | Context                |
| --------------------------------------------------------------------- | ---------------------- |
| `apps/web/src/lib/constant.ts`                                        | URLs, domain           |
| `apps/web/src/lib/sponsors.ts`                                        | GitHub URLs            |
| `apps/web/src/lib/search-config.ts`                                   | Package name           |
| `apps/web/src/lib/stack-utils.ts`                                     | CLI command references |
| `apps/web/src/app/layout.tsx`                                         | Page title, metadata   |
| `apps/web/src/app/layout.config.tsx`                                  | Site config            |
| `apps/web/src/app/manifest.ts`                                        | PWA manifest name      |
| `apps/web/src/app/sitemap.ts`                                         | Domain URL             |
| `apps/web/src/app/og/docs/[...slug]/route.tsx`                        | OG image text          |
| `apps/web/src/app/api/preview/route.ts`                               | API references         |
| `apps/web/src/app/docs/[[...slug]]/page.tsx`                          | Page metadata          |
| `apps/web/src/app/(home)/page.tsx`                                    | Landing page           |
| `apps/web/src/app/(home)/new/page.tsx`                                | Builder page           |
| `apps/web/src/app/(home)/stack/page.tsx`                              | Stack page             |
| `apps/web/src/app/(home)/showcase/page.tsx`                           | Showcase page          |
| `apps/web/src/app/(home)/analytics/page.tsx`                          | Analytics page         |
| `apps/web/src/app/(home)/analytics/analytics-client.tsx`              | Analytics              |
| `apps/web/src/app/(home)/_components/code-container.tsx`              | CLI commands           |
| `apps/web/src/app/(home)/_components/command-section.tsx`             | CLI commands           |
| `apps/web/src/app/(home)/_components/npm-package.tsx`                 | Package name           |
| `apps/web/src/app/(home)/_components/footer.tsx`                      | Links                  |
| `apps/web/src/app/(home)/_components/stats-section.tsx`               | Stats                  |
| `apps/web/src/app/(home)/showcase/_components/showcase-page.tsx`      | Showcase               |
| `apps/web/src/app/(home)/analytics/_components/live-logs.tsx`         | Analytics              |
| `apps/web/src/app/(home)/analytics/_components/analytics-sources.tsx` | Analytics              |
| `apps/web/src/app/(home)/analytics/_components/analytics-header.tsx`  | Analytics              |
| `apps/web/src/app/(home)/analytics/_components/plot-chart.tsx`        | Analytics              |
| `apps/web/src/app/(home)/new/_components/utils.ts`                    | Builder utils          |
| `apps/web/src/components/ui/share-dialog.tsx`                         | Share text             |
| `apps/web/scripts/generate-schema.ts`                                 | Schema generation      |
| `apps/web/next.config.ts`                                             | Domain redirects       |
| `apps/web/content/docs/meta.json`                                     | Docs metadata          |

---

## Phase 5: Cập nhật CI/CD, Scripts & Configuration Files

### 5.1 GitHub Workflows

#### `.github/workflows/release.yaml`

Thay đổi:

- `npm view create-better-t-stack@$VERSION` → `npm view create-kps@$VERSION`
- `.dependencies["@better-t-stack/types"]` → `.dependencies["@kps/types"]`
- `.dependencies["@better-t-stack/template-generator"]` → `.dependencies["@kps/template-generator"]`
- `"create-better-t-stack"` → `"create-kps"` (dependency key trong jq command)
- `create-bts` → `create-kps` (folder/package references)
- `BTS_TELEMETRY` → `KPS_TELEMETRY`
- Tất cả npm package URLs trong Release Summary
- Email và tên author (nếu cần thay)

#### `.github/workflows/pr-preview.yaml`

Tương tự thay `create-better-t-stack`, `@better-t-stack/*`, `BTS_TELEMETRY`.

#### `.github/workflows/test.yaml`

Tương tự thay nếu có brand references.

#### `.github/CONTRIBUTING.md`

Thay tất cả `create-better-t-stack`, `better-t-stack`, domain URLs.

#### `.github/FUNDING.yml`

Review và cập nhật nếu cần.

### 5.2 Scripts

| File                          | Thay đổi                                                                                                                               |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `scripts/bump-version.ts`     | `create-better-t-stack` → `create-kps`                                                                                                 |
| `scripts/canary-release.ts`   | `create-better-t-stack` → `create-kps`, `@better-t-stack/*` → `@kps/*`, `create-bts` → `create-kps`, `BTS_TELEMETRY` → `KPS_TELEMETRY` |
| `scripts/cleanup-previews.ts` | `create-better-t-stack` → `create-kps`                                                                                                 |
| `scripts/release.ts`          | `create-better-t-stack` → `create-kps`                                                                                                 |

### 5.3 Root Config Files

| File          | Thay đổi                                                        |
| ------------- | --------------------------------------------------------------- |
| `AGENTS.md`   | Cập nhật tất cả references — đây là user rule file, quan trọng! |
| `README.md`   | Thay toàn bộ brand, URLs, CLI commands                          |
| `LICENSE`     | Cập nhật nếu cần                                                |
| `bunfig.toml` | Kiểm tra nếu có brand references                                |

---

## Phase 6: Cập nhật Tài liệu

### 6.1 Docs chính

Tất cả files cần thay đổi brand references:

| File                                   | Patterns cần thay                                                                             |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `docs/1-cau-truc-du-an.md`             | `better-t-stack`, `Better-T-Stack`, `create-better-t-stack`, `@better-t-stack/*`, `bts.jsonc` |
| `docs/2-cac-thanh-phan.md`             | tương tự                                                                                      |
| `docs/3-quan-ly-thanh-phan.md`         | tương tự + `Better T Stack`                                                                   |
| `docs/4-workflow-cli.md`               | tương tự                                                                                      |
| `docs/5-danh-sach-stack-ho-tro.md`     | tương tự                                                                                      |
| `docs/6-huong-dan-tao-frontend-moi.md` | tương tự                                                                                      |
| `docs/7-huong-dan-tao-addon.md`        | tương tự                                                                                      |

### 6.2 CLI Docs

| File                             | Thay đổi chính                                           |
| -------------------------------- | -------------------------------------------------------- |
| `docs/cli/0-overview.md`         | Brand, CLI commands                                      |
| `docs/cli/1-structure.md`        | Brand, file paths (`bts-config` → `kps-config`)          |
| `docs/cli/2-workflow.md`         | Brand, CLI commands                                      |
| `docs/cli/3-prompts.md`          | Brand, display text                                      |
| `docs/cli/4-validation.md`       | Brand, schema names (`BetterTStackConfig` → `KpsConfig`) |
| `docs/cli/5-programmatic-api.md` | Brand, import paths, code examples                       |

### 6.3 Web Docs & Content

| File/Dir                         | Thay đổi                |
| -------------------------------- | ----------------------- |
| `apps/web/content/docs/**/*.mdx` | Tất cả brand references |
| `apps/web/README.md`             | Brand                   |

---

## Phase 7: Post-Processing & Đặc biệt

### 7.1 File `templates.generated.ts`

**File**: `packages/template-generator/src/templates.generated.ts` (~875KB)

> [!IMPORTANT]
> File này được auto-generated bởi script `packages/template-generator/scripts/generate-templates.ts`. **KHÔNG thay thế trực tiếp**. Thay vào đó:
>
> 1. Sửa template source files (`.hbs`) trước (Phase 3.9)
> 2. Chạy `bun run generate-templates` trong `packages/template-generator/` để regenerate

### 7.2 Handlebars Templates (.hbs)

Quét tất cả `packages/template-generator/templates/**/*.hbs`:

- `packages/template-generator/templates/base/package.json.hbs`: `"better-t-stack"` → `"kps"` (đã nêu ở Phase 3.9)
- HBS files trong `templates/frontend/native/*/app/(drawer)/index.tsx.hbs`: `Better T Stack` → `KPS` (3 files)
- HBS files trong `templates/auth/better-auth/native/*/app/(drawer)/index.tsx.hbs`: `Better T Stack` → `KPS` (3 files)

> [!CAUTION]
> Cẩn thận KHÔNG thay `better-auth` thành bất cứ gì — đây là tên library, không phải brand của project.

### 7.3 McpServerSchema Enum Value

Trong `packages/types/src/schemas.ts` (L127), giá trị enum `"better-t-stack"` là một **runtime value** — đồng nghĩa với việc nó ảnh hưởng tới:

- Dữ liệu JSON input/output
- MCP server definitions
- Config files đã tồn tại trên máy users

Thay `"better-t-stack"` → `"kps"` ở đây (đã nêu ở Phase 3.1).

---

## Verification Plan

### Bước 1: Reinstall Dependencies

```bash
# Xoá node_modules và lock file cũ
rm -rf node_modules apps/cli/node_modules apps/web/node_modules packages/*/node_modules bun.lock

# Reinstall
bun install
```

### Bước 2: Regenerate Templates

```bash
cd packages/template-generator && bun run generate-templates
```

### Bước 3: Lint & Type Check

```bash
bun run check
```

### Bước 4: Build All

```bash
bun build
```

### Bước 5: Run Tests

```bash
cd apps/cli && bun run test
```

### Bước 6: Functional Testing

```bash
# Chạy CLI tạo project thử
bun dev:cli -- --yolo
```

Kiểm tra:

- [ ] Console có in ra "KPS" thay vì "Better T Stack"
- [ ] Config file tạo ra tên `kps.jsonc` chứa `$schema: "https://r2.kps.pqky.dev/schema.json"`
- [ ] Reproducible command dùng `create-kps@latest`
- [ ] Help message hiện `create-kps`
- [ ] MCP tool names là `kps_*`

### Bước 7: Manual Spot Check

```bash
# Search cho bất kỳ leftover nào (trừ git history, node_modules, dist)
grep -r "better-t-stack" --include="*.ts" --include="*.tsx" --include="*.json" --include="*.md" --include="*.yaml" --include="*.yml" --include="*.hbs" --include="*.toml" . | grep -v node_modules | grep -v dist | grep -v .git | grep -v bun.lock
```

---

## Decisions (Resolved)

Các quyết định đã được xác nhận bởi owner:

| #   | Câu hỏi                          | Quyết định                                                                                                                                                                                                                                |
| --- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **GitHub repository URL**        | ⏳ **GIỮ NGUYÊN** URL hiện tại (`AmanVarshney01/create-better-t-stack`). Chưa đổi repo URL trong giai đoạn này. Tất cả `git+ https://github.com/kyphans/kps.git` giữ nguyên.                                      |
| 2   | **Author info**                  | ✅ Đổi thành `Ky Phan`. Thay `"Aman Varshney"` → `"Ky Phan"` trong tất cả `package.json` files và git config trong workflows.                                                                                                             |
| 3   | **Rename `packages/create-bts`** | ✅ **CÓ**. Rename `packages/create-bts/` → `packages/create-kps/`. Cần cập nhật cả `release.yaml`, `canary-release.ts`, và bất kỳ workflow nào reference đến thư mục này.                                                                 |
| 4   | **npm publish scope**            | ⏳ Chưa có plan publish lên npm registry. Scope `@kps/*` chưa cần verify. Đổi tên package trong source code bình thường, nhưng bỏ qua phần `publishConfig` verification.                                                                  |
| 5   | **Auto Search & Replace**        | ✅ **CÓ**, nhưng phải cẩn thận. Được phép dùng PowerShell/Node script. Quy tắc bắt buộc: (a) Exclude `better-auth` khỏi replacements, (b) Ưu tiên replace patterns dài trước, (c) Dry-run trước khi apply, (d) Review diff sau mỗi batch. |
| 6   | **ASCII art TITLE_TEXT**         | ✅ **CÓ**, redesign ASCII art cho "KPS".                                                                                                                                                                                                  |

---

## Bổ sung: Author Mapping

Thêm vào bảng ánh xạ ở đầu file:

| Pattern gốc                                    | Pattern mới             | Ghi chú                                           |
| ---------------------------------------------- | ----------------------- | ------------------------------------------------- |
| `"Aman Varshney"` (author name)                | `"Ky Phan"`             | Trong `package.json` files                        |
| `"amanvarshney.work@gmail.com"` (author email) | _(giữ nguyên hoặc đổi)_ | Trong `.github/workflows/release.yaml` git config |

> [!NOTE]
> GitHub repository URL (`github.com/AmanVarshney01/create-better-t-stack`) giữ nguyên trong giai đoạn rebranding này. Chỉ đổi khi thực sự migrate repo.

---

## Bổ sung: Rename thư mục `packages/create-bts` (Confirmed)

Đã xác nhận: rename `packages/create-bts/` → `packages/create-kps/`

Files cần cập nhật sau khi rename thư mục:

1. `.github/workflows/release.yaml`: Tất cả `cd packages/create-bts` → `cd packages/create-kps`
2. `.github/workflows/pr-preview.yaml`: Tương tự nếu có reference
3. `scripts/canary-release.ts`: References đến thư mục `create-bts`
4. `scripts/bump-version.ts`: References đến thư mục `create-bts`

---

## Bổ sung: KPS ASCII Art Design

Thay `TITLE_TEXT` trong `apps/cli/src/utils/render-title.ts`:

```typescript
export const TITLE_TEXT = `
 ██╗  ██╗██████╗ ███████╗
 ██║ ██╔╝██╔══██╗██╔════╝
 █████╔╝ ██████╔╝███████╗
 ██╔═██╗ ██╔═══╝ ╚════██║
 ██║  ██╗██║     ███████║
 ╚═╝  ╚═╝╚═╝     ╚══════╝
 `;
```

Và cập nhật `simplifiedTitle`:

```typescript
const simplifiedTitle = `KPS`;
```

---

## Bổ sung: Cập nhật Author trong tất cả package.json

Các file cần đổi `"author": "Aman Varshney"` → `"author": "Ky Phan"`:

1. `apps/cli/package.json` (L33)
2. `packages/types/package.json` (L14)
3. `packages/template-generator/package.json` (L14)

Trong `.github/workflows/release.yaml`, nếu cần đổi git config:

```diff
- git config --local user.name "Aman Varshney"
+ git config --local user.name "Ky Phan"
```

---

## Bổ sung: Giữ nguyên GitHub URLs

> [!WARNING]
> Theo quyết định #1, tất cả GitHub repository URLs **GIỮ NGUYÊN** trong giai đoạn này.
> Cụ thể KHÔNG thay các pattern sau:
>
> - `github.com/AmanVarshney01/create-better-t-stack` (repository URL)
> - `git+ https://github.com/kyphans/kps.git` (package.json repository)
>
> Chỉ thay đổi:
>
> - `changelogithub.config.ts` - repo field (nếu thực sự đổi repo)
> - Mọi URL khác liên quan đến domain `better-t-stack.dev` → `kps.pqky.dev`
>
> **Điều chỉnh từ plan gốc**: Các mục trong Phase 1.2, 1.3, 1.4, 1.6, 1.8 có đề cập đổi GitHub URLs → **bỏ qua phần đổi GitHub repo URL** tại các mục đó. Chỉ đổi các fields khác (name, homepage, keywords, dependencies, bin, v.v.)
