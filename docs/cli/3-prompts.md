# CLI Prompts System (Hệ thống câu hỏi)

Hệ thống prompt của Better-T-Stack không chỉ là các câu hỏi đơn thuần mà là một "ứng dụng nhỏ" chạy trong terminal với khả năng điều hướng linh hoạt.

## Navigable Prompts (`navigable.ts`)

Điểm khác biệt lớn nhất của CLI này so với các công cụ scaffolding khác là khả năng **"Quay lại" (Go Back)**.

- **Cơ chế**: Dựa trên `@clack/core`, chúng tôi wrap các loại prompt (Select, Multiselect, Confirm, Text) vào một lớp xử lý sự kiện phím bấm.
- **Phím 'b'**: Khi người dùng đang ở bất kỳ bước nào (trừ bước đầu tiên), họ có thể nhấn phím `b` (Back). Prompt hiện tại sẽ bị hủy với một symbol đặc biệt `GO_BACK_SYMBOL`.
- **Hệ thống Loop**: Trong `gatherConfig`, các câu hỏi được đặt trong một vòng lặp hoặc máy trạng thái. Khi nhận được `GO_BACK_SYMBOL`, con trỏ logic sẽ lùi lại một bước trong danh sách câu hỏi.

## Giao diện trực quan

Chúng tôi sử dụng các ký tự Unicode và màu sắc từ `picocolors` để tạo ra một giao diện chuyên nghiệp:
- `◆`: Trạng thái đang hoạt động.
- `◇`: Trạng thái đã hoàn thành.
- `│`: Thanh bar bên lề giúp người dùng theo dõi luồng câu hỏi theo chiều dọc.
- Các hướng dẫn phím bấm (↑/↓, Space, Enter, b, Ctrl+C) luôn được hiển thị ở dưới cùng của mỗi prompt.

## Các thành phần chính

### `navigableSelect`
Dùng cho các lựa chọn duy nhất như Backend (Hono, Elysia, Convex) hoặc Database. Hỗ trợ hiển thị "Hint" (mô tả ngắn) cho từng option.

### `navigableMultiselect`
Dùng cho các lựa chọn nhiều mục như Addons hoặc Examples. Người dùng dùng phím `Space` để chọn/hủy chọn.

### `navigableGroupMultiselect`
Một phiên bản nâng cao cho phép nhóm các lựa chọn lại với nhau (ví dụ: nhóm các Addons liên quan đến UI, nhóm liên quan đến Tooling).

## Logic Validation trong Prompt
Mỗi prompt có thể đi kèm với hàm `validate`. CLI sẽ không cho phép người dùng nhấn `Enter` nếu dữ liệu không hợp lệ (ví dụ: tên dự án chứa ký tự đặc biệt hoặc để trống thư mục bắt buộc).

## Xử lý hủy bỏ (Cancellation)
Nếu người dùng nhấn `Ctrl+C`, CLI sẽ ném ra một `UserCancelledError`. Hệ thống sẽ bắt lỗi này và hiển thị một thông báo "Operation cancelled" đẹp mắt thông qua `clack` thay vì để lộ ra stack trace thô của Node.js.
 stone.
