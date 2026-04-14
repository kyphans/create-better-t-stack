# Hướng dẫn tạo mới Utilities & Extensions (Addons)
Addon là các module cắm ngoài không bắt buộc (chẳng hạn Linter, thư viện Logging, Git Hooks, TailwindCSS...). CLI `kps` cung cấp lệnh thần thánh `add` (`bun create-... add <tên-addon>`) để cài Addon vào ngay cả khi Project gốc đã được tạo xong từ lâu.

Dưới đây là cách bạn phát triển một Addon mới, giả sử lấy ví dụ tạo Addon **"sentry"** (tool log mã lỗi mạng).

## Bước 1: Khai báo tên Addon ở Schema Zod
Mở thư mục `packages/types/src/schemas.ts`.
Thêm giá trị mã định danh vào chuỗi thuộc tính `AddonsSchema`:
```typescript
export const AddonsSchema = z
  .enum([
    "pwa",
    "tauri",
    "biome",
    // ...
    "sentry" // <--- Addon của bạn
  ])
```

## Bước 2: Tạo Template Files cho Addon
Tạo thư mục mới tại `packages/template-generator/templates/addons/sentry`.
Mô phỏng lại cấu trúc thư mục bạn muốn CLI tự động copy vào thư mục gốc dự án người dùng.
Ví dụ nếu cần dăng ký tệp cài đặt nội bộ, bạn có thể tạo: `sentry.client.config.ts.hbs` chứa mã khởi tạo.

Tại sao phải chia Addon file vào thư mục riêng?
Bởi vì khi Addon Handler chạy, Engine `processAddonTemplates` (Tại `packages/template-generator`) sẽ chỉ map các thư mục được Active trong mảng `addons: ["sentry"]`. Vì vậy, tách riêng template rất an toàn và đảm bảo tính Modularity.

## Bước 3: Tiêm Dependencies vào package.json 
Addon nào cũng yêu cầu thư viện npm đi kèm.
Module xử lý Dependencies khi cài Addon nằm tại hàm logic tên `processAddonsDeps` trong lớp mã nguồn `packages/template-generator/..`.
Bạn thêm mệnh đề kiểm tra:
```typescript
if (config.addons.includes("sentry")) {
   // Khai báo code tuỳ chỉnh trực tiếp tiêm gói Sentry vào "package.json" dạng dependencies
   addDependencyToVirtualFs("sentry/react", "^7.0.0");
}
```

## Bước 4: Xử lý Prompts và Interactive Setup (Tùy chọn)
Ví dụ Addon "Sentry" yêu cầu nhập DSN Code Token để khởi tạo, chứ không chỉ quăng file template vào là xong.
- Cập nhật Console Hỏi đáp (`apps/cli/src/prompts/addons.ts`): Bổ sung `sentry` vào bộ list Checkbox `spacebar`.
- Chèn logic Hook sau khi tạo (`apps/cli/src/helpers/addons/addons-setup.ts`):
  Đây là nơi CLI sẽ thực thi sau khi copy xong template. Bạn khai báo code tại đây để hỏi người dùng "Hãy nhập DSN:" và tiến hành replace String trên Virtual File System. 
```typescript
if (config.addons.includes("sentry")) {
   const dsn = await text({ message: "Nhập Sentry DSN của bạn:" });
   // Xử lý ghi đè vào biến môi trường (.env)
}
```

## Bước 5: Kiểm tra luồng thêm Addon (Add Handler)
CLI dùng `apps/cli/src/helpers/core/add-handler.ts` để đọc các gói addons yêu cầu thêm. Hãy đảm bảo quy trình hoạt động trơn tru bằng cách cd sang thư mục test và gõ lệnh:
`bun run dev:cli add sentry`
Luồng thành công bao gồm các thứ tự: Check version => Cập nhật package.json của Project => Rót files `.hbs` xuống folder tương ứng => (Tuỳ chọn) chạy Prompt cài đặt Interactive => Chạy `bun install`.
