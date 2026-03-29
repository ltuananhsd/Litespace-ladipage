# LITE Space — Kế hoạch phát triển tổng thể

> Cập nhật lần cuối: 2026-03-29T10:00+07:00
> Nguồn dữ liệu: LITESpace_CustomerJourney_Merged.xlsx · v1.0

---

## Thông tin dự án

| Mục             | Chi tiết                                                                           |
| --------------- | ---------------------------------------------------------------------------------- |
| **Tên dự án**   | LITE Space — Văn phòng ảo chuyên nghiệp                                            |
| **Công nghệ**   | Next.js 16.2.1, React 19, Tailwind CSS v4, Framer Motion, OpenAI SDK               |
| **Thư mục gốc** | `litespace-web/` — PHẢI chạy `npm run dev` từ thư mục này                          |
| **Màu chủ đạo** | Primary `#0058bb`, Surface `#f5f7f9`, Sky-50 cho section xen kẽ                    |
| **Font**        | Plus Jakarta Sans (headline), Manrope (body)                                       |
| **Thương hiệu** | L'MAK (cao cấp, flagship) · LITE (phổ thông, linh hoạt) — đều do **ESTA** vận hành |

---

## Tiến độ triển khai

### Phase 1: Trang thông tin cơ bản ✅ HOÀN TẤT

| #   | Trang/Component                     | Route      | Trạng thái |
| --- | ----------------------------------- | ---------- | ---------- |
| 1   | Navbar (mobile menu, scroll effect) | —          | ✅ XONG    |
| 2   | Trang Giới thiệu                    | `/about`   | ✅ XONG    |
| 3   | Trang Liên hệ                       | `/contact` | ✅ XONG    |
| 4   | Trang Chính sách bảo mật            | `/privacy` | ✅ XONG    |
| 5   | Trang Điều khoản dịch vụ            | `/terms`   | ✅ XONG    |
| 6   | Footer (3 cột)                      | —          | ✅ XONG    |

### Phase 2–4: Đăng ký, Dịch vụ, Blog ✅ HOÀN TẤT

| #   | Trang                                       | Route                | Trạng thái                                  |
| --- | ------------------------------------------- | -------------------- | ------------------------------------------- |
| 7   | Đăng ký dịch vụ (flow cũ — 2 bước đơn giản) | `/register`          | ✅ XONG (sẽ refactor theo flow 10 bước mới) |
| 8   | Thanh toán                                  | `/register/checkout` | ✅ XONG                                     |
| 9   | Đăng ký thành công                          | `/register/success`  | ✅ XONG                                     |
| 10  | Trang Dịch vụ                               | `/services`          | ✅ XONG                                     |
| 11  | Trang Bảng giá                              | `/pricing`           | ✅ XONG                                     |
| 12  | Trang FAQ                                   | `/faq`               | ✅ XONG                                     |
| 13  | Blog danh sách                              | `/blog`              | ✅ XONG                                     |
| 14  | Blog chi tiết                               | `/blog/[slug]`       | ✅ XONG                                     |

### Phase 5: Flow đăng ký 10 bước (MỚI — CẦN TRIỂN KHAI)

> ⚠️ Flow đăng ký cũ (`/register` 2 bước) cần được **refactor hoàn toàn** thành flow 10 bước dưới đây.
> Đây là luồng chính để chuyển đổi khách hàng — ưu tiên cao nhất.

Chi tiết từng bước xem ở **Mục 3** bên dưới.

### Shared Components còn thiếu

| Component             | Trạng thái  | Ghi chú                                           |
| --------------------- | ----------- | ------------------------------------------------- |
| `Breadcrumb.tsx`      | ⏳ CHƯA LÀM | Điều hướng phụ cho trang con                      |
| `CTABanner.tsx`       | ⏳ CHƯA LÀM | Banner kêu gọi hành động dùng chung               |
| `SEOHead.tsx`         | ⏳ CHƯA LÀM | Quản lý metadata SEO cho từng trang               |
| `RegisterSidebar.tsx` | ⏳ CHƯA LÀM | Sidebar tóm tắt giá real-time (bắt đầu từ Bước 4) |
| `StepProgress.tsx`    | ⏳ CHƯA LÀM | Thanh tiến trình 10 bước ở đầu mỗi page đăng ký   |

