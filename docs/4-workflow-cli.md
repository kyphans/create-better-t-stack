# Workflow luồng hoạt động của CLI (bằng ASCII)

Workflow chính mô tả các tiến trình chạy ngầm từ lúc người dùng gọi CLI thực thi ứng dụng tạo Scaffold và luồng dữ liệu (Data Pipeline).

```text
 +-----------------------------------------------------------------+
 |                     NHẬP LỆNH / CHỈ ĐỊNH CLI                    |
 |        e.g: bun create-kps --frontend=react          |
 +-------------------------------+---------------------------------+
                                 |
                                 v
 +-------------------------------+---------------------------------+
 |               PROCESS & VALIDATE ARGS / FLAGS (ZOD)             |
 |  xác thực đầu vào, báo lỗi nếu yolo-mode tắt, gán config mặc định |
 +-------------------------------+---------------------------------+
                                 |
                                 v
 +-------------------------------+---------------------------------+
 |                     INTERACTIVE VỚI PROMPT                      |
 |  Nếu thiếu cấu hình -> Gọi prompt hỏi Frontend, Backend, DB...  |
 +-------------------------------+---------------------------------+
                                 |
                                 v
 +-------------------------------+---------------------------------+
 |                      DIR CONFLICT HANDLER                       |
 | Check xem thư mục cài đặt dự án đã có chưa, nếu trùng thì hỏi  |
 | Merge, Overwrite hay Increment (thêm đuôi 1, 2, 3...)           |
 +-------------------------------+---------------------------------+
                                 |
                                 v
 +-------------------------------+---------------------------------+
 |                    GỌI TEMPLATE GENERATOR                       |
 | Đẩy bộ cấu hình xuống packages/template-generator để Map ra    |
 | các thư mục tương ứng bên trong packages/template-generator/... |
 +-------------------------------+---------------------------------+
                                 |
                                 v
 +-------------------------------+---------------------------------+
 |         THỰC THI HANDLEBARS ENGINE (Render Logic & HBS)         |
 | Tự động escape (\{{), tính toán {{~#if}} cho ORM, DB, Auth...   |
 | Sinh ra file text/mã lập trình hợp chuẩn trên Memory trước.     |
 +-------------------------------+---------------------------------+
                                 |
                                 v
 +-------------------------------+---------------------------------+
 |                       FILE SYSTEM WRITER                        |
 |         Đổ Data từ Template Generator sang ổ đĩa vật lý         |
 +-------------------------------+---------------------------------+
                                 |
                                 v
 +-------------------------------+---------------------------------+
 |            POST-PROCESS (BUN INSTALL & GIT INIT)                |
 |        Lưu project history local, khởi tạo Git Repo rỗng        |
 +-------------------------------+---------------------------------+
                                 |
                                 v
 +-------------------------------+---------------------------------+
 |                     HIỂN THỊ THÀNH CÔNG                         |
 |  Chỉ dẫn người dùng 'cd' vào dự án và chạy 'bun dev'            |
 +-----------------------------------------------------------------+
```
