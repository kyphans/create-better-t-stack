# Kế hoạch Rebranding: `better-t-stack` → `kps`

> [!NOTE]
> Plan chi tiết được quản lý tại artifact. Xem file artifact `implementation_plan.md` để có phiên bản đầy đủ nhất.
> File này là bản tham chiếu nhanh trong repo.

## Mục tiêu

Tuỳ biến toàn bộ source code, module, lệnh CLI, và tài liệu của dự án gốc để chuyển đổi hoàn toàn tên thương hiệu `better-t-stack` thành keyword mới **`kps`** và tên miền cấu hình đi kèm **`kps.pqky.dev`**.

## Tổng quan Phases

| Phase | Mô tả                                                                | Số files ước tính |
| ----- | -------------------------------------------------------------------- | ----------------- |
| 1     | Đổi tên Packages & Monorepo Config (`package.json` files)            | ~8 files          |
| 2     | Đổi tên Files vật lý (`bts-config.ts` → `kps-config.ts`)             | ~3 renames        |
| 3     | Cập nhật Source Code — Packages Layer (`packages/*`)                 | ~15 files         |
| 4     | Cập nhật Source Code — Apps Layer (`apps/cli`, `apps/web`)           | ~50+ files        |
| 5     | Cập nhật CI/CD, Scripts & Config (`workflows`, `scripts`, root)      | ~12 files         |
| 6     | Cập nhật Tài liệu (`docs/`, `README.md`)                             | ~15 files         |
| 7     | Post-Processing (HBS templates, regenerate `templates.generated.ts`) | ~7 files          |

## Bảng ánh xạ thương hiệu chính

| Pattern gốc                         | Pattern mới     |
| ----------------------------------- | --------------- |
| `better-t-stack`                    | `kps`           |
| `Better-T-Stack` / `Better T Stack` | `KPS`           |
| `BetterTStack`                      | `Kps`           |
| `@better-t-stack/`                  | `@kps/`         |
| `create-better-t-stack`             | `create-kps`    |
| `create-bts`                        | `create-kps`    |
| `bts` (abbreviation)                | `kps`           |
| `better-t-stack.dev`                | `kps.pqky.dev`  |
| `bts.jsonc`                         | `kps.jsonc`     |
| `BTS_TELEMETRY`                     | `KPS_TELEMETRY` |

## Xem chi tiết

Xem file artifact `implementation_plan.md` trong conversation history để có phiên bản đầy đủ với:

- Danh sách chính xác từng file cần thay đổi
- Diff patterns cho mỗi file
- Line numbers và context
- Verification plan chi tiết