---

## Cấu trúc thư mục hiện tại

```
src/
├── app/
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── services/page.tsx
│   ├── pricing/page.tsx
│   ├── faq/page.tsx
│   ├── register/
│   │   ├── page.tsx                    ← Bước 1 (chọn thương hiệu) — CẦN REFACTOR
│   │   ├── building/page.tsx           ← Bước 2 — CHƯA CÓ
│   │   ├── package/page.tsx            ← Bước 3 — CHƯA CÓ
│   │   ├── duration/page.tsx           ← Bước 4 — CHƯA CÓ
│   │   ├── addons/page.tsx             ← Bước 5 — CHƯA CÓ
│   │   ├── promo/page.tsx              ← Bước 6 — CHƯA CÓ
│   │   ├── contact/page.tsx            ← Bước 7 — CHƯA CÓ
│   │   ├── kyc/page.tsx                ← Bước 8 — CHƯA CÓ
│   │   ├── contract/page.tsx           ← Bước 9 — CHƯA CÓ
│   │   ├── checkout/page.tsx           ← Bước 10 — CẦN REFACTOR
│   │   └── success/page.tsx            ← Trang hoàn tất — CẦN REFACTOR
│   ├── api/
│   │   ├── chat/route.ts
│   │   ├── buildings/route.ts          ← CHƯA CÓ
│   │   ├── promo/validate/route.ts     ← CHƯA CÓ
│   │   ├── register/route.ts           ← CHƯA CÓ
│   │   ├── kyc/upload/route.ts         ← CHƯA CÓ
│   │   ├── contract/generate/route.ts  ← CHƯA CÓ
│   │   ├── contract/sign/route.ts      ← CHƯA CÓ
│   │   ├── payment/qr/route.ts         ← CHƯA CÓ
│   │   └── payment/confirm/route.ts    ← CHƯA CÓ
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── favicon.ico
├── components/
│   ├── register/
│   │   ├── BrandSelector.tsx           ← CHƯA CÓ
│   │   ├── BuildingSelector.tsx        ← CHƯA CÓ
│   │   ├── PackageSelector.tsx         ← CHƯA CÓ
│   │   ├── DurationSelector.tsx        ← CHƯA CÓ
│   │   ├── AddonsSelector.tsx          ← CHƯA CÓ
│   │   ├── PromoInput.tsx              ← CHƯA CÓ
│   │   ├── ContactForm.tsx             ← CHƯA CÓ
│   │   ├── KycUpload.tsx               ← CHƯA CÓ
│   │   ├── ContractReview.tsx          ← CHƯA CÓ
│   │   ├── CheckoutContent.tsx         ← CẦN REFACTOR
│   │   └── SuccessContent.tsx          ← CẦN REFACTOR
│   ├── shared/
│   │   ├── RegisterSidebar.tsx         ← CHƯA CÓ
│   │   └── StepProgress.tsx            ← CHƯA CÓ
│   ├── Chatbot.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── (các component hiện có khác)
└── data/
    └── chatbot_data.txt
```

---

## Flow đăng ký 10 bước — Đặc tả chi tiết

> **Nguyên tắc chung:**
>
> - State toàn bộ flow lưu trong `sessionStorage` (xem schema ở cuối mục này).
> - Sidebar tóm tắt giá (`RegisterSidebar`) bắt đầu hiển thị từ Bước 4, sticky bên phải trên desktop.
> - Component `StepProgress` luôn hiển thị ở đầu mỗi trang đăng ký (Bước 1–10).
> - Mỗi bước validate trước khi cho phép sang bước tiếp theo.
> - Nút "Quay lại" luôn có ở tất cả các bước (trừ Bước 0).

---

### Bước 0 — Entry Point

| Trường     | Giá trị             |
| ---------- | ------------------- |
| Route      | `/register` (entry) |
| Trạng thái | ✅ Ready            |
| Phụ thuộc  | Landing page CTA    |

**Mô tả:** Khách click CTA "Bắt đầu hành trình" từ landing page hoặc homepage. Đây là điểm vào duy nhất của toàn bộ flow.

**UI:** Nút CTA lớn, nổi bật, có thể kèm sub-text _"Chỉ mất 10 phút"_.

