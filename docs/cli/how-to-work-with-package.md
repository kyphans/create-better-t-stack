Trong kiến trúc của KPS CLI (trước đây là `create-better-t-stack`), việc quản lý và trích xuất thông tin liên quan đến các **template, addons, packages, plugins** được thiết kế chia tách rất rõ ràng thành các "gói" (packages) trong Monorepo thay vì nhét chung một chỗ. Bằng cách thiết kế này, mã nguồn của bản thân ứng dụng chạy CLI rất nhẹ.

Cụ thể quy trình lấy thông tin diễn ra như sau:

### 1. Template Khung Mã Nguồn (File `.hbs`, `*.ts`, `*.tsx`)
CLI **không hề đọc dữ liệu trực tiếp từ ổ cứng** bằng `fs.readFile()` trong lúc đang chạy trên máy tính của người dùng (vì nó có thể làm chậm CLI hoặc gặp rủi ro thiếu sót file).

Thay vào đó:
*   Mã nguồn template nguyên gốc được đặt tại `packages/template-generator/templates/`.
*   Trước khi ứng dụng khởi chạy (hoặc khi build CLI version mới), một đoạn script mang tên `scripts/generate-templates.ts` sẽ duyệt qua toàn bộ folder templates kia. Nó **mã hoá mọi thứ thành một cục file JavaScript duy nhất** là `templates.generated.ts` lưu dưới biến tĩnh `EMBEDDED_TEMPLATES` (có thể dưới dạng map base64 hoặc string).
*   Ứng dụng `apps/cli` sẽ import cái biến `EMBEDDED_TEMPLATES` lớn đó. Nhờ vậy, source code lúc runtime đã có sẵn code form để "rót khuôn" bằng `VirtualFileSystem` (Bộ nhớ file ảo trên RAM).

### 2. Addons & Plugins List (Cấu hình danh sách)
Làm sao CLI biết có những addon hay plugin nào (như Biome, Oxlint, Husky, Hono...) để hỏi người dùng? 
Đó là nhờ bộ quy tắc thống nhất tại **`packages/types`**.

*   Mọi thông tin danh sách Framework nào được chọn đều giới hạn dựa trên `Zod Schemas` tại `packages/types/src/schemas.ts` (Ví dụ `BackendSchema` định nghĩa Hono, Elysia...). 
*   `apps/cli/src/prompts` chỉ việc lấy mảng Schema đó (sau khi dùng Zod parse) và show ra màn hình (UI list) cho Developer chọn. Nếu bạn gõ tay vào cờ (flag) một hệ thống plugin không tồn tại trong `schemas.ts`, Zod sẽ đá văng lỗi Validation ngay.

### 3. Package Versions (Lấy số hiệu version cho `package.json`)
Nếu bạn muốn cài `drizzle-orm`, CLI phải biết là đang cài phiên bản nào. Phiên bản gốc của những thứ này **được Map cụ thể ở một file tĩnh cấu hình lõi (Single Source Of Truth).**

*   Được định nghĩa dưới dạng một biến dạng Tự điển (Dictionary Object) tên là `dependencyVersionMap`. 
*   Bất kỳ khi nào CLI sinh ra 1 file `package.json` thông qua Generator (xem trong `packages/template-generator/src/processors/` ví dụ `alchemy-plugins.ts` hay các `template-handlers/`), nó sẽ lookup số version trong cái map đó.
*   Ví dụ: Nhờ việc quản lý tập trung, khi Drizzle cập nhật bản mới, bạn chỉ việc về file VersionMap sửa giá trị duy nhất ở đó thay vì phải chạy đi tìm hàng trăm file `package.json.hbs` để nâng cấp.

### Tóm lại Luồng Tương Tác
1. **Lấy giao diện:** `apps/cli` đọc list options hợp lệ từ `packages/types`.
2. **Hỏi User:** Nhận được kết quả (như "chọn Nextjs + Drizzle").
3. **Thúc đẩy Core hoạt động:** Gửi ngược Data đó cho module `packages/template-generator`. Module này sẽ ném Code Template từ ram (`EMBEDDED_TEMPLATES`) + móc version Packge (`dependencyVersionMap`) kết hợp với template language Handlebar (lắp ráp `{{if orm === 'drizzle'}}`) để đổ code hoàn chỉnh thành File.