# CLI Structure (Cấu trúc thư mục)

Thư mục `apps/cli/src` được tổ chức theo các miền logic riêng biệt để dễ dàng bảo trì và mở rộng.

## Thư mục `src/`

Cấu trúc chính của mã nguồn CLI:

### `src/commands`

Chứa logic thực thi cho các lệnh cấp cao của CLI (ngoại trừ lệnh `create` chính nằm ở helpers).

- `history.ts`: Xử lý việc hiển thị, phân tích và xóa lịch sử tạo dự án từ local store.
- `meta.ts`: Các lệnh tiện ích như mở docs, mở builder, và hiển thị sponsors.

### `src/prompts`

Hệ thống các câu hỏi tương tác để thu thập cấu hình từ người dùng.

- `navigable.ts`: Hệ thống wrapper quan trọng phía trên `@clack/core`. Nó cho phép người dùng bấm phím **'b'** để quay lại câu hỏi trước đó thay vì phải thoát hoàn toàn CLI.
- `config-prompts.ts`: Tập hợp các prompt để hỏi về Stack (Frontend, Backend, Database, vv...).
- `project-name.ts`: Xử lý việc nhập và validate tên project/thư mục.
- Các file khác như `addons.ts`, `auth.ts`, `database.ts` chuyên biệt cho từng phần của Stack.

### `src/helpers`

Chứa các "Handlers" - nơi điều phối logic phức tạp giữa Prompt, Validation và Template Generation.

- `core/command-handlers.ts`: Chứa `createProjectHandler`, trái tim của lệnh khởi tạo. Nó điều phối luồng từ lúc nhận input đến lúc gọi generator.
- `core/add-handler.ts`: Xử lý logic cho lệnh `add` để bổ sung tính năng vào một dự án đã có.
- `core/create-project.ts`: Thực hiện công đoạn cuối cùng là ghi file xuống đĩa và chạy các lệnh hậu kỳ (post-install, setup database).

### `src/utils`

Các hàm tiện ích dùng chung trong toàn bộ package.

- `config-validation.ts` & `compatibility-rules.ts`: Hệ thống quy tắc kiểm tra xem các lựa chọn của người dùng có tương thích với nhau không.
- `errors.ts`: Định nghĩa các Custom Tagged Errors (sử dụng `better-result`) như `CLIError`, `ValidationError`, `UserCancelledError`.
- `project-history.ts`: Logic lưu trữ lịch sử vào file JSON ở thư mục AppData của người dùng.
- `terminal-output.ts`: Cấu hình `consola` để xuất log ra terminal một cách đồng nhất.

### Các file tại root `src/`

- `index.ts`: Định nghĩa tRPC router chính và export các Public APIs.
- `validation.ts`: Entry point cho logic validation cấp cao nhất.
- `types.ts`: Định nghĩa các interface và Zod schema dùng chung cho CLI.
- `mcp.ts`: Tích hợp Model Context Protocol (nếu có).
