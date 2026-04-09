# Hướng dẫn Custom (Tạo mới) Frontend Framework
Tài liệu này sẽ hướng dẫn bạn các bước để thêm một tuỳ chọn Frontend framework hoàn toàn mới (ví dụ thư viện `vue` hoặc `preact`) vào hệ sinh thái của `create-better-t-stack`.

## Bước 1: Khai báo Schema (Tại `packages/types`)
Để cả hệ thống (từ ứng dụng CLI, đến tài liệu Web) hiểu được định dạng mới của bạn, bạn cần định nghĩa nó trong Zod.
Mở file `packages/types/src/schemas.ts`:
Tìm biến `FrontendSchema` và thêm cấu hình của bạn:
```typescript
export const FrontendSchema = z
  .enum([
    "tanstack-router",
    // ... các framework khác
    "vue", // <--- Thêm framework mới của bạn
    "none",
  ])
  .describe("Frontend framework");
```

## Bước 2: Thêm Lựa chọn vào CLI Prompts
Bạn cần để cho người dùng khi gõ `bun create-better-t-stack` có thể chọn Framework bằng phím mũi tên.
Mở file xử lý prompt (thường nằm ở `apps/cli/src/prompts/` hoặc logic tương đương xử lý hỏi frontend):
Chèn mục chọn tương ứng cho `"vue"` với title và mô tả trực quan.

## Bước 3: Tạo thư mục Templates Handlebars
Module cốt lõi của việc sinh source code nằm ở `packages/template-generator/templates/`.
- Tạo một thư mục con: `packages/template-generator/templates/frontend/vue/`.
- Bên trong thư mục này, bạn viết cấu trúc code mặc định như một project thông thường.
- Các file có thể render động nên được thêm đuôi `.hbs` (ví dụ `package.json.hbs`, `App.vue.hbs`).
  
**Lưu ý cực kỳ quan trọng về Cú pháp Escaping:**
Với các framework như Vue hay React, cặp ngoặc nhọn `{` `}` rất phổ biến, nhưng lại trùng với cú pháp gọi logic của Handlebars template. Vì thế, bất kì đoạn nào liên quan tới code của framework, bạn phải dùng dấu gạch chéo ngược `\` để escape Handlebars:
```html
<!-- App.vue.hbs -->
<template>
  <div>
    <!-- Dùng \{{ để Handlebars không render lỗi -->
    \{{ title }} 
  </div>
</template>

<script>
// Logic của package.json thì vẫn dùng bọc đôi Handlebars {{ }} bình thường
</script>
```

## Bước 4: Sửa Logic Render dùng chung (Tùy chọn)
Nếu Frontend mới của bạn cần thay đổi một số lệnh build ở thư mục gốc (ví dụ trong `package.json.hbs` chính của dự án), bạn có thể dùng logic `includes` của CLI:
```json
"scripts": {
  "dev": "bun run dev:server",
  // Khai báo thêm script riêng nếu User chọn Vue
  {{#if (includes frontend "vue")}}
  "build:fe": "vue-tsc && vite build",
  {{/if}}
}
```

## Bước 5: Build và Test cục bộ
- Chạy `bun run check` để đảm bảo code linter không báo lỗi Zod.
- Ở terminal `create-better-t-stack` gốc, chạy thủ công lệnh `bun dev:cli` để sử dụng CLI test (nếu prompt hiện lên và render code tạo thành folder dự án đủ file Vue là hoàn tất!).