**State khởi tạo:** Không có — khởi tạo sessionStorage mới khi vào flow.

---

### Bước 1 — Chọn thương hiệu

| Trường     | Giá trị                                                 |
| ---------- | ------------------------------------------------------- |
| Route      | `/register?step=1` hoặc `/register` (page.tsx refactor) |
| Component  | `BrandSelector.tsx`                                     |
| State lưu  | `selectedBrand: 'lmak' \| 'lite'`                       |
| Phụ thuộc  | —                                                       |
| Trạng thái | ✅ Đã xác nhận                                          |

**Mô tả:** Khách chọn giữa L'MAK (cao cấp) và LITE (phổ thông). Hiện tại **chỉ kích hoạt L'MAK**; LITE giữ chỗ, enable sau.

**UI:**

- 2 card lớn ngang: logo + tagline + "giá từ X đ/tháng".
- Card LITE có badge **"Sắp ra mắt"**, trạng thái `disabled` (cursor not-allowed, opacity giảm).
- Card L'MAK active, có hover effect rõ ràng.

**Nội dung copy card (đã xác nhận):**

|               | L'MAK                                               | LITE                                         |
| ------------- | --------------------------------------------------- | -------------------------------------------- |
| **Định vị**   | Flagship · Trung tâm thành phố                      | Linh hoạt · Đa vị trí                        |
| **Tòa nhà**   | Quy mô lớn, bề thế, vị trí trung tâm                | Quy mô nhỏ hơn, vị trí linh hoạt             |
| **Công nghệ** | ✅ Face-ID · ✅ Sustainability · ✅ Hospitality     | ❌ Tech · ❌ Sustainability · ✅ Hospitality |
| **Vận hành**  | ESTA                                                | ESTA                                         |
| **Đối tượng** | Doanh nghiệp cần hình ảnh cao cấp, địa chỉ danh giá | Startup, freelancer, doanh nghiệp linh hoạt  |

---

### Bước 2 — Chọn tòa nhà

| Trường          | Giá trị                                   |
| --------------- | ----------------------------------------- |
| Route           | `/register/building`                      |
| Component       | `BuildingSelector.tsx`                    |
| State lưu       | `selectedBuilding: { id, name, address }` |
| Phụ thuộc       | Bước 1 (`selectedBrand`)                  |
| Trạng thái      | ⏳ Chờ assets — BLOCKER                   |
| Người phụ trách | Sếp / Anh Nam                             |

**Mô tả:** Khách chọn tòa nhà từ danh sách lọc theo thương hiệu đã chọn ở Bước 1. Mỗi tòa có modal thông tin đầy đủ trước khi xác nhận.

**UI:**

- Grid card: ảnh đại diện, tên tòa, quận, badge đặc điểm (FaceID, Green Building...).
- Click vào card → mở **modal chi tiết**: gallery ảnh, map embed, danh sách tiện ích, thông tin vận hành.
- Nút "Chọn tòa nhà này" trong modal → lưu state và sang Bước 3.

**Data cần có (hiện chưa có — BLOCKER):**

- Tên tòa nhà, địa chỉ đầy đủ (quận, TPHCM)
- Ảnh ≥ 3 ảnh/tòa (leasing team upload)
- Video giới thiệu (nếu có)
- Danh sách tiện ích
- Điểm đặc biệt: FaceID, Green building, ...
- Đơn vị vận hành

**API:** `GET /api/buildings` → `Array[{ id, name, address, images, amenities, badges }]`

> ⚠️ **Dev note:** Trong thời gian chờ data thật, dùng mock data 3–4 tòa nhà placeholder để build UI trước. Khi có data thật từ Anh Nam thì swap API.

---

### Bước 3 — Chọn gói dịch vụ

| Trường     | Giá trị                                    |
| ---------- | ------------------------------------------ |
| Route      | `/register/package`                        |
| Component  | `PackageSelector.tsx`                      |
| State lưu  | `selectedPackage: { id, name, basePrice }` |
| Phụ thuộc  | Bước 2 (`selectedBuilding`)                |
| Trạng thái | ✅ Ready — Data giá đã có                  |
| Nguồn data | `LITESpace_Price_pack.xlsx`                |

**Mô tả:** Khách chọn 1 trong 3 gói: **Basic, Upgrade, Premium**. Mỗi gói hiển thị đầy đủ quyền lợi.

