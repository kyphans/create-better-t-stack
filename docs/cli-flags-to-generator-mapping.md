# Sơ Đồ Ánh Xạ CLI Flags với Template Generator

Tài liệu này giải thích chi tiết quá trình ứng dụng CLI truyền các tham số (flags/options) xuống module `template-generator/src` hoạt động như thế nào, và mỗi tham số sẽ gọi trình xử lý (handler) nào, template nào tương ứng để sinh ra mã nguồn.

Khởi điểm của quá trình là khi UI Prompt kết thúc, một `ProjectConfig` object được ném vào hàm `generate({ config, templates })` nằm tại `packages/template-generator/src/generator.ts`. Hàm `generate` này sẽ lần lượt kích hoạt một loạt các Handler.

## 1. Mạch Nước Chính (Core Generation Matrix)

Hàm `generate()` luôn luôn kích hoạt thư mục nòng cốt trước. Bất kể bạn có dùng cờ (flag) nào, bước này luôn được khơi mào bởi:

- **Tham số**: Luôn chạy.
- **Handler**: `template-handlers/base.ts` và `template-handlers/packages.ts`.
- **Template gọi đến**: `templates/base/` (gồm gitignore, tsconfig, package.json monorepo chuẩn) và chuẩn bị sẵn file `kps.jsonc`.

## 2. Ánh Xạ Các Cờ (Flags Mapping)

### `--frontend`

- **Giá trị cho phép**: `next`, `nuxt`, `tanstack-router`, `svelte`, `native-bare`,... (Thường là mảng nhiều lựa chọn do có thể vừa chọn Web vừa chọn Web-Native)
- **Handler gọi đến**: `template-handlers/frontend.ts`.
- **Thư mục template tương ứng**: `templates/frontend/<ngôn-ngữ>/<framework>`. (Ví dụ: Nếu cờ `next`, code sẽ móc `templates/frontend/react/next`).
- **Logic bổ sung**: Handler này tạo vòng lặp cho mỗi loại Frontend. Nếu user lỡ không chọn (None), nó sẽ bỏ qua.

### `--backend`

- **Giá trị cho phép**: `express`, `fastify`, `self`, `none`. (Đã loại bỏ hono, elysia theo kế hoạch giảm thiểu).
- **Handler gọi đến**: `template-handlers/backend.ts`.
- **Thư mục template tương ứng**: `templates/backend/<tên-framework>`.
- **Logic bổ sung**: Dựng thư mục `apps/server` (nếu có server độc lập) hoặc chỉnh sửa API routes ngay trên Next/Nuxt nếu cờ backend là `self`.

### `--api`

- **Giá trị cho phép**: `trpc`, `orpc`, `none`.
- **Handler gọi đến**: `template-handlers/api.ts`.
- **Thư mục template tương ứng**: `templates/api/<tên-api>`.
- **Logic bổ sung**: Thư mục này đặc biệt ở chỗ nó không đứng độc lập mà nó sinh ra package lõi `packages/api`. Tuỳ theo biến frontend (Ví dụ React vs Vue), api loader này sẽ chèn provider/plugin context phù hợp với reactivity framework đó vào ứng dụng UI.

### `--orm` và `--database`

- **Giá trị cho phép**: `drizzle`, `prisma` kết hợp cùng `postgres`, `sqlite`...
- **Handler gọi đến**: `template-handlers/database.ts`.
- **Thư mục template tương ứng**: `templates/db/<tên-orm>`.
- **Logic bổ sung**: Mặc dù người dùng có 2 cờ tách biệt, nhưng Database Handler gộp chúng lại. Nó copy thư mục chứa boilerplate cấu trúc ORM. Sau đó dùng hệ thống Filter Handlebars (Ví dụ if `database === sqlite`) để tinh chỉnh Connection String và Driver thay vì phải có template riêng cho Prisma-Sqlite và Prisma-Postgres.

### `--auth`

- **Giá trị cho phép**: `better-auth`, `clerk`, `none`.
- **Handler gọi đến**: `template-handlers/auth.ts`.
- **Thư mục template tương ứng**: `templates/auth/<tên-auth>`.
- **Logic bổ sung**: Auth Handler sẽ tiêm middleware (nếu dùng Clerk trên Next.js) hoặc sinh ra route endpoint API cho `better-auth`. Quá trình hoạt động phụ thuộc lớn vào việc user đang gắn Backend gì, Frontend gì để inject Provider cho chuẩn.

### `--addons`

- **Giá trị cho phép (Array)**: `turborepo`, `tauri`, `pwa`, `biome`,...
- **Handler gọi đến**: `template-handlers/addons.ts`.
- **Thư mục template tương ứng**: `templates/addons/<tên-addon>`.
- **Logic bổ sung**: Nếu gọi `--addons turborepo`, handler sẽ tạo ra file file `turbo.json`. Nếu gọi `--addons tauri`, nó sẽ lôi mã từ `addons/tauri` ném vào frontend. Đồng thời kích hoạt script thay đổi `package.json` để thêm scripts mới (`bun tauri dev`).

## 3. Hệ Thống Ánh Xạ Biến Đổi Ảo Hóa (Post-Processors)

Template nằm y nguyên thì sẽ gặp vấn đề lớn: Ai sẽ giải quyết việc tiêm versions (phiên bản NPM package) cho ngần ấy cờ?
Điều đó làm được là nhờ Bộ Tiền Xử Lý (Post-Processors) được kích hoạt cuối hàm `generate()`:

- **Các Files:** Nằm tại `packages/template-generator/src/processors/` (Tiêu biểu là `alchemy-plugins.ts`).
- **Cách thức:** Nó không copy folder như các handler ở trên. Nó lấy kết quả Config File cuối cùng, quét file `package.json` trên VFS, và bổ sung các gói phụ thuộc (Dependencies).
- **Ví dụ Map Cờ:** Nếu thấy object config chứa cờ `auth: "better-auth"`, Processor này sẽ tự động search biến `dependencyVersionMap` rồi nhét lệnh instal dependency `better-auth`: `"^x.y.z"` vào file `package.json` của Backend (hoặc Web). Bằng cách này, mọi dependencies được kiểm soát từ trung ương.

---

### Tóm Lược Cơ Chế Rót Khuôn (The Mold Strategy)

- **Flag Nhập:** Xác định đường dẫn tương đối tới Node chứa thư mục Template.
- **Hanlder:** Đóng vai trò là ống dẫn ống dẫn nước, rút Folder đó ra và nối thẳng vào đích muốn đến (`apps/web` hay `packages/db`).
- **Handlebars Compiler:** Đóng vai trò là rây lộc. Nếu trong Folder trích xuất có file `.hbs`, nó thay đổi chữ cái text tĩnh bằng giá trị của biến Cờ.
- **Processor:** Đi nhặt sạn. Nó thêm các versions thư viện và gộp Array scripts lại cho Project hoàn chỉnh.
