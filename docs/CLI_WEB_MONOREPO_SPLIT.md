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

## 2. Các bước thực hiện chia tách bằng Nhánh (Branch)

Quy trình an toàn nhất để vẫn **giữ nguyên lịch sử commit (git history)** cho các file là tạo 2 nhánh nhánh khép kín (nhánh CLI và nhánh Web) ngay tại repository hiện tại. Sau đó, ở mỗi nhánh tiến hành xóa/clean các file không liên quan để cô lập mã nguồn.

### Bước 2.1: Tạo 2 nhánh nhánh làm việc

Mở Terminal ở thư mục hiện tại và thực thể hóa 2 nhánh từ mã nguồn mới nhất:

```bash
# Tạo nhánh dành cho KPS CLI
git branch kps-cli-repo

# Tạo thêm nhánh dành cho tài liệu Web
git branch kps-web-repo
```

### Bước 2.2: Dọn dẹp nhánh CLI (`kps-cli-repo`)

1. Chuyển đổi công việc sang nhánh CLI:
   ```bash
   git checkout kps-cli-repo
   ```
2. **Xóa các module thuộc về Web**:
   - Chạy lệnh: `rm -rf apps/web`
   - Chạy lệnh: `rm -rf packages/backend`
3. **Cập nhật và tối ưu khai báo ở root**:
   - Tìm trong `package.json` (root): Xóa các scripts chỉ dùng cho web như `dev:web`, `build:web`.
   - Tìm trong `turbo.json`: Xóa các định cấu hình pipeline build Next.js / Convex.
4. **Cập nhật lại dependencies Workspace**:
   - Chạy lệnh sau để Turbo và Bun làm mới lại sơ đồ cây `bun.lockb`.
   - `bun install`
5. **Commit an toàn với skip-hook (--no-verify)**:
   ```bash
   git add .
   git commit --no-verify -m "chore: split monorepo - remove web-related packages"
   ```

_(Ghi chú: Giờ nhánh này đã đại diện cho CLI. Bạn có thể push nó làm nhánh `main` cho một Repo mới hoàn toàn bằng cách cài Add remote và git push)_.

### Bước 2.3: Dọn dẹp nhánh Web (`kps-web-repo`)

1. Chuyển đổi công tác sang nhánh web:
   ```bash
   git checkout kps-web-repo
   ```
2. **Xóa các module thuộc về hệ thống CLI**:
   - Chạy lệnh: `rm -rf apps/cli`
   - Chạy lệnh: `rm -rf packages/template-generator`
   - Chạy lệnh: `rm -rf packages/create-kps`
   - _(Lưu ý: Nếu `packages/types` cũng được `apps/web` import để dùng cho Frontend, bạn hãy giữ lại nó. Nếu không liên quan thì cứ xóa)._
3. **Tối ưu thiết lập ở gốc**:
   - Mở `package.json` và `turbo.json` ở cấp root, xoá bỏ các chuỗi script build/dev của CLI (tương tự như `dev:cli`, `build:cli`, template builds v.v.).
4. **Viết lại Lockfile**:
   - `bun install`
5. **Hoàn thiện bản nháp với skip-hook (--no-verify)**:
   ```bash
   git add .
   git commit --no-verify -m "chore: split monorepo - remove cli-related packages"
   ```

_(Ghi chú: Bạn có thể push nhánh này làm nhánh `main` cho Repos của trang tài liệu tương tự như với nhánh CLI)._

---

## 3. Xử lý Cấu hình và Shared Packages

Nếu thư mục `packages/types` (hoặc các thiết lập dùng chung như eslint, oxlint) mà cả **CLI** và **Web** đều phụ thuộc vào, bạn theo hướng giải quyết chuẩn:

- Giữ bản sao chung ở cả 2 Repo (monorepo con). Vì CLI và Web là 2 nền tảng khác nhau, việc duy trì 2 package shared cũng không tạo ra quá nhiều lỗi phá vỡ đồng bộ trừ khi API giữa chúng bị lệch quá xa.

## 4. Nghiệm thu thao tác

Tại cấu trúc mới của mỗi kho lưu trữ, hãy chạy test qua luồng vòng đời sản phẩm:

- **Repo CLI:** Gọi `bun run build` thử, sau đó test code trực tiếp bằng cách đi vào thư mục module `cd apps/cli && bun run test`.
- **Repo Web:** Gọi `bun run dev:web` kiểm tra kết nối với Convex và hiển thị UI của Next.js xem có trơn tru hay báo lỗi không tìm thấy package nào không. Thử deploy lên Vercel để verify flow.