**UI:**

- 3 pricing card ngang (stack dọc trên mobile).
- Card được chọn: border highlight màu primary + checkmark icon.
- Có nút **"So sánh các gói"** → mở bảng so sánh full-width.
- Gói Upgrade/Premium có thể thêm badge **"Phổ biến nhất"** / **"Tốt nhất"**.

**Rules gói (từ `LITESpace_Price_pack.xlsx`):**

> Đọc file `LITESpace_Price_pack.xlsx` để lấy bảng giá đầy đủ khi implement. Cấu trúc: tên gói, giá/tháng (VNĐ), danh sách tính năng (18 tính năng phân biệt).

---

### Bước 4 — Chọn thời hạn hợp đồng

| Trường     | Giá trị                    |
| ---------- | -------------------------- |
| Route      | `/register/duration`       |
| Component  | `DurationSelector.tsx`     |
| State lưu  | `contractMonths: number`   |
| Phụ thuộc  | Bước 3 (`selectedPackage`) |
| Trạng thái | ✅ Ready                   |

**Mô tả:** Chọn thời hạn hợp đồng. Rules ràng buộc theo gói:

| Gói     | Thời hạn tối thiểu | Các lựa chọn    |
| ------- | ------------------ | --------------- |
| Basic   | 12 tháng           | 12, 24 tháng    |
| Upgrade | 6 tháng            | 6, 12, 24 tháng |
| Premium | 6 tháng            | 6, 12, 24 tháng |

**UI:**

- Chip selector hàng ngang (dạng button group).
- Tùy chọn không hợp lệ với gói đang chọn → `disabled` + tooltip giải thích lý do.
- ⚡ **`RegisterSidebar` bắt đầu render từ bước này** (cột phải desktop, sticky bottom mobile).

---

### Bước 5 — Dịch vụ kèm theo (Add-ons)

| Trường     | Giá trị                                                            |
| ---------- | ------------------------------------------------------------------ |
| Route      | `/register/addons`                                                 |
| Component  | `AddonsSelector.tsx`                                               |
| State lưu  | `addOns: string[]`                                                 |
| Phụ thuộc  | Bước 4 (`contractMonths`)                                          |
| Trạng thái | ✅ Data sẵn có                                                     |
| Nguồn data | File bảng giá add-on trong group Zalo [LITESpace] — Sales cung cấp |

**Mô tả:** Khách thêm dịch vụ bổ trợ. Bước này **tùy chọn**, có nút "Bỏ qua" ở dưới.

**Danh sách add-ons (cần lấy giá chính xác từ Sales):**

| Add-on            | Loại tính | Ghi chú                           |
| ----------------- | --------- | --------------------------------- |
| Dịch vụ kế toán   | /tháng    |                                   |
| Hỗ trợ mở công ty | /lần      | Liên kết với nhánh "mới" ở Bước 7 |
| Tư vấn pháp lý    | /lần      |                                   |
| Thiết kế logo     | /lần      |                                   |
| Thiết kế website  | /lần      |                                   |

**UI:**

- Checkbox card: icon + tên dịch vụ + giá + mô tả 1 dòng.
- Khi tick → cộng giá vào **`RegisterSidebar`** ngay lập tức (real-time update).
- Hiển thị giá theo đúng loại: "/tháng" hoặc "/lần".

---

### Bước 6 — Mã khuyến mại

| Trường     | Giá trị                                                                |
| ---------- | ---------------------------------------------------------------------- |
| Route      | `/register/promo`                                                      |
| Component  | `PromoInput.tsx`                                                       |
| State lưu  | `promoCode: string \| null`, `discount: { type, value, name } \| null` |
| Phụ thuộc  | Bước 4–5                                                               |
| Trạng thái | ✅ Đã xác nhận                                                         |

**Mô tả:** Khách nhập mã giảm giá cá nhân hóa. Sale tạo mã gửi trực tiếp cho từng khách (mô hình B2C2B).

**UI:**

- Input text + nút **"Áp dụng"**.
- Khi mã hợp lệ: hiện badge tên chương trình + mức giảm (VD: _"Ưu đãi tháng 3 — Giảm 10%"_) + `RegisterSidebar` cập nhật ngay.
- Khi mã không hợp lệ: inline error message đỏ.
- Bước này **tùy chọn** — có nút "Bỏ qua" hoặc để trống và tiếp tục.

