# kps (Alias Package)

Đây là package hoạt động dưới dạng **Alias (Bí danh)** nhằm rút gọn câu lệnh thực thi cho bộ công cụ CLI chính (`create-kps`).

## Vai trò
- Giúp người dùng có thể khởi tạo dự án nhanh hơn với những cú pháp siêu ngắn thay vì phải gõ tên đầy đủ.
- Thay vì gõ `npx create-kps`, người dùng chỉ cần gõ `npx kps`.

## Tương tác với CLI (`apps/cli`)
- Package này định tuyến trực tiếp các thao tác thi hành đến package nguyên bản (`create-kps` được build từ `apps/cli`). 
- Trong `package.json`, nó có phụ thuộc (`dependencies`) trực tiếp vào thư viện `create-kps` và trỏ file thực thi (bin) về file gốc để kích hoạt giao diện CLI. Do đó, đây chỉ là "cánh cửa" lối tắt gọi thẳng vào logic của `apps/cli`.

## Cách sử dụng (từ góc độ người dùng)

```bash
npx kps@latest
# hoặc
bun create kps
```
