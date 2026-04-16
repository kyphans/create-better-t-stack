# Hệ Thống Tương Tác Chỉ Dẫn (Prompts System)

Tất cả các logic liên quan đến câu hỏi khảo sát người dùng trước khi build project đều nằm trong thư mục `src/prompts/`. Hệ thống này chịu trách nhiệm hiển thị UI Terminal, xử lý sự kiện bán phím, và thu hồi các lựa chọn cho KPS Config.

## 1. Cơ Chế Navigable (`navigable.ts` & `navigable-group.ts`)

Thay vì dùng thư viện prompt hỏi theo một chiều cứng nhắc, KPS CLI sử dụng một trình bọc mượn từ `@clack/prompts` có tên là **Navigable**.

**Cách hoạt động của Navigable Prompts:**

- Người dùng có thể dùng phím mũi tên `Up/Down` + `Enter` để chọn thông thường.
- Nhưng đáng giá nhất là nó cho phép dùng phím `Ctrl + z` để xoá bước, gỡ cài đặt, hoặc **Back lại bước trước** một cách thông minh mà không bị treo CLI.
- Nó lưu state history trong một mảng để khi người dùng sửa lựa chọn Framework A qua B ở bước trước, thì state bước sau sẽ re-render để hiển thị các plugins của B chứ không giữ nguyên.

## 2. Các Modules Prompts Quan Trọng Nhất

Trong thư mục `prompts/`, mỗi nhóm chức năng lại tách thành 1 file riêng:

- `project-name.ts`: Xử lý text nhập vào hoặc lấy tên thư mục hiện hành.
- `frontend.ts` / `backend.ts` / `database.ts`: Show lựa chọn core stack.
- `addons.ts`: Trình duyệt Multi-Select addons có tick box (` ` / `x`). Cung cấp cờ disabled nếu Addon không tương thích với Frontend phía trước.

## 3. Quản Điều Hướng Flow Chín (`config-prompts.ts`)

Đây là file tổng hợp ghép nối tất cả các Prompts đơn lẻ bên trên lại với nhau thành một dây chuyền khảo sát hoàn chỉnh (`askForConfig`).

**Luồng Flow trong Config Prompts:**

1.  **Duyệt Flag / Default Yes:** Nếu người gõ `--yes` (Tức config mặc định) -> CLI báo qua bước này. Nếu có cờ `--frontend react` -> Gán sẵn đáp án, không hỏi.
2.  **Khởi tạo `navigableGroup`:** Định nghĩa chuỗi các câu hỏi.
    ```typescript
    const result = await navigableGroup({
      frontend: () => getFrontend(...),
      backend: ({ results }) => getBackend(results.frontend),
      orm: ({ results }) => getORM(results.backend, results.database),
    })
    ```
    Thông số của câu trả lời trước (`results.XXX`) sẽ đút vào function hỏi bước sau để tạo ra conditional UI (Nếu trước đó đã chọn "none" thì sau tự ẩn).

### Lời Khuyên Cho Nhà Phát Triển

Nếu muốn thêm 1 câu lệnh hỏi option mới (Ví dụ chọn UI Library `Tailwind` vs `Panda`):

1. Thêm Types vào `packages/types/src/schemas.ts`.
2. Viết hàm UI vào `prompts/ui-lib.ts` dùng `navigableSelect`.
3. Import hàm đó rồi kẹp vào Object trong `config-prompts.ts` ở vị trí thứ tự tuỳ ý!
