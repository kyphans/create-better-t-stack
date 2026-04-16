# CLI Overview (Tổng quan)

`apps/cli` là package chính cung cấp giao diện dòng lệnh (Command Line Interface) cho dự án `create-better-t-stack`. Nó cho phép người dùng khởi tạo các project Type-Safe TypeScript một cách nhanh chóng và có khả năng tùy biến cao.

## Vai trò trong Monorepo

Trong cấu trúc monorepo của `create-better-t-stack`, CLI đóng vai trò là "giao diện người dùng" chính cho các developer:

- Nó thu thập cấu hình từ người dùng thông qua các tham số dòng lệnh (flags) hoặc các câu hỏi tương tác (prompts).
- Nó sử dụng package `@better-t-stack/template-generator` để xử lý các template Handlebars và tạo ra cấu trúc file.
- Nó tích hợp với các hệ thống bên ngoài như Git, package managers (npm, bun, pnpm, yarn) và các dịch vụ đám mây (Cloudflare, Neon, Turso, vv...).

## Công nghệ sử dụng

CLI được xây dựng dựa trên các thư viện hiện đại:

- **[trpc-cli](https://github.com/flybondi/trpc-cli)**: Chuyển đổi một tRPC router thành một giao diện dòng lệnh mạnh mẽ. Điều này giúp CLI có thể chia sẻ schema và logic với các thành phần khác.
- **[@clack/prompts](https://github.com/natemoo-re/clack)**: Cung cấp giao diện prompt tương tác đẹp mắt và thân thiện.
- **[better-result](https://github.com/AmanVarshney01/better-result)**: Pattern handling lỗi một cách an toàn và tường minh theo kiểu hàm (functional programming), thay vì sử dụng `try/catch` truyền thống.
- **[Zod](https://zod.dev/)**: Thực hiện validate dữ liệu đầu vào và định nghĩa schema cho cấu hình project.
- **[picocolors](https://github.com/alexeyraspopov/picocolors)**: Thư viện nhỏ gọn để tô màu terminal.

## Các lệnh chính

CLI cung cấp một số thủ tục tRPC (procedures) được ánh xạ thành các lệnh:

- `create` (mặc định): Khởi tạo một project mới.
- `add`: Thêm các addons vào project hiện có.
- `history`: Xem lại lịch sử các project đã tạo.
- `sponsors`: Hiển thị danh sách các nhà tài trợ dự án.
- `docs`: Mở tài liệu chính thức trên trình duyệt.
- `builder`: Mở Stack Builder trên trình duyệt.

## Entry Points

- `src/cli.ts`: Entry point chính khi chạy từ terminal thông qua binary `create-better-t-stack`.
- `src/index.ts`: Export các hàm programmatic API để tích hợp vào các công cụ khác hoặc server-side.
- `src/virtual.ts`: Chuyên dùng cho môi trường ảo (như trình duyệt) sử dụng virtual file system.
