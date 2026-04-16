# @kps/backend

Thư mục này chứa mã nguồn Backend (được xây dựng bằng [Convex](https://convex.dev/)) phục vụ cho trang web/tài liệu của dự án KPS.

## Vai trò
- Cung cấp cơ sở dữ liệu và các API/backend logic cho ứng dụng phân phối tài liệu hoặc website chính của KPS (nằm trong `apps/web`).
- Phục vụ các tính năng như lưu trữ dữ liệu, cron jobs, thống kê hoặc tracking liên quan đến website hiển thị (dựa trên các package nhúng như `convex-oss-stats`).

## Tương tác với CLI (`apps/cli`)
- **Không tương tác trực tiếp**: Thư mục `backend` này hoạt động hoàn toàn độc lập với quá trình khởi tạo project của CLI. Nó chỉ hỗ trợ tài liệu web/marketing site của KPS để đem đến trải nghiệm tốt cho người dùng truy cập.

## Các lệnh nội bộ (Scripts)
Các lệnh này có thể dùng qua npm/bun tại thư mục hiện tại:
- `bun run dev`: Khởi chạy môi trường phát triển của Convex tĩnh.
- `bun run dev:setup`: Cấu hình tự động và khởi động server local cho dự án Convex.
- `bun run deploy`: Triển khai database schema và các server functions lên môi trường production của Convex.
