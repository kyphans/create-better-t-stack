# Hướng Dẫn Mở Rộng & Phát Triển (Development Guide)

Đây là tài liệu chỉ dẫn các quy trình làm việc (Workflow) khi bạn muốn tham gia bảo trì, phát triển ứng dụng `create-kps` CLI. Cấu trúc monorepo Turbo + Bun đóng vai trò rất lớn trong quy luật phát triển.

## 1. Môi Trường Cục Bộ (Local Setup)

Dự án được xây dựng bằng `Bun`. Để bắt đầu Code:

```bash
git clone https://github.com/YourRepo/create-kps.git (Theo địa chỉ repo thực tế)
cd create-kps
bun install
```

## 2. Server Development Loop (Dev Watch)

Bạn muốn sửa file trong thư mục `apps/cli` và muốn thử hiệu ứng ngay lập tức thay vì Build mỗi tay mất mấy chục giây?

Sử dụng tab Terminal song song:

**Tab 1 (Watch changes ở Core CLI):**

```bash
bun dev:cli
```

> Lệnh này sẽ sử dụng Turborepo Filter để chạy trình theo dõi `tsdown` lên duy nhất `apps/cli` và gởi qua `/dist` ngay khi bạn ấn save file.

**Tab 2 (Chạy và Test thử):**
Thay vì gõ thẻ `create-kps`, bạn hãy trỏ tới bản build trong dist để trải nghiệm thực tế hiệu năng local.

```bash
bun run cli --dryRun
```

_(Option `--dryRun` rất hữu dụng để CLI giả định VFS chạy đến Flow cuối mà không sinh ra rác trên môi trường của Developer)._

## 3. Cách Cấu Hình Lại Lệnh (Editing CLI Features)

- **Sửa Prompts:** Vào `apps/cli/src/prompts/` -> Sửa option -> Sau đó kiểm tra type có báo đỏ tại `packages/types/` hay không.
- **Thêm/Sửa Cờ Input (Flags Input):** Mở tệp `apps/cli/src/index.ts`. Trong tRPC procedure của phương thức mutate, cập nhật schema Zod `.input(z.object(...))`. Cờ `--your-flag` sẽ tương ứng chuỗi Zod property là `yourFlag`.
- **Thêm Templates Khung Mới:** Nếu CLI chỉ mới là Bộ Khung hỏi, nhưng Template mã muốn lấy lại lại trống, bạn cần Code thêm Mẫu tại `packages/template-generator/templates`. (Có tài liệu riêng ở phần Core Templates).

## 4. Kiểm Thử Hệ Thống (Testing Pipeline)

Bất kể khi nào bạn muốn xuất chuỗi Release/Push lên main. **Phải Đảm Bảo Pass Testing Script** trước!

Trong thư mục `apps/cli/`:

```bash
cd apps/cli
bun run test
```

Đây là test framework `bun test`. Các files `*.test.ts` nằm trong thư mục `apps/cli/test` sẽ chạy mô phỏng các bộ options để đảm bảo lỗi ko phát tán do sửa đổi "chọc" vào CLI Core.

## 5. Quy Chuẩn Commit (Conventional Standard)

KPS áp dụng Conventional Commits để ghi nhận Log version CLI lên changelogithub. Khi tạo PR hoặc Commit:

- `feat(cli): add bun runtime option in core router`
- `fix(cli): resolve bug hanging process when typing fast in navigable`
- `refactor(cli): move formatting hook to templates generator`
- `docs(cli): update readme guidelines for new options`
