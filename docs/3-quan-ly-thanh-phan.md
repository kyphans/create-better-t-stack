# Quản lý Thành phần (Tạo / Tích hợp / Xoá)

Hệ thống Scaffold của `kps` hoạt động dựa trên Engine biên dịch **Handlebars template** (`.hbs`) lấy dữ liệu đầu vào (options) được user khai báo qua Prompt hoặc Parameters (Zod validation).

## 1. Cách Tạo mới một thành phần (Thêm Template mới)

Để thêm một tuỳ chọn Framework, ORM, hoặc Database mới vào hệ sinh thái của KPS:

1. **Tạo template Handlebars**:
   - Viết các file base code dưới dạng Handlebars (Thêm đuôi `.hbs`) vào thư mục `packages/template-generator/templates/`.
   - Lưu ý: Dùng `\{{` để escape khi cần viết các mảng JSON thực, React JSX curly brace hay Vue syntax tránh Engine báo lỗi biên dịch sai cú pháp.
2. **Khai báo và hỗ trợ Schema trong CLI**:
   - Mở `packages/types/` bổ sung tuỳ chọn mới vào danh sách Zod String Enum Schema (vd: `FrontendSchema`, `DatabaseSchema`).
3. **Cập nhật Prompts tại ứng dụng CLI**:
   - Mở file `apps/cli/src/prompts/` để đưa thêm Lựa chọn (Option) này lên danh sách câu hỏi Interactive ở terminal.
   - Khi chạy lệnh khởi tạo, biến ngữ cảnh (context variables) được cung cấp có chứa template name, giá trị của config từ người dùng sẽ được map qua template Engine để sinh files hợp lệ.

## 2. Cách Tích hợp (Tích hợp Addons ngay cả khi project đã được tạo)

Dự án cung cấp Module xử lý `add` command (`apps/cli/src/helpers/core/add-handler.ts`), cho phép một thành phần (Addons) được cài cắm vào project bất cứ lúc nào.
- Cách sử dụng CLI: Chạy `bun create-kps add <tên-addon>`
- Cách phát triển tính năng này: 
  - Khai báo logic thay đổi các tệp cấu trúc gốc hoặc chép đè config bổ sung cho project (như setup `Husky` thay đổi package.json, thêm `.husky`).
  - Viết Unit logic cho addons handler nằm ở `apps/cli/src/helpers/`.

## 3. Cách Xoá (Loại bỏ một thành phần)

Loại bỏ ở góc độ người làm phát triển nhân gốc dự án (Maintainer):
1. **Loại bỏ khỏi cấu trúc dữ liệu**:
   - Xoá định nghĩa tên thành phần ở Zod enum (`packages/types`).
2. **Xóa Prompts**:
   - Xóa bỏ việc liệt kê giá trị này ở Console (`apps/cli/src/prompts`).
3. **Xoá Tempaltes vật lý**:
   - Gỡ tệp code `.hbs` khỏi `packages/template-generator/templates`. Các template Handler sẽ tự động bỏ sót chúng khỏi quá trình map Engine.
4. **Viết test validation / Re-check**:
   - Chạy lệnh `bun run check` và `bun run test` tại folder root để đảm bảo việc xoá module không gây Crash cho các Component đang dùng nó làm logic gộp phụ thuộc (ví dụ tRPC phụ thuộc vào module Auth cũ).
