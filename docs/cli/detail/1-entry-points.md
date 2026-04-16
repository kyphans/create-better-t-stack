# Điểm Đầu Vào & Kiến Trúc Core (Entry Points)

Tài liệu này giải thích cách mà ứng dụng `apps/cli` được kích hoạt cũng như khai báo các API dành cho tích hợp programmatically. Nhìn chung, hệ thống giao thức mệnh lệnh này được xây trên nền tảng `trpc-cli`.

## 1. `src/cli.ts` (Thực Thi Trực Tiếp Từ Terminal)
Đây là tệp thực thi chính (executable file) của package `create-kps`. 

Đầu tiên, hệ thống sẽ được build ra file `dist/cli.mjs` nhờ cấu hình `package.json -> bin -> create-kps`.
Khi người dùng chạy lệnh `npx create-kps`, node sẽ tìm về `cli.ts` này:
```typescript
import { createKpsCli } from "./index";
// ... xử lý MCP command nếu có
await createKpsCli().run();
```
`cli.ts` chủ yếu dùng để bóc tách biến môi trường, params chạy, kiểm tra xem có dùng giao thức MCP thay vì Terminal tiêu chuẩn không.

## 2. `src/index.ts` (Định Nghĩa tRPC-CLI Router)
Đây là "trái tim" cấu hình CLI nơi hội tụ mọi chức năng:

*   **Tích hợp tRPC:** Thay vì định nghĩa các command bằng tay (ví dụ như thư viện `commander.js`), dự án được xây dựng với thư viện `trpc-cli`. Nó cho phép chúng ta parse Input theo Type-Safety chuẩn `zod` (`CreateInputSchema`, `AddInputSchema`,...).
*   **Các lệnh (Procedures) chính:**
    *   `create`: Lệnh `default`. Nó cho phép đọc Array arguments (ví dụ param số 1 là projectName) và map nó thành cấu hình hỏi đáp (prompt). Gọi logic về `createProjectHandler`.
    *   `createJson`: Phiên bản rút gọn dùng cho AI Agents. Nhận nguyên một payload JSON và tạo tự động `silent: true`.
    *   `add / addJson`: Tính năng cài thêm addons/framework vào project đã tồn tại.
    *   `schema / history / sponsors / docs`: Các sub-command hiển thị tính năng khác.
*   **Programmatic API (`create`, `createVirtual`):**
    Tệp này còn chứa các hàm *export module*. Nhờ đó, nếu một dự án TypeScript bên ngoài cài `create-kps` như thư viện npm, họ có thể xài `import { createVirtual } from "create-kps";` để gen source code trên biến ram mà không cần bật terminal hỏi đáp.

## 3. `src/virtual.ts` (API Xuất Dành Riêng Cho VFS)
Đóng gói các logic tạo file ảo, cấu hình Virtual Builder. Cung cấp API rút gọn cho bất kì frontend GUI nào muốn render ra code trước khi thao tác.

---

### Lưu Ý Phát Triển (Development Note)
Nếu bạn muốn thêm một câu lệnh CLI mới (ví dụ: `npx create-kps doctor`), bạn phải mở tệp `src/index.ts`; sau đó thêm procedure mới vào đối tượng `t.router`. Đừng quên ép kiểu Zod Strict Protocol cho input của nó!