**API:** `POST /api/promo/validate` — Input: `{ code, packageId, buildingId }` — Output: `{ valid, discountType, value, programName }`

**Backend logic (đã chốt):**

- Chỉ Sale có quyền tạo mã qua admin panel.
- Mã có thể giới hạn: số lần dùng, thời hạn, theo gói, theo tòa nhà.
- Không cần module campaign phức tạp — admin panel đơn giản là đủ.

---

### Bước 7 — Thông tin liên hệ

| Trường     | Giá trị                                                        |
| ---------- | -------------------------------------------------------------- |
| Route      | `/register/contact`                                            |
| Component  | `ContactForm.tsx`                                              |
| State lưu  | `contactInfo: object`, `registrationType: 'new' \| 'transfer'` |
| Phụ thuộc  | Bước 1–6                                                       |
| Trạng thái | ✅ Đã xác nhận                                                 |

**Mô tả:** Điền thông tin cá nhân & doanh nghiệp. **Phân nhánh quan trọng** tại bước này.

**Fields chung (luôn hiển thị):**

- Họ và tên đầy đủ (required)
- Email (required, validate format)
- Số điện thoại (required, validate VN phone)
- Tên công ty (required)
- Radio: **"Mở công ty mới"** | **"Chuyển địa chỉ doanh nghiệp"**

**Nhánh A — Mở công ty mới** (`registrationType: 'new'`):

- Ngành nghề dự kiến (text/select)
- Vốn điều lệ dự kiến (số tiền, VNĐ)
- _Note: Mở pháp nhân là bắt buộc với công ty mới. KH có thể dùng dịch vụ mở công ty của LITESpace (add-on) hoặc tự làm._

**Nhánh B — Chuyển địa chỉ** (`registrationType: 'transfer'`):

- Mã số thuế (MST) — required
- _Note: Hệ thống sẽ gọi API Sở KH-ĐT tra cứu thông tin công ty tự động từ MST → tự điền tên công ty, địa chỉ cũ._
- _Bước KYC sau đó sẽ bao gồm kiểm tra lịch sử hoạt động công ty (vi phạm, hóa đơn...) — data từ Mốt._

**UI:**

- Form gọn, 1 cột. Radio chọn mục đích → fields tương ứng animate xuất hiện.
- Validate inline, không để submit rồi mới báo lỗi.

---

### Bước 8 — KYC (Upload giấy tờ)

| Trường     | Giá trị                                           |
| ---------- | ------------------------------------------------- |
| Route      | `/register/kyc`                                   |
| Component  | `KycUpload.tsx`                                   |
| State lưu  | `kycStatus: 'pending' \| 'uploaded' \| 'skipped'` |
| Phụ thuộc  | Bước 7 (`registrationType`)                       |
| Trạng thái | ✅ Đã xác nhận                                    |

**Mô tả:** Upload giấy tờ pháp lý. Xử lý **async** — không chặn luồng đăng ký.

**Rules KYC theo loại khách hàng (đã chốt):**

| Loại KH                               | KYC bắt buộc?                               | Thời điểm                                                                                        |
| ------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Công ty mới**                       | Không bắt buộc ngay                         | Có thể làm sau khi ký HĐ bản cứng. Nếu dùng dịch vụ mở công ty của LITESpace → bỏ qua hoàn toàn. |
| **Công ty hiện hữu (chuyển địa chỉ)** | **Bắt buộc** — KYC người đại diện pháp luật | Bắt buộc trước khi kích hoạt full portal                                                         |

**Tài liệu cần upload (theo loại):**

- Công ty mới: CMND/CCCD người đại diện (mặt trước + sau)
- Công ty hiện hữu: CMND/CCCD người đại diện + Giấy phép ĐKKD (hoặc trích lục)

**Bước check thêm với công ty hiện hữu:** Kiểm tra lịch sử hoạt động (vi phạm pháp luật, mua bán hóa đơn...) — data từ hệ thống của Mốt. Dev chờ API spec từ Ops.

**UI:**

