# Kế Hoạch Giảm Thiểu Quy Mô Dự Án (Scope Reduction Plan)

Mục tiêu của kế hoạch này là tối ưu hóa, làm nhẹ dự án bằng cách loại bỏ các backends, cơ sở dữ liệu/providers và tích hợp deploy không còn cần thiết, cụ thể:
- **Backends:** Hono, Elysia, Convex
- **Hệ sinh thái Cloudflare:** Cloudflare Workers (runtime), Cloudflare D1 (database), WEB DEPLOY, SERVER DEPLOY (Thường link với Cloudflare)
- **Database Providers:** Turso, PlanetScale

## 1. Loại Bỏ & Cập Nhật Các Kiểu Dữ Liệu (Types & Schemas)
**File:** `packages/types/src/schemas.ts` và `packages/types/src/types.ts`
- **`BackendSchema`**: Gỡ bỏ các giá trị `"hono"`, `"elysia"`, `"convex"`.
- **`RuntimeSchema`**: Gỡ bỏ `"workers"`.
- **`DatabaseSetupSchema`**: Gỡ bỏ `"turso"`, `"d1"`, `"planetscale"`.
- **`WebDeploySchema` & `ServerDeploySchema`**: Xóa hoàn toàn khỏi file do đã bỏ logic triển khai.
- **`DbSetupOptionsSchema`**: Xóa property `turso`.
- **`ProjectConfigSchema` / `KpsConfigSchema` / `CreateInputSchema`**: Xóa các props `webDeploy`, `serverDeploy`.
- **`McpServerSchema` & `SkillsSourceSchema`**: Xóa các máy chủ MCP và SDK skills liên quan đến Convex, Elysia, Hono, PlanetScale.

## 2. Cập Nhật Constants & Command Lines (CLI)
**File:** `apps/cli/src/constants.ts` và `apps/cli/src/index.ts`
- **`DEFAULT_CONFIG_BASE`**:
  - Đổi giá trị mặc định của `backend` từ `"hono"` sang một backend khác (ví dụ: `"express"` hoặc `"fastify"`).
  - Đổi giá trị mặc định của `runtime` thành `"node"` hoặc `"bun"` (nếu đang là workers).
  - Xóa `webDeploy` và `serverDeploy`.
- **`ADDON_COMPATIBILITY`**: Xóa các mapping liên đới nếu có.
- **`index.ts` (CLI Command Logic)**: Gỡ bỏ các cờ lệnh (flags) `--web-deploy`, `--server-deploy` và chỉnh sửa các rules điều kiện cờ lệnh sử dụng Backend/Runtime/DB đã gỡ bỏ.

## 3. Cắt Bỏ Nhánh Prompt Trong Terminal
**Thư mục:** `apps/cli/src/prompts/`
- **Xóa hẳn file:** `web-deploy.ts` và `server-deploy.ts`.
- **`config-prompts.ts` & `navigable-group.ts`**: Xóa các bước và cấu hình hỏi người dùng về tuỳ chọn Web Deploy và Server Deploy.
- **`backend.ts`**: Gỡ bỏ tuỳ chọn Hono, Elysia, Convex ra khỏi menu select.
- **`database-setup.ts`**: Gỡ bỏ Turso, D1, Planetscale ra khỏi giao diện lựa chọn.
- **`runtime.ts`**: Cập nhật logic, xóa tuỳ chọn `workers` và các điều kiện trỏ riêng đến Hono/Cloudflare.

## 4. Dọn Dẹp Logic Xử Lý & Xác Thực Cấu Hình
**Thư mục:** `apps/cli/src/utils/` và `apps/cli/src/helpers/`
- **`config-validation.ts` / `compatibility-rules.ts` / `display-config.ts`**:
  - Xóa mọi rules validation kiểm tra `webDeploy` hay liên quan đến Cloudflare Workers.
  - Xử lý lại việc hiển thị (display/summary) cuối cùng ở CLI để không in ra Web/Server Deploy.
- **`helpers/core/post-installation.ts`**: Xóa các đoạn script hay instructions báo log post-install đối với Hono, Elysia.
- **`helpers/addons/skills-setup.ts`**: Xóa mapping cài skill cho `yusukebe/hono-skill`, `elysiajs/skills`, PlanetScale...
- **`mcp.ts`**: Cập nhật logic MCP Schema, xóa params để tương thích đồng bộ với Schema Types mới.

## 5. Dọn Dẹp Template Files (Template Generator)
**Thư mục:** `packages/template-generator/templates/`
Xóa triệt để các folder và file code mẫu liên quan:
- `backend/hono/`
- `backend/elysia/`
- `backend/convex/` (Nếu là backend riêng, nếu có thư mục riêng ngoài frontend)
- `db-setup/turso/`
- `db-setup/d1/`
- `db-setup/planetscale/`
- `extras/cloudflare/` hoặc package chuyên để Cloudflare deployment (workers, wrangler config, v.v.).
- Rà soát các template Adapter / Route ở phần API (TRPC, ORPC) vì chúng thường có file export adapter riêng cho Elysia/Hono, cần gỡ bỏ.

**Thư mục plugin:** `packages/template-generator/src/`
- **`processors/alchemy-plugins.ts`**: Xóa việc tiêm gói cài đặt (dependencies packages) như `hono`, `@hono/node-server`, `elysia`, `@libsql/client`, `@planetscale/database`, `wrangler`, v.v...

## 6. Review & Test
- Cập nhật tài liệu CLI Usage trên Docs (nếu có các lệnh `--backend hono`).
- Build lại toàn bộ hệ thống bằng `bun build:cli` và `bun run check`.
- Thực hiện chạy thử một flow dự án trống để đảm bảo cờ hiệu logic prompt mới không trỏ đến undefined variables.
