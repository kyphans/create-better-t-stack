# Trình Xử Lý Lệnh Quy Lõi (Core Command Handlers)

Quá trình "tái sinh" mã nguồn sẽ do thư mục `src/helpers/core` thụ lý giải quyết. Đây chính là điểm giao thoa đưa ra các mệnh lệnh cụ thể lấy cấu hình đã chọn (Config) và bắt hệ thống tạo thư mục.

## 1. `command-handlers.ts`

Đây là hàm main của `create` command. Khi tiến trình khảo sát (prompts) kết thúc thành công với object Config (chứa Frontend, DB,...), Handler này sẽ:

1.  **Tiến hành xử lý xung đột (Directory Conflict):** Nếu thấy thư mục đã tồn tại, tuỳ theo lệnh cờ `--directory-conflict` (merge / error / increment / overwrite) để phản hồi hoặc tạo thư mục mới `my-app-1`.
2.  **Nạp cấu trúc dự án giả (VirtualFS):** Ở bước này, code KHÔNG BAO GIỜ được ghi ra đĩa thực ngay. `createKpsVirtual()` được gọi vào backend (Template Generator), gộp mã nguồn lại thành một bộ nhớ Object Virtual Files.
3.  **Tạo hiệu ứng tải gạch (Loaders):** Thể hiện Progress spinner "Writing project files...". Lúc này nó mới gọi cơ chế Node `fs` (file system writer của mảng VFS) để in hàng loạt tệp tin cùng một lúc ra đĩa thật của user.

## 2. `post-installation.ts`

Mọi chuyện chưa xong khi file được ghi xong, Project vẫn chưa sẵn sàng. Trình Hậu Xử Lý làm các công việc mệt nhọc chạy Bash Command:

1.  **Git Initialisation:** Nhúng `.gitignore` mới nhất và tạo commit đầu tiên nếu có lựa chọn `git`.
2.  **Lập Tệp Lịch Sử (`history` & `kps.jsonc`):** Đóng gói cấu hình vân tay vào thư mục để lần tới nhận diện.
3.  **Lựa chọn Package manager (`pm-install`):** Kiểm tra cấu hình là `--pnpm`, `--npm` hay `--bun` rồi thực thi lệnh `install` ngay trên máy User để kéo Node_Modules. (Sẽ dùng ChildProcess `execa`).
4.  **Format Rules (`oxfmt / biome`):** Vì template ghép nối (Virtual FS) hay bị khoảng trắng không đều do Handlebars, nên bước cuối nó sẽ chạy linter để code format ngay lại toàn bộ.

---

### Nguyên Tắc Hoạt Động Của Kiến Trúc Gán (Virtual vs Real Mappings)

Kiến trúc này đảm bảo CLI **chạy nhanh gấp hàng chục lần** so với lệnh React hoặc Node bình thường và **bất phục hồi nếu lỗi (Atomic writes)**.

Ví dụ, nếu ở nửa chừng Project Creation, User Cancel hoặc máy tắt đột ngột, Thư mục tạo ra sẽ sạch bách vì VFS chỉ ghi ổ cứng trong 1 thao tác duy nhất được Buffer Stream lên Node. Mọi lỗi tương thích đều được Validator Test rớt trước bước ghi.
