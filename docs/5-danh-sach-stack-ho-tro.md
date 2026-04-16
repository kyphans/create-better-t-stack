# Danh sách các Stack (Công nghệ) được hỗ trợ

Tính đến phiên bản hiện tại, CLI `create-kps` hỗ trợ một hệ sinh thái rộng lớn, tuỳ biến theo từng phần tử của kiến trúc:

## 1. Frontend Frameworks

(Tuỳ chọn cờ: `--frontend`)

- **tanstack-router**: React + TanStack Router
- **react-router**: React Router
- **tanstack-start**: TanStack Start (Fullstack Framework)
- **next**: Next.js
- **nuxt**: Nuxt (dựa trên Vue)
- **svelte**: SvelteKit
- **solid**: SolidStart
- **astro**: Astro
- **native-bare**: React Native trơn
- **native-uniwind**: React Native tích hợp NativeWind
- **native-unistyles**: React Native tích hợp Unistyles
- **none**: Bỏ qua tạo frontend

## 2. Backend Frameworks

(Tuỳ chọn cờ: `--backend`)

- **hono**: Hono (Tối ưu cho Edge và Bun)
- **express**: Express.js truyền thống
- **fastify**: Fastify
- **elysia**: Elysia (Hiệu suất siêu cao với Bun)
- **convex**: Nền tảng Convex Backend-as-a-Service
- **self**: Sử dụng chung Server/Tự biên dịch nội bộ
- **none**: Bỏ qua tạo backend

## 3. Database & ORMs

(Tuỳ chọn cờ: `--database`, `--orm`)

- **Database**:
  - `sqlite`
  - `postgres`
  - `mysql`
  - `mongodb`
  - `none`
- **ORMs / Query Builder**:
  - `drizzle`
  - `prisma`
  - `mongoose`
  - `none`

## 4. API Layer

(Tuỳ chọn cờ: `--api`)

- **trpc**: tRPC (End-to-End typesafe API via RPC)
- **orpc**: oRPC
- **none**: Không sử dụng các tầng API đặc thù

## 5. Runtimes

(Tuỳ chọn cờ: `--runtime`)

- **bun**: Nền tảng thực thi cực nhanh (Khuyến nghị)
- **node**: Node.js tiêu chuẩn
- **workers**: Cloudflare Workers
- **none**: Không chỉ định

## 6. Nền tảng cung cấp & Dịch vụ (Providers)

(Tuỳ chọn cờ: `--auth`, `--payments`, `--db-setup`)

- **Authentication**:
  - `better-auth`: Thư viện Better Auth mã nguồn mở
  - `clerk`: Clerk (Giải pháp Managed Auth)
- **Payments**:
  - `polar` (Polar.sh)
- **Database Deployment / Provisioning**: Dễ dàng tạo Cloud DB / Docker ngay từ CLI.
  - `turso`
  - `neon`
  - `supabase`
  - `prisma-postgres`
  - `planetscale`
  - `mongodb-atlas`
  - `d1` (Cloudflare D1)
  - `docker` (Dựng database container cục bộ qua docker-compose)

## 7. Web & Server Deployment

(Tuỳ chọn cờ: `--web-deploy`, `--server-deploy`)

- **cloudflare**: Hỗ trợ xuất và tự động cấu hình deploy lên Cloudflare.
- **none**

## 8. Utilities & Extensions (Addons)

(Tuỳ chọn cờ: `-a, --addons`)

- Giải pháp đa nền tảng: `pwa`, `tauri` (Desktop apps), `wxt` (Browser Extensions), `electrobun`.
- Document Websites: `starlight` (cho Astro), `fumadocs` (Next.js docs).
- Code Quality & Git Hooks: `biome` (Linter & Formatter xịn, cực tốc độ), `oxlint`, `lefthook` (Quản lý Hooks bằng Rust thay thế husky), `husky`, `ultracite`.
- Monorepo: `turborepo`, `nx`.
- Trải nghiệm Agent & Dev Tooling: `mcp`, `opentui`, `skills`.

> **Lưu ý:** Bạn có thể xem toàn bộ các Option nội tại và cách cấu hình chi tiết thông qua các schemas ở đường dẫn `packages/types/src/schemas.ts`.