- Drag & drop upload zone, hỗ trợ JPG/PNG/PDF, tối đa 10MB/file.
- Preview thumbnail sau khi upload.
- Nút **"Bỏ qua, gửi sau"** luôn có (đặc biệt cho công ty mới) → `kycStatus = 'skipped'`.
- Status indicator: _"Đang xử lý"_ → _"Đã nhận, đang duyệt"_.

**API:** `POST /api/kyc/upload` — Input: `formData: { file, type, registrationId }` — Output: `{ fileId, status: 'pending' }`

**Flow async:** KH có thể ký HĐ & thanh toán ngay sau khi upload/skip. KYC duyệt riêng bởi Ops → sau khi duyệt mới cấp full quyền portal.

---

### Bước 9 — Hợp đồng điện tử

| Trường          | Giá trị                                         |
| --------------- | ----------------------------------------------- |
| Route           | `/register/contract`                            |
| Component       | `ContractReview.tsx`                            |
| State lưu       | `contractSigned: boolean`, `contractId: string` |
| Phụ thuộc       | Bước 7–8                                        |
| Trạng thái      | ⏳ Chờ xác nhận — Cần Legal + Mốt               |
| Người phụ trách | Sếp / Legal (hỏi Mốt)                           |

**Mô tả:** Hệ thống tự sinh hợp đồng PDF từ dữ liệu đã điền ở các bước trước. Khách review và ký online.

**UI:**

- Preview PDF trong `<iframe>` (hoặc PDF viewer component).
- **Bắt buộc cuộn hết trang** trước khi nút "Ký hợp đồng" active.
- Ký bằng: nhập **OTP** (gửi qua SMS/email) + **họ tên đầy đủ** (chữ ký điện tử đơn giản).
- Sau khi ký: show confirmation + tự động sang Bước 10.

**Chưa xác định (blockers):**

- Tool eSign: **VNPT eSign** / **FPT CA** / tự build — đề xuất VNPT eSign hoặc FPT CA (có giá trị pháp lý theo Luật Giao dịch điện tử VN).
- Mẫu hợp đồng chuẩn: Legal cần soạn trước khi dev bước này.

**API:**

- `POST /api/contract/generate` — Input: `{ registrationId }` — Output: `{ contractId, pdfUrl }`
- `POST /api/contract/sign` — Input: `{ contractId, otp, fullName }` — Output: `{ signed: true, timestamp }`

> ⚠️ **Dev note:** Bước này bị block bởi Legal. Trong thời gian chờ, có thể build UI shell (preview PDF mock + form OTP) để integrate sau.

---

### Bước 10 — Thanh toán

| Trường     | Giá trị                                   |
| ---------- | ----------------------------------------- |
| Route      | `/register/checkout`                      |
| Component  | `CheckoutContent.tsx` (refactor)          |
| State lưu  | `paymentStatus: 'pending' \| 'confirmed'` |
| Phụ thuộc  | Bước 9 (`contractSigned`)                 |
| Trạng thái | ✅ Đã xác nhận                            |

**Mô tả:** Thanh toán để kích hoạt dịch vụ.

**Phase 1 — Thủ công (triển khai ngay):**

- Hiển thị QR chuyển khoản + thông tin ngân hàng đầy đủ.
- Countdown **15 phút** để giữ đơn.
- Nút **"Tôi đã chuyển khoản"** → trạng thái chuyển sang _"Đang xác nhận"_.
- Kế toán xác nhận thủ công (SLA: 2 giờ trong giờ hành chính).
- **Email auto xác nhận** là must-have ngay Phase 1 (tạo trust với KH).

**Phase 2 — Tự động (sau):**

- Tích hợp webhook ngân hàng / VNPAY / MoMo.

**UI:**

- Left: QR code lớn + thông tin CK (tên ngân hàng, số TK, tên chủ TK, nội dung CK tự động điền).
- Right: `RegisterSidebar` tóm tắt đơn hàng lần cuối.
- Countdown timer rõ ràng.
- Nút "Tôi đã CK" → loading spinner → success/pending screen.

**API:**

- `POST /api/payment/qr` — Input: `{ registrationId, amount }` — Output: `{ qrCode, bankInfo, transferContent }`
- `POST /api/payment/confirm` — Input: `{ registrationId, transactionId }` — Output: `{ status: 'confirmed' }`

---

### Trang Hoàn tất

