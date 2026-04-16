# @kps/template-generator

Thư mục này đóng vai trò là **Template Engine (Bộ máy sinh code cốt lõi)** cấu thành nên nền tảng của bộ công cụ KPS CLI.

## Vai trò

- **Lưu trữ các tập lệnh (Templates)**: Chứa thư viện các cấu trúc file, thư mục, và file mã nguồn nguồn mở ở dạng template (`.hbs` - Handlebars).
- **Hệ thống tệp ảo (Virtual File System - VFS)**: Đảm nhận việc mô phỏng hệ thống quản lý file trong RAM (`memfs`). Thay vì ghi đè liên tục ra đĩa cứng khiến tiến trình bị chậm hoặc lỗi, nó render toàn bộ source template ở trên RAM.
- **Biên dịch nội dung linh hoạt**: Chứa nhân thực thi (engine) với Handlebars, phân tích các cú pháp `{{#if}}`, `{{includes}}` để render đúng đoạn code cấu hình cần thiết theo lựa chọn của người dùng (ví dụ: Prisma vs Drizzle).

## Tương tác với CLI (`apps/cli`)

Đây là trái tim xử lý tác vụ nặng nhất được CLI triệu gọi. Luồng hoạt động:

1. **Lấy tham số**: CLI (`apps/cli`) tương tác với người dùng ở dạng câu hỏi trắc nghiệm (Prompts), sau đó nhóm các câu trả lời thành một đối tượng cài đặt.
2. **Kích hoạt Generator**: CLI nhập (import) module Generator từ package này và truyền đối tượng cài đặt vào đó.
3. **Template Trộn & AST**: Generator lấy template từ tệp `.hbs`, biên dịch cùng biến đã truyền, sử dụng thêm `ts-morph` nếu muốn sửa code TypeScript phức tạp và đổ vào `memfs`.
4. **Ghi ra đĩa**: Cuối cùng, `fs-writer` của thư mục này đọc từ File System ảo và ghi ra đường dẫn thực tế để ra lò mã nguồn cuối cùng của người dùng.

## Các lệnh nội bộ (Scripts)

- `bun run generate-templates`: Tích hợp script trước build để cào (parse) hoặc gom nhóm templates.
- `bun run build`: Đóng gói package (sử dụng `tsdown`).
- `bun run dev`: Chế độ live-reload xem trước cho phát triển module Generator.
