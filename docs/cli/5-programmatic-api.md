# Programmatic API

Ngoài việc sử dụng như một công cụ dòng lệnh, `create-better-t-stack` còn export các hàm để bạn có thể sử dụng CLI như một thư viện trong mã code TypeScript của mình. Điều này hữu ích khi bạn muốn xây dựng một giao diện Web (như Stack Builder) hoặc các công cụ tự động hóa.

## Các hàm API chính

Toàn bộ các API này đều trả về kiểu `Result` từ thư viện `better-result`, giúp bạn xử lý lỗi một cách an toàn mà không cần `try/catch`.

### `create(projectName, options)`
Hàm này tương đương với việc chạy `npx create-better-t-stack` nhưng hoàn toàn không có giao diện terminal (silent mode).

```typescript
import { create } from "create-better-t-stack";

const result = await create("my-awesome-app", {
  frontend: ["next"],
  backend: "hono",
  database: "postgres",
  orm: "drizzle",
  auth: "better-auth",
  install: true // Tự động chạy npm/bun install
});

if (result.isOk()) {
  console.log("Project created at:", result.value.projectDirectory);
} else {
  console.error("Failed:", result.error.message);
}
```

### `createVirtual(options)`
Hàm này cực kỳ hữu ích cho môi trường trình duyệt hoặc test. Nó **không ghi file xuống đĩa vật lý**. Thay vào đó, nó trả về một cây thư mục ảo (`VirtualFileTree`).

```typescript
import { createVirtual } from "create-better-t-stack";

const result = await createVirtual({
  frontend: ["tanstack-router"],
  backend: "elysia"
});

if (result.isOk()) {
  const tree = result.value;
  console.log(`Generated ${tree.fileCount} files in memory.`);
  // Bạn có thể dùng tree này để hiển thị preview code trên web
}
```

### `add(options)`
Thêm addons vào một dự án hiện có thông qua code.

```typescript
import { add } from "create-better-t-stack";

await add({
  addons: ["biome", "husky"],
  projectDir: "./my-existing-app",
  install: true
});
```

## Các Type và Schema

CLI export đầy đủ các type định nghĩa Stack để bạn sử dụng trong dự án của mình:
- `ProjectConfig`: Interface cấu hình đầy đủ của một project.
- `CreateInput`: Schema cho dữ liệu đầu vào của hàm create.
- Các enum như `Frontend`, `Backend`, `Database`, `ORM`, vv...

## Ứng dụng thực tế

1. **Stack Builder UI**: Sử dụng `createVirtual` để cho phép người dùng cấu hình trên trình duyệt và xem trước (preview) cấu trúc file hoặc nội dung file trước khi tải về.
2. **Custom Scaffolder**: Xây dựng một công cụ nội bộ cho công ty dựa trên sức mạnh của Better-T-Stack CLI.
3. **Automated Testing**: Sử dụng API để khởi tạo nhanh các project mẫu nhằm phục vụ việc test integration cho các thư viện khác.
