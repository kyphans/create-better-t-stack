# Hướng dẫn tách Monorepo: CLI và Website

Dự án hiện tại là một Monorepo (sử dụng **Bun** + **Turborepo**). Để tách riêng phần cấu trúc hệ thống công cụ dòng lệnh (CLI) và nền tảng Website hướng dẫn (Web) thành 2 Git Repositories tự do trên GitHub, bạn cần chia nhỏ các `apps` và `packages` sao cho hợp lý, đồng thời dọn dẹp các thiết lập dư thừa.

Mô hình hiện tại đang có tính gắn kết. Việc chia đôi sẽ giúp quản lý CI/CD riêng biệt dễ hơn, cũng như tách biệt công việc giữa Web Developer và Tooling Developer.

---

## 1. Phân bổ các module

Đầu tiên, chúng ta xác định rõ mỗi repo mới sẽ chứa những gì:

### 🚀 Repo 1: KPS CLI Core
Chuyên chịu trách nhiệm quản lý dòng lệnh khởi tạo và xây dựng thư mục dự án.
- `apps/cli`: Chứa mã nguồn cốt lõi của ứng dụng tương tác dòng lệnh (`create-kps`).
- `packages/template-generator`: Template engine mô phỏng hệ thống tệp và biên dịch Handlebars (`@kps/template-generator`).
- `packages/create-kps`: Package alias rút gọn cú pháp người dùng (`kps`).
- `packages/types`: Khai báo các types/interface dùng cho cấu hình prompt và generator.

### 🌐 Repo 2: KPS Documentation Web
Chuyên dùng làm trang tài liệu (Docs), landing page hệ sinh thái và backend phân tích số liệu (Analytics).
- `apps/web`: Ứng dụng Next.js chứa nội dung markdown hướng dẫn và UI trang chủ.
- `packages/backend`: Môi trường Convex backend nội dung chứa các logic database cho website.

---

## 2. Các bước thực hiện tách Repo (Giữ nguyên lịch sử Git)

Quy trình an toàn nhất để vẫn **giữ nguyên lịch sử commit (git history)** cho các file là nhân bản repository hiện tại thành 2 bản sao độc lập, xóa những module không liên quan ở mỗi bản phân bản và push lên Repo mới.

### Bước 2.1: Chuẩn bị 2 thư mục nội bản
Mở Terminal ở thư mục hiện tại hoặc thư mục cha và nhân bản codebase ra làm 2:
```bash
# Clone repo gốc làm bản chứa CLI
git clone <URL_REPO_HIỆN_TẠI_CỦA_BẠN> kps-cli-repo

# Clone thêm lần nữa làm bản chứa Web Docs
git clone <URL_REPO_HIỆN_TẠI_CỦA_BẠN> kps-web-repo
```

### Bước 2.2: Dọn dẹp Repo CLI (`kps-cli-repo`)
1. Di chuyển vào làm việc trong thư mục `kps-cli-repo`.
2. **Xóa các module thuộc về Web**:
   - Chạy lệnh: `rm -rf apps/web`
   - Chạy lệnh: `rm -rf packages/backend`
3. **Cập nhật khai báo ở gốc**:
   - Tìm trong `package.json` (root): Xóa các scripts chỉ dùng cho web như `dev:web`, `build:web`.
   - Tìm trong `turbo.json`: Xóa các cấu hình dependency liên đới tới việc build Next.js / Convex.
4. **Cập nhật lại dependencies Workspace**:
   - Bước này rất quan trọng để Turbo và Bun cập nhật lại `bun.lockb`.
   - Chạy lệnh: `bun install`
5. **Đẩy (Push) lên Repo tương ứng**:
   ```bash
   git add .
   git commit -m "chore: split monorepo - remove web-related packages"
   # Trỏ remote origin lên Github repo dành cho CLI
   git remote set-url origin <URL_GITHUB_KPS_CLI_MỚI>
   git push -u origin main
   ```

### Bước 2.3: Dọn dẹp Repo Web (`kps-web-repo`)
1. Di chuyển vào làm việc trong thư mục `kps-web-repo`.
2. **Xóa các module thuộc về hệ thống CLI**:
   - Chạy lệnh: `rm -rf apps/cli`
   - Chạy lệnh: `rm -rf packages/template-generator`
   - Chạy lệnh: `rm -rf packages/create-kps`
   - *(Lưu ý: Nếu `packages/types` cũng được `apps/web` import để dùng cho Frontend, bạn hãy giữ lại nó. Nếu không liên quan, xóa luôn để codebase tinh gọn).*
3. **Dọn dẹp thiết lập ở gốc**:
   - Mở `package.json` và `turbo.json` ở cấp root, xoá bỏ các chuỗi lệnh build/dev của CLI (tương tự như `dev:cli`, `build:cli`, script generator v.v.).
4. **Viết lại Lockfile**:
   - Chạy lệnh: `bun install`
5. **Đẩy (Push) sang Repo Website**:
   ```bash
   git add .
   git commit -m "chore: split monorepo - remove cli-related packages"
   # Trỏ remote origin lên Github repo dành cho Web
   git remote set-url origin <URL_GITHUB_KPS_WEB_MỚI>
   git push -u origin main
   ```

---

## 3. Xử lý Cấu hình và Shared Packages
Nếu thư mục `packages/types` (hoặc các thiết lập dùng chung như eslint, oxlint) mà cả **CLI** và **Web** đều phụ thuộc vào, bạn có 2 hướng giải quyết chuẩn:

- **Cách 1 (Nhanh, dễ quản lý ngay):** Giữ bản sao chung ở cả 2 Repo (monorepo con). Vì CLI và Web là 2 nền tảng khác nhau, việc duy trì 2 package shared cũng không tạo ra quá nhiều lỗi phá vỡ đồng bộ trừ khi API giữa chúng bị lệch quá xa.
- **Cách 2 (Tiêu chuẩn System Scaling):** Đóng gói thư viện dùng chung (`@kps/types` và các định dạng config) lên kho đăng ký **NPM Registry** hoặc **GitHub Packages**. Sau đó từ 2 Repo tự do, chỉ cần chạy `bun add @kps/types` như thư viện qua mạng thay vì dùng liên kết nội bộ `workspace:*`.

## 4. Nghiệm thu thao tác
Tại cấu trúc mới của mỗi kho lưu trữ, hãy chạy test qua luồng vòng đời sản phẩm:
- **Repo CLI:** Gọi `bun run build` thử, sau đó test code trực tiếp bằng cách đi vào thư mục module `cd apps/cli && bun run test`.
- **Repo Web:** Gọi `bun run dev:web` kiểm tra kết nối với Convex và hiển thị UI của Next.js xem có trơn tru hay báo lỗi không tìm thấy package nào không. Thử deploy lên Vercel để verify flow.
