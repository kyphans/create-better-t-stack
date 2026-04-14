# Cấu trúc dự án

Dự án `create-kps` được xây dựng theo kiến trúc **Monorepo**, tận dụng sức mạnh của **Bun** và **Turborepo** để quản lý các ứng dụng và thư viện dùng chung trong cùng một hệ sinh thái.

## 1. Ứng dụng (Apps)

- `apps/cli`:
  - **Mô tả**: Đây là ứng dụng Command Line Interface (CLI) chính được phân phối qua npm (`create-kps`).
  - **Nhiệm vụ**: Tương tác với người dùng qua console (thông qua CLI prompt), nhận các tham số (arguments & flags), điều phối logic và gọi các template generator để tạo dự án mới hoặc cấu hình addon.
  - **Cấu trúc con**: Có `src/` (chứa các commands, prompts, utilities) và `test/`.

- `apps/web`:
  - **Mô tả**: Ứng dụng Web / Document Site.
  - **Công nghệ**: Next.js.
  - **Nhiệm vụ**: Chứa toàn bộ tài liệu tĩnh (documentation) và giao diện trực quan hỗ trợ khởi tạo project (Visual Stack Builder). Trang web này được host tại `kps.pqky.dev`.

## 2. Gói thư viện (Packages)

- `packages/template-generator`:
  - **Mô tả**: "Trái tim" của hệ thống scaffolding.
  - **Nhiệm vụ**: Chứa logic sinh mã nguồn và quản lý các template. Đọc các tuỳ chọn từ ngữ cảnh của CLI, biên dịch các file **Handlebars** (`.hbs`) thành mã lập trình thực tế cho stack mong muốn (React, Drizzle, Hono...).

- `packages/types`:
  - **Mô tả**: Chứa các kiểu dữ liệu và Schemas chung (Zod).
  - **Nhiệm vụ**: Đảm bảo type safety (an toàn kiểu) giữa CLI, Web, và các luồng nội bộ khi truyền tải configuration payload.

- `packages/backend`:
  - **Mô tả**: Backend module hỗ trợ các tính năng cho `apps/web` (nếu cần).
  - **Nhiệm vụ**: Thường giao tiếp với Convex hoặc database riêng phục vụ các logic động của site tài liệu.

## Tổng kết sơ đồ cây
```
kps/
├── apps/
│   ├── cli/                   # Mã nguồn CLI chính
│   └── web/                   # Website & Tài liệu (Next.js)
├── packages/
│   ├── template-generator/    # Mã sinh template (Handlebars)
│   ├── types/                 # Type schemas / Zod
│   └── backend/               # Backend modules phục vụ Web
├── turbo.json                 # Cấu hình Turborepo
├── bunfig.toml                # Cấu hình Bun
└── package.json               # Monorepo root workspace
```
