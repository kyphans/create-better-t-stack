# Kế hoạch Thay đổi Nhãn hiệu (Rebranding) từ Better-T-Stack sang KPS

Mục tiêu của kế hoạch này là tuỳ biến toàn bộ source code, module, các lệnh CLI, và tài liệu của dự án gốc để chuyển đổi hoàn toàn tên thương hiệu `better-t-stack` thành keyword mới: **`kps`** và tên miền cấu hình đi kèm là **`kps.pqky.dev`**.

Vì hệ thống này là một Monorepo phức tạp, việc thay đổi tên đòi hỏi phải chỉnh sửa ở nhiều tầng kiến trúc khác nhau để đảm bảo sự liên kết (import aliases, package resolutions, configuration schema) không bị gãy vỡ. Dưới đây là plan thực thi chi tiết.

## User Review Required

> [!WARNING]
> Mọi thay đổi về định danh Packages (`@better-t-stack/...` -> `@kps/...`) sẽ yêu cầu việc tái lập (re-install) toàn thư mục `node_modules` bằng lệnh `bun install` sau khi đổi chuỗi.
> Bạn hãy kiểm tra các bước được đề xuất bên dưới và xác nhận để tôi bắt đầu chạy tiến trình.

## Proposed Changes

### Kế hoạch 1: Đổi tên Package và npm Namespace (Cấu hình Monorepo)

#### [MODIFY] `package.json` (Root)
- Tìm và thay thế mô tả, URL repository nói chung (nếu liên kết đến `create-better-t-stack`).

#### [MODIFY] Các files `package.json` trong thư mục con
- Từ `apps/cli/package.json`: Đổi tên `name` từ `create-better-t-stack` thành `create-kps`. Đổi phần tử `bin` để đăng ký terminal command sang: `{"create-kps": "./dist/cli.js"}`.
- Từ `packages/types/package.json`: Đổi tên của gói (`name`) từ `@better-t-stack/types` thành `@kps/types`.
- Từ `packages/template-generator/package.json`: Đổi tên gói từ `@better-t-stack/template-generator` thành `@kps/template-generator`.
- Cập nhật lại các liên kết phụ thuộc nội bộ (`dependencies`) để ứng dụng `cli` (và ứng dụng `web`) gọi chuẩn cấu trúc mã `@kps/types` thay vì `@better-t-stack/types`.

---

### Kế hoạch 2: Thay thế Links, Schema URL & Mã nguồn Logic (Core)

#### [MODIFY] Mã nguồn Imports & Biến Hệ Thống (`apps/cli/src/*`, `packages/*`, `apps/web/*`)
- Thay thế toàn phần các import string hàng loạt trên toàn dự án: `import ... from "@better-t-stack/..."` thành `import ... from "@kps/..."`.
- Đổi các tên Schema và Class (Ví dụ: Tại `packages/types/src/schemas.ts`, đổi `BetterTStackConfigSchema` thành `KpsConfigSchema`).
- Thay thế các đoạn log hiển thị trên màn hình Prompt console: "Creating a new Better-T-Stack project" -> "Creating a new KPS project".

#### [MODIFY] Tên miền phân giải và Schema
- **Domain Web & Tài liệu API**: Tìm tất cả những chỗ chứa URL là `better-t-stack.dev` và `https://better-t-stack.dev` đổi thành `kps.pqky.dev` và `https://kps.pqky.dev` theo đúng yêu cầu mới nhất (Ví dụ mã nguồn Web Next.js hoặc URL mở hướng dẫn).
- **Schema JSON**: Sửa URL cấu hình (dùng để validate các biến môi trường file kps.jsonc) từ `https://r2.better-t-stack.dev/schema.json` -> `https://r2.kps.pqky.dev/schema.json`.

#### [MODIFY] Đổi tên đuôi file Cấu hình Generated (bts.jsonc)
- Sửa lại logic sinh cấu hình để project sinh ra sẽ sử dụng tệp `kps.jsonc` thay cho `bts.jsonc`. Điều này nằm ở `apps/cli/src/utils/bts-config.ts` (và tên file này cũng được đổi thành `kps-config.ts`).

---

### Kế hoạch 3: Văn bản hiển thị và Github Actions (Marketing/CI)

#### [MODIFY] Thư mục tài liệu vừa tạo (`docs/*.md`) và `README.md` gốc
- Sửa toàn bộ tên project, các dòng lệnh `bun create-better-t-stack` trong các file .md thành tên lệnh mới `bun create-kps`.
- Văn bản mô tả sẽ thay từ "Better-T-Stack" / "Better T Stack" thành "KPS".

#### [MODIFY] Quản trị Build (`bunfig.toml`, `.github/*`, `scripts/*`)
- Sửa lại các tệp cấu hình của Github Actions hoặc module dọn kho để hệ thống trỏ đến keyword `kps` khi chạy auto release npm/canary.

## Open Questions

> [!IMPORTANT]
> 1. Với quy mô lớn (thay đổi hàng trăm vị trí chuỗi, tệp tin), một số lỗi typo có thể phát sinh nếu mã nguồn nào đó ẩn biến quá sâu. Bạn có cho phép tôi thực thi trực tiếp quá trình "Search and Replace" thông qua các bash command (như Powershell hoặc Node script nội bộ) để quét mã cho nhanh không?
> 2. Kế hoạch này hiện đã đồng bộ cấu hình đổi Domain thành `kps.pqky.dev`. Nếu mọi thứ đã chính xác, hãy Approve để bắt đầu.

## Verification Plan

### Automated Tests
- Reset repository cache package: Chạy lệnh `bun install` từ folder root sau khi đổi tên package JSON để Turborepo móc nối lại các dự án nội bộ.
- Chạy hệ thống Linter và Compiler nội tại: `bun run check`. Nếu console trả về không có lỗi tức là các alias `@kps/*` đã được nối thành công.
- Chạy unit test của CLI: `cd apps/cli && bun run test`.

### Manual Verification
- Compile CLI qua lệnh `bun build` và chạy mô phỏng thông qua lệnh `bun dev:cli --yolo`.
- Kiểm tra xem Console có in ra "Creating a new KPS project" và đường link tạo web mở ra `kps.pqky.dev` như dự kiến hay không.
