# CLI Validation & Compatibility (Xác thực & Tương thích)

Để đảm bảo dự án được tạo ra luôn hoạt động tốt, CLI sở hữu một hệ thống quy tắc (rules) nghiêm ngặt để kiểm tra sự tương thích giữa hàng chục công nghệ khác nhau.

## Tại sao cần Validation?

Better-T-Stack cho phép người dùng tự do kết hợp nhiều công nghệ (ví dụ: chọn Frontend Next.js với Backend Hono và Database SQLite). Tuy nhiên, không phải mọi sự kết hợp đều khả thi hoặc được hỗ trợ tối ưu. Hệ thống validation giúp ngăn chặn người dùng tạo ra một project "không thể chạy được".

## Cấu trúc logic

Hệ thống nằm tại `src/utils/config-validation.ts` và `src/utils/compatibility-rules.ts`.

### 1. Ràng buộc cứng (Hard Constraints)

Đây là các quy tắc không thể phá vỡ.

- **ORM & Database**: `Mongoose` chỉ hoạt động với `MongoDB`. `Drizzle` hiện tại không hỗ trợ `MongoDB`.
- **Convex Backend**: Khi chọn `Convex`, các flag khác như `--runtime`, `--database`, `--orm` phải được đặt về `none` vì Convex là một dịch vụ quản lý toàn phần.
- **Cloudflare Workers**: Yêu cầu các DB tương thích (như D1, Neon, Turso) và không hỗ trợ các DB truyền thống yêu cầu kết nối TCP trực tiếp nếu không qua proxy.

### 2. Ràng buộc theo tính năng (Feature Constraints)

- **Authentication**: `Clerk` chỉ hỗ trợ một số frontend nhất định (Next.js, Expo). Nếu người dùng chọn `Astro` với `Clerk`, CLI sẽ cảnh báo hoặc ngăn chặn.
- **Examples**: Example "Todo App" yêu cầu phải có một lớp API (tRPC hoặc Hono/Elysia). Nếu người dùng chọn `--api none`, họ không thể cài đặt example này.

## Cách thức hoạt động

CLI thực hiện validation ở hai giai đoạn:

1. **Ngay sau khi nhận Flag**: Nếu người dùng truyền flag sai ngay từ đầu, CLI sẽ báo lỗi và thoát ngay (hoặc yêu cầu sửa trong interactive mode).
2. **Trước khi Render**: Toàn bộ object cấu hình cuối cùng (sau khi gộp flags và prompts) được đưa qua hàm `validateFullConfig`.

## Pattern `better-result`

Thay vì ném lỗi (throw error), các hàm validate trả về một Result object:

- `Result.ok(undefined)`: Nếu cấu hình hợp lệ.
- `Result.err(ValidationError)`: Nếu có lỗi.

Điều này cho phép CLI thu thập lỗi và hiển thị chúng một cách rõ ràng cho người dùng:

```typescript
const result = validateConfig(config);
if (result.isErr()) {
  // Hiển thị lỗi màu vàng/đỏ đẹp mắt trên terminal
  displayError(result.error);
}
```

## Bỏ qua Validation (`--yolo`)

Dành cho các chuyên gia muốn thử nghiệm các tổ hợp chưa được hỗ trợ chính thức, CLI cung cấp flag `--yolo`. Khi bật flag này, hầu hết các kiểm tra tương thích sẽ bị bỏ qua. _Cảnh báo: Project được tạo ra có thể sẽ không build được._
stone.
stone.