| Trường     | Giá trị                                  |
| ---------- | ---------------------------------------- |
| Route      | `/register/success`                      |
| Component  | `SuccessContent.tsx` (refactor)          |
| Phụ thuộc  | Bước 10 (paymentStatus confirmed)        |
| Trạng thái | ⏳ Pending — sau khi xác nhận thanh toán |

**Mô tả:** Sau khi kế toán xác nhận thanh toán: gửi welcome email, tạo tài khoản portal, thông báo nội bộ.

**UI:**

- Icon animated (checkmark, confetti nhẹ).
- 4 bước tiếp theo (VD: _"1. Kiểm tra email" → "2. Đăng nhập portal" → "3. Hoàn tất KYC nếu chưa" → "4. Liên hệ chúng tôi nếu cần"_).
- Nút "Vào cổng thông tin khách hàng".

**AI Chatbot xuyên suốt flow (đã chốt):**

- AI chatbot trả lời FAQ + handoff sang Sale khi KH cần tư vấn sâu.
- Kênh handoff: Zalo / hotline.
- SLA gọi lại: ≤ 30 phút trong giờ hành chính.

---

## Global State Schema (sessionStorage)

```typescript
// Key: 'litespace_registration'
interface RegistrationState {
  selectedBrand: "lmak" | "lite";
  selectedBuilding: {
    id: string;
    name: string;
    address: string;
  };
  selectedPackage: {
    id: string;
    name: "basic" | "upgrade" | "premium";
    basePrice: number; // VNĐ/tháng
  };
  contractMonths: 6 | 12 | 24;
  addOns: string[]; // array of add-on IDs
  promoCode: string | null;
  discount: {
    type: "percent" | "fixed";
    value: number;
    name: string;
  } | null;
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
    companyName: string;
    taxId?: string; // chỉ có khi registrationType = 'transfer'
    industry?: string; // chỉ có khi registrationType = 'new'
    capitalAmount?: number; // chỉ có khi registrationType = 'new'
  };
  registrationType: "new" | "transfer";
  kycStatus: "pending" | "uploaded" | "skipped";
  contractSigned: boolean;
  contractId: string | null;
  paymentStatus: "pending" | "confirmed";
  // Meta
  registrationId: string | null; // gán sau POST /api/register
  currentStep: number; // 0–10
}
```

---

## API Endpoints cần xây dựng

| Endpoint                      | Method | Mô tả                        | Input                                                     | Output                                                    |
| ----------------------------- | ------ | ---------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `GET /api/buildings`          | GET    | Danh sách tòa nhà theo brand | `?brand=lmak\|lite`                                       | `Array[{ id, name, address, images, amenities, badges }]` |
| `POST /api/promo/validate`    | POST   | Validate mã khuyến mại       | `{ code, packageId, buildingId }`                         | `{ valid, discountType, value, programName }`             |
| `POST /api/register`          | POST   | Tạo hồ sơ đăng ký mới        | `contactInfo, package, building, duration, addOns, promo` | `{ registrationId, status }`                              |
| `POST /api/kyc/upload`        | POST   | Upload giấy tờ KYC           | `formData: { file, type, registrationId }`                | `{ fileId, status: 'pending' }`                           |
| `POST /api/contract/generate` | POST   | Sinh HĐ PDF từ template      | `{ registrationId }`                                      | `{ contractId, pdfUrl }`                                  |
| `POST /api/contract/sign`     | POST   | Xác nhận ký HĐ               | `{ contractId, otp, fullName }`                           | `{ signed: true, timestamp }`                             |
| `POST /api/payment/qr`        | POST   | Tạo QR + thông tin CK        | `{ registrationId, amount }`                              | `{ qrCode, bankInfo, transferContent }`                   |
| `POST /api/payment/confirm`   | POST   | Xác nhận thanh toán          | `{ registrationId, transactionId }`                       | `{ status: 'confirmed' }`                                 |

---

## RegisterSidebar — Spec hiển thị real-time

> Kích hoạt từ Bước 4. Component `RegisterSidebar.tsx`.

