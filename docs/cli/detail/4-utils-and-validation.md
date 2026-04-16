# Các Công Cụ Tiện Ích & Trình Xác Thực (Utils & Validation)

Thư mục `apps/cli/src/utils/` chứa "não bộ" của CLI. Đây là nơi chứa hầu hết các hàm tiện ích nhỏ, xử lý chuỗi, tệp tin, và quan trọng nhất là chứa Lớp Quy Tắc Xác Thực (Validator Rules).

## 1. Trình Giải Quyết Tương Thích (`compatibility-rules.ts` & `config-validation.ts`)
Việc kết nối hàng chục Framworks lại với nhau tạo ra hàm lượng ma trận Option khổng lồ (N x M x P Combinations). Nhưng không phải sự kết hợp nào cũng khả thi (Ví dụ `Backend Hono` đi với `Vercel Next.js router` có thể sẽ conflict).

Hai tệp tin trên thực thi "Early Catching". Tức là ngay khi gõ Cờ `--frontend` vào CLI mà không hợp lệ, Cỗ máy sẽ quăng ra `CLIError` ngay lập tức để người dùng không phải đi đến bước Build Code rồi mới thấy File rác.

Ví dụ: 
- `validateWebDeployRequiresWebFrontend`: Muốn Webdeploy thì Frontend không được chọn là None.
- Nhắc nhở người dùng nếu như Stack "nặng" nhưng RAM máy ảo chỉ setting nhỏ.

## 2. Hệ Thống Thu Thập Độ Đo (Analytics & Telemetry)
*   **`analytics.ts`**: Chứa logic Ingest API bắn các bản ghi ẩn danh về máy chủ Convex. Chỉ lưu thông tin cờ của Framework nào được dùng (Nhằm mục đích đo lường Template nào được ưa thích nhất để tối ưu). 
*   **`telemetry.ts`**: Đơn giản là toggle tắt/bật Analytics nếu user thêm cờ `--disable-analytics` hoặc khai báo biến Môi trường `$DISABLE_TELEMETRY=1` (Cho phép tôn trọng Tuỳ chọn Riêng Tư của Nhà Phát Triển theo quy định GDPR). 

## 3. Quản Lý Error Thống Nhất (`errors.ts`)
Tất cả các try - catch block trong CLI đều được bọc chung một Lớp Custom Lỗi (Class).
Thay vì Crash cả Terminal đỏ lè, `errors.ts` quản lý:
- `UserCancelledError`: (Chỉ là Info msg "Tạm biệt"). Phát sinh mỗi khi nhấn `Ctrl C` hoặc `Esc` trong lúc đang Prompt UI.
- `ProjectCreationError`: Log đỏ giải thích do File tồn tại hoặc File phân quyền Deny.
- `CLIError`: Thường được sinh ra do Command flag sai.

## 4. Các Utility Script Phụ Trợ
- **`env-utils.ts` & `docker-utils.ts`**: Đọc tệp `.env`, kiểm tra local environment xem Daemon Docker đã Start chưa (Giúp tuỳ chọn DB setup bằng container hoạt động mượt).
- **`package-manager.ts`**: Dò tìm xem user đang dùng bash bằng `npm npx`, `yarn` hay `bun` để tự lấy PM đấy làm Default setup cho project con.

---
### Viết Logic Tool Mới Nhỏ Gọn
Nếu bạn cần một hàm dùng chung cho nhiều file (Ví dụ format Tên File, Viết Hoa Chữ), hãy tạo một Module nhỏ trong `src/utils` và phải Export Default. Tránh viết Logic thuần vào bên trong `prompts/` hay `commands/` gây rác UI/Logic Layer.
