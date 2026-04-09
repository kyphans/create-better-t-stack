# Các thành phần cốt lõi của dự án

Dự án `better-t-stack` mang triết lý **"Roll your own stack"** (tự xây dựng bộ công cụ theo ý muốn), nên bản thân nó bao gồm nhiều khối cấu thành (components/modules) tuỳ chọn:

## 1. Frontend Frameworks
Hỗ trợ tạo giao diện người dùng hiển thị đa nền tảng và tối ưu hóa trải nghiệm:
- **React Ecosystem**: Kết hợp sử dụng TanStack Router, React Router, hoặc TanStack Start.
- **Meta Frameworks**: Next.js, Nuxt, Svelte, Solid, Astro.
- **Mobile**: React Native (Bare, NativeWind, Unistyles).
- *Hoặc có thể bỏ qua frontend (none) nếu chỉ làm backend.*

## 2. Backend Frameworks
Các nền tảng tạo máy chủ phục vụ API hoặc Server-side rendering (SSR):
- **Node/Edge**: Hono, Express, Fastify, Elysia.
- **BaaS (Backend-as-a-Service)**: Convex.
- **Self**: Xây dựng web tĩnh/động kết hợp (fullstack logic trên 1 server).
- *Hoặc bỏ qua backend (none).*

## 3. Lớp Giao tiếp Backend-Frontend (API Types)
Đảm bảo type safe end-to-end cho ứng dụng:
- **tRPC**
- **oRPC**

## 4. Cơ sở dữ liệu và ORM (Database & ORMs)
Cho phép linh hoạt kết nối và thao tác với dữ liệu:
- **Database**: SQLite, PostgreSQL, MySQL, MongoDB.
- **ORM / Query Builders**: Drizzle, Prisma, Mongoose.
- Các công cụ tích hợp nhanh DB server: *Turso, Neon, Supabase, Prisma PostgreSQL, MongoDB Atlas, Cloudflare D1, Docker.*

## 5. Runtimes
Môi trường thực thi cho JavaScript/TypeScript:
- Node.js
- Bun (Khuyến nghị do CLI đang tận dụng mạnh mẽ môi trường Bun)
- Cloudflare Workers

## 6. Tiện ích và Addons (Mở rộng tính năng)
Người dùng có thể thêm các tiện ích tuỳ chọn trong quá trình cài đặt hoặc bằng lệnh `add`:
- **Auth**: Better Auth, Clerk.
- **Monorepo Tools**: Turborepo, Nx.
- **Chất lượng code**: Biome, Oxlint, Lefthook, Husky.
- **Nền tảng khác**: Tauri (Desktop), Electrobun, PWA, WXT (Browser Extensions).
- **Documentation Docs**: Starlight, Fumadocs.
- **Chức năng thí điểm**: MCP (Model Context Protocol), Ultracite, OpenTUI, Skills...