| Mục hiển thị          | Nguồn data                          | Từ bước |
| --------------------- | ----------------------------------- | ------- |
| Tòa nhà               | `selectedBuilding.name + address`   | Bước 2  |
| Gói dịch vụ           | `selectedPackage.name`              | Bước 3  |
| Thời hạn              | `contractMonths + " tháng"`         | Bước 4  |
| Giá/tháng             | `selectedPackage.basePrice`         | Bước 4  |
| Tạm tính              | `basePrice × contractMonths`        | Bước 4  |
| Add-on (từng dịch vụ) | `addOns[i].name + price`            | Bước 5  |
| Tổng add-on           | `SUM(addOns[i].price)`              | Bước 5  |
| Mã khuyến mại         | `promoCode + discount.name`         | Bước 6  |
| Giảm giá              | Tính theo `discount.type + value`   | Bước 6  |
| **TỔNG THANH TOÁN**   | `Tạm tính + Tổng add-on − Giảm giá` | Bước 4+ |

**Responsive:**

- Desktop (≥ 1024px): Cột phải cố định, width ~280px, sticky khi scroll.
- Tablet (768–1023px): Cột phải cố định, width ~240px.
- Mobile (< 768px): Sticky bottom bar (như giỏ hàng). Tap để expand full sidebar.

---

## Route Structure (Next.js App Router)

```
app/register/
├── page.tsx                 → Bước 1: Chọn thương hiệu
├── building/page.tsx        → Bước 2: Chọn tòa nhà
├── package/page.tsx         → Bước 3: Chọn gói
├── duration/page.tsx        → Bước 4: Thời hạn HĐ + Sidebar kích hoạt
├── addons/page.tsx          → Bước 5: Dịch vụ kèm theo
├── promo/page.tsx           → Bước 6: Mã khuyến mại
├── contact/page.tsx         → Bước 7: Thông tin liên hệ + phân nhánh
├── kyc/page.tsx             → Bước 8: Upload giấy tờ
├── contract/page.tsx        → Bước 9: Hợp đồng điện tử
├── checkout/page.tsx        → Bước 10: Thanh toán
└── success/page.tsx         → Trang hoàn tất
```

---

## Blockers hiện tại (cần unblock trước khi dev)

| #   | Blocker                                         | Ảnh hưởng                                 | Người phụ trách   | Ưu tiên       |
| --- | ----------------------------------------------- | ----------------------------------------- | ----------------- | ------------- |
| B1  | Assets tòa nhà (ảnh, thông tin) chưa có         | Bước 2 không thể launch với data thật     | Sếp / Anh Nam     | 🔴 Cao        |
| B2  | Tool eSign chưa chốt (VNPT / FPT CA / tự build) | Bước 9 không thể implement                | Sếp / Legal / Mốt | 🔴 Cao        |
| B3  | Mẫu hợp đồng chuẩn chưa có                      | Bước 9 không thể generate PDF             | Legal             | 🔴 Cao        |
| B4  | File bảng giá add-on chưa chuyển cho Dev        | Bước 5 thiếu data                         | Sales / Sếp       | 🟡 Trung bình |
| B5  | API spec KYC lịch sử công ty (từ Mốt)           | Bước 8 (công ty hiện hữu) chưa hoàn chỉnh | Ops               | 🟡 Trung bình |

---

## Hướng dẫn tiếp tục

Khi mở tab/conversation mới, gửi cho AI:

> "Đọc file `plans/project-plan.md` trong dự án litespace-web và tiếp tục triển khai từ item CHƯA LÀM tiếp theo."

**Thứ tự ưu tiên implement Phase 5:**

1. `StepProgress.tsx` + `RegisterSidebar.tsx` (shared components — unblock tất cả các bước)
2. Bước 1 — `BrandSelector` (không có blocker)
3. Bước 3 — `PackageSelector` (data giá đã có)
4. Bước 4 — `DurationSelector` (logic đơn giản, không blocker)
5. Bước 5 — `AddonsSelector` (chờ Sales gửi file giá)
6. Bước 6 — `PromoInput` + API validate
7. Bước 7 — `ContactForm` với phân nhánh new/transfer
8. Bước 8 — `KycUpload` (build UI, chờ API spec Mốt)
9. Bước 2 — `BuildingSelector` (chờ assets từ Anh Nam — dùng mock trước)
10. Bước 9 — `ContractReview` (chờ Legal + eSign tool)
11. Bước 10 — `CheckoutContent` refactor
12. Trang Success refactor
