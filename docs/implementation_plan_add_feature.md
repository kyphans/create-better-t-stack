# Tạo lệnh Add Web App (kps add web)

Thêm một command mới `kps add web [name] --framework [framework]` vào CLI nhằm mục đích hỗ trợ khởi tạo ứng dụng web mới (ví dụ `apps/web-client`) ngay vào dự án hiện hành thay vì tạo dự án mới từ đầu. Điều này giải quyết bài toán "Multiple sources cho Web" tốn ít effort hơn.

## User Review Required
> [!IMPORTANT]
> - Phương án này sẽ **không** điền thêm logic liên kết module hoặc sửa lại các cấu trúc hạ tầng hiện có (như docker, CI/CD). Nó chỉ cài đặt độc lập một app frontend mới vào thư mục `apps/[name]` với đầy đủ boilerplates cơ bản như khi bạn khởi tạo dự án.
> - Kỹ thuật này tái sử dụng triệt để cơ chế Virtual File System nên rất an toàn, không overwrite file hiện tại.

## Proposed Changes

---

### Nhánh CLI (`apps/cli`)
Thay đổi tập trung vào việc tạo mới subcommand và logic thực thi command.

#### [MODIFY] apps/cli/src/index.ts
*   Bổ sung `addWeb: t.procedure` vào `router` của `trpc-cli`.
*   Cấu hình nhận input argument `projectName: z.string()` và option kề kèm `--framework=next`.

#### [NEW] apps/cli/src/helpers/core/add-web-handler.ts
*   Thực hiện đọc thông tin `kps.jsonc` hiện tại qua `detectProjectConfig(process.cwd())`.
*   Nếu `framework` không được truyền vào, trích xuất prompt UI để hỏi người dùng.
*   Khởi tạo khối lượng lưu chuyển ảo `VirtualFileSystem`.
*   Tạo bản sao `ProjectConfig` cũ với phần điều chỉnh `config.frontend = [selectedFramework]`.
*   Gọi sang gói backend: `processFrontendTemplates(..., "apps/" + projectName)` và `processApiTemplates(..., "apps/" + projectName)`.
*   Ghi toàn bộ file ảo ra thiết bị bộ nhớ.

---

### Nhánh Template Generator (`packages/template-generator`)
Chỉnh sửa lại các hàm xử lý template để hỗ trợ tùy chỉnh destination.

#### [MODIFY] src/template-handlers/frontend.ts
*   Thay đổi function signature: Thêm Optional argument thứ 4 `destPrefix: string = "apps/web"`.
*   Tìm và thay thế tất cả chuỗi hard-code `"apps/web"` bên trong hàm thành `destPrefix`.

#### [MODIFY] src/template-handlers/api.ts
*   Tương tự như `frontend.ts`, thêm `destPrefix` argument.
*   Đảm bảo Client UI APIs (từ trpc, orpc) được export thẳng vào `apps/web-client`. Thay thế các chỗ truyền tĩnh bằng biến local `destPrefix` này.

#### [MODIFY] src/processors/frontend-deps.ts
*   Cho phép hàm này nhận biến truyền path đến `package.json` của Web. Mặc định là `apps/web/package.json` nhưng cho phép nhận đường dẫn custom khi inject package mới.

## Open Questions

> [!WARNING]
> 1. Hiện tại, các Framework default render ra file `package.json` với script `dev: "next dev --port 3333"`. Nếu bạn tạo app thứ 2 (`web-client`), nó có thể **conflict** port `3333` với app đầu tiên. Tôi có nên xử lý random dynamic port hoăc tự đánh số (vd: 3334, 3335) cho phần này luôn trong task này không?
> 2. Lệnh này trước mắt chỉ áp dụng cho `web` (Tức React, Vue, Svelte...). Bạn có muốn hỗ trợ luôn `bun kps add mobile mobile-client` không?

## Verification Plan

### Manual Verification
1. Sẽ mock tạo một dự án Better-T-Stack rỗng 1 backend `hono` bằng lệnh `bun dev:cli`.
2. Di chuyển vào bên trong root dự án đó (`cd my-project`).
3. Chạy lệnh: `bun kps add web web-admin --framework react-router`.
4. Rà soát cây thư mục xem thư mục `apps/web-admin` được tạo chính xác chưa.
5. Kiểm tra file `apps/web-admin/package.json` (đúng dependencies react-router) và check api handler gọi sang Hono có chuẩn không.
