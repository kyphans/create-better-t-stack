# Hướng Dẫn Chi Tiết Mã Nguồn Ứng Dụng CLI (KPS CLI)

Chào mừng kiến trúc sư/nhà phát triển! Bộ tài liệu này được biên soạn nhằm mục đích giải thích rõ ràng kiến trúc, cách tổ chức mã nguồn, luồng hoạt động (flow), và hướng dẫn cách mở rộng/phát triển ứng dụng `create-kps` (trước đây là `create-better-t-stack`) nằm trong thư mục `apps/cli`.

Dưới đây là mục lục tổng hợp dẫn đến các tài liệu chi tiết cho từng phần của CLI:

## Mục Lục Tài Liệu (Table of Contents)

1. **[Điểm Đầu Vào & Kiến Trúc Core (Entry Points)](./1-entry-points.md)**
   > Giải thích luồng khởi chạy từ terminal, vai trò của `cli.ts`, `index.ts`, và cơ chế định tuyến bằng `tRPC Cli`.

2. **[Hệ Thống Tương Tác Chỉ Dẫn (Prompts System)](./2-prompts-system.md)**
   > Chi tiết về giao diện dòng lệnh (CLI UI) sử dụng `@clack/prompts`, hệ thống điều hướng thông minh `navigable.ts` cho phép người dùng đi tới/lui giữa các bước.

3. **[Trình Xử Lý Lệnh Tập Lõi (Core Command Handlers)](./3-core-command-handlers.md)**
   > Phân tích quy trình tạo dự án (Project Generation Flow), cách tương tác với hệ thống File Ảo (Virtual File System - VFS) và phân giải dependencies.

4. **[Các Công Cụ & Trình Xác Thực (Utils & Validation)](./4-utils-and-validation.md)**
   > Tổng hợp các hàm tiện ích như kiểm tra tương thích (compatibility rules), bắt lỗi (error handling), format code, và gửi telemetry.

5. **[Hướng Dẫn Mở Rộng & Phát Triển (Development Guide)](./5-development-guide.md)**
   > Các bước tiêu chuẩn để thêm một addon mới, thay đổi template, hoặc sửa lỗi trong CLI mà không làm phá vỡ kiến trúc cũ.

---

### Tóm tắt Luồng Hoạt Động Của CLI (High-Level CLI Flow)

1. **Khởi chạy (Init):** Người dùng gõ `npx create-kps`.
2. **Khảo sát (Prompt):** Hệ thống đọc flag hoặc hỏi người dùng cấu hình dự án thông qua Terminal UI.
3. **Xác thực (Validation):** Kiểm tra xem những framework/công nghệ bạn đã chọn có tương thích chéo với nhau không (vd: Web router nào đòi hỏi backend nào...).
4. **Xây dựng VFS (Virtual File System):** Build toàn bộ source code trên thanh ram chứ chưa ghi thẳng xuống đĩa cứng.
5. **Đổ dữ liệu (Flush):** Ghi file từ VFS xuống thư mục hệ thống của người dùng.
6. **Hậu xử lý (Post Install):** Chạy `npm install`, Git init, định dạng code bằng `.oxfmt`, cài CLI skills.
7. **Báo cáo (Report):** Kết thúc tác vụ và đưa ra màn hình Success kèm Hướng dẫn bước đi tiếp.
