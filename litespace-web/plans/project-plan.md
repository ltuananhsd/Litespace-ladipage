# LITE Space — Kế hoạch phát triển tổng thể

> Cập nhật lần cuối: 2026-03-27T17:27+07:00

## Thông tin dự án

- **Tên dự án:** LITE Space - Văn phòng ảo chuyên nghiệp
- **Công nghệ:** Next.js 16.2.1, React 19, Tailwind CSS v4, Framer Motion, OpenAI SDK
- **Thư mục gốc:** `litespace-web/` (PHẢI chạy `npm run dev` từ thư mục này)
- **Bảng màu chủ đạo:** Primary `#0058bb`, Surface `#f5f7f9`, Sky-50 cho section xen kẽ
- **Font:** Plus Jakarta Sans (headline), Manrope (body)

## Tiến độ triển khai

### Phase 1: Trang thông tin cơ bản (Đang thực hiện)

| # | Trang/Component | Route | Trạng thái | Ghi chú |
|---|---|---|---|---|
| 1 | Navbar (nâng cấp mobile menu) | - | ✅ XONG | Thêm hamburger menu, scroll effect, quản lý link tập trung |
| 2 | Trang Giới thiệu | `/about` | ✅ XONG | Hero, Câu chuyện, Giá trị cốt lõi, Thành tựu, Đội ngũ, Tầm nhìn/Sứ mệnh, CTA |
| 3 | Trang Liên hệ | `/contact` | ✅ XONG | Form mở rộng, Google Maps, kênh liên hệ nhanh (Zalo/Hotline/Email) |
| 4 | Trang Chính sách bảo mật | `/privacy` | ✅ XONG | 8 mục chi tiết theo quy định pháp luật VN |
| 5 | Trang Điều khoản dịch vụ | `/terms` | ✅ XONG | 10 mục điều khoản chi tiết |
| 6 | Footer (nâng cấp) | - | ✅ XONG | 3 cột (Logo, Dịch vụ, Pháp lý) + mạng xã hội |

### Phase 2: Flow đăng ký

| # | Trang | Route | Trạng thái | Ghi chú |
|---|---|---|---|---|
| 7 | Đăng ký dịch vụ | `/register` | ✅ XONG | 2 bước: chọn gói (3 cards) + form thông tin, lưu sessionStorage |
| 8 | Thanh toán | `/register/checkout` | ✅ XONG | QR/chuyển khoản, tóm tắt đơn hàng, loading spinner |
| 9 | Đăng ký thành công | `/register/success` | ✅ XONG | Icon animated, 4 bước tiếp theo, liên hệ nhanh |

### Phase 3: Trang chi tiết dịch vụ

| # | Trang | Route | Trạng thái | Ghi chú |
|---|---|---|---|---|
| 10 | Trang Dịch vụ | `/services` | ✅ XONG | 6 dịch vụ chi tiết + 4 lợi ích + CTA |
| 11 | Trang Bảng giá | `/pricing` | ✅ XONG | Bảng so sánh 18 tính năng, 3 gói |
| 12 | Trang FAQ | `/faq` | ✅ XONG | 5 danh mục, 15 câu hỏi accordion + CTA |
| 13 | Navbar (cập nhật link) | - | ✅ XONG | Thêm: Dịch vụ, Bảng giá, FAQ, Liên hệ |

### Phase 4: Blog

| # | Trang | Route | Trạng thái | Ghi chú |
|---|---|---|---|---|
| 14 | Danh sách Blog | `/blog` | ✅ XONG | Bộ lọc category, featured card, grid 3 cột, 6 bài mẫu |
| 15 | Chi tiết bài viết | `/blog/[slug]` | ✅ XONG | Dynamic route, SEO metadata động, bài liên quan, CTA |
| 16 | Navbar + Footer | - | ✅ XONG | Thêm link Blog, FAQ |

## Shared Components mới cần tạo

| Component | Trạng thái | Ghi chú |
|---|---|---|
| `MobileNav` (trong Navbar) | ✅ XONG | Đã tích hợp vào Navbar.tsx |
| `Breadcrumb.tsx` | ⏳ CHƯA LÀM | Điều hướng phụ cho trang con |
| `CTABanner.tsx` | ⏳ CHƯA LÀM | Banner kêu gọi hành động dùng chung |
| `SEOHead.tsx` | ⏳ CHƯA LÀM | Quản lý metadata SEO cho từng trang |

## Cấu trúc thư mục hiện tại

```
src/
├── app/
│   ├── about/page.tsx          ← MỚI
│   ├── contact/page.tsx        ← MỚI
│   ├── privacy/page.tsx        ← MỚI
│   ├── terms/page.tsx          ← MỚI
│   ├── services/page.tsx       ← MỚI
│   ├── pricing/page.tsx        ← MỚI
│   ├── faq/page.tsx            ← MỚI
│   ├── register/
│   │   ├── page.tsx            ← MỚI
│   │   ├── checkout/page.tsx   ← MỚI
│   │   └── success/page.tsx    ← MỚI
│   ├── api/chat/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx               ← Trang chủ (Landing Page)
│   └── favicon.ico
├── components/
│   ├── about/
│   │   └── AboutContent.tsx    ← MỚI
│   ├── contact/
│   │   └── ContactContent.tsx  ← MỚI
│   ├── legal/
│   │   ├── PrivacyContent.tsx  ← MỚI
│   │   └── TermsContent.tsx    ← MỚI
│   ├── register/
│   │   ├── RegisterContent.tsx  ← MỚI
│   │   ├── CheckoutContent.tsx  ← MỚI
│   │   └── SuccessContent.tsx   ← MỚI
│   ├── services/
│   │   └── ServicesContent.tsx  ← MỚI
│   ├── pricing/
│   │   └── PricingContent.tsx   ← MỚI
│   ├── faq/
│   │   └── FaqContent.tsx       ← MỚI
│   ├── Chatbot.tsx
│   ├── ContactSection.tsx
│   ├── FeaturesSection.tsx
│   ├── Footer.tsx              ← ĐÃ CẬP NHẬT (3 cột, link mới)
│   ├── HeroSection.tsx
│   ├── Navbar.tsx              ← ĐÃ CẬP NHẬT (5 link + mobile menu)
│   ├── PricingSection.tsx
│   └── TestimonialsSection.tsx
└── data/
    └── chatbot_data.txt
```

## Hướng dẫn tiếp tục

Khi mở tab/conversation mới, gửi cho AI:
> "Đọc file `plans/project-plan.md` trong dự án litespace-web và tiếp tục triển khai từ item CHƯA LÀM tiếp theo."
