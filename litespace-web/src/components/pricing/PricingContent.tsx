"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Bảng so sánh tính năng
const comparisonFeatures = [
  {
    category: "Địa chỉ & Thư tín",
    features: [
      { name: "Địa chỉ kinh doanh hợp pháp", basic: true, upgrade: true, premium: true },
      { name: "Tiếp nhận thư từ, bưu phẩm", basic: true, upgrade: true, premium: true },
      { name: "Thông báo thư mới qua Zalo", basic: true, upgrade: true, premium: true },
      { name: "Scan & gửi thư qua email", basic: "Có phí", upgrade: true, premium: true },
      { name: "Chuyển tiếp bưu phẩm nhanh", basic: false, upgrade: true, premium: true },
    ],
  },
  {
    category: "Pháp lý & Ngân hàng",
    features: [
      { name: "Hỗ trợ đăng ký GPKD", basic: false, upgrade: true, premium: true },
      { name: "Thay đổi GPKD", basic: false, upgrade: "2 lần/năm", premium: "Không giới hạn" },
      { name: "Hỗ trợ mở TK ngân hàng DN", basic: false, upgrade: "3 lần", premium: "5 lần — Ưu tiên" },
      { name: "Tư vấn pháp lý 24/7", basic: false, upgrade: false, premium: true },
    ],
  },
  {
    category: "Kế toán & Thuế",
    features: [
      { name: "Kế toán thuế doanh nghiệp", basic: false, upgrade: "3 tháng miễn phí", premium: "3 tháng miễn phí" },
      { name: "Tư vấn thuế định kỳ", basic: false, upgrade: true, premium: true },
    ],
  },
  {
    category: "Thương hiệu & Marketing",
    features: [
      { name: "Danh thiếp doanh nghiệp", basic: "Tiêu chuẩn", upgrade: "Cao cấp", premium: "Cao cấp" },
      { name: "Thiết kế Logo chuyên nghiệp", basic: false, upgrade: false, premium: true },
      { name: "Thiết kế Landing Page", basic: false, upgrade: false, premium: true },
    ],
  },
  {
    category: "Hỗ trợ",
    features: [
      { name: "Tổng đài hỗ trợ", basic: "Giờ hành chính", upgrade: "Giờ hành chính", premium: "24/7" },
      { name: "Tư vấn viên riêng", basic: false, upgrade: false, premium: true },
    ],
  },
];

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "590.000",
    period: "đ/tháng",
    description: "Dành cho doanh nghiệp mới khởi nghiệp",
    popular: false,
  },
  {
    id: "upgrade",
    name: "Upgrade",
    price: "1.090.000",
    period: "đ/tháng",
    description: "Gói phổ biến nhất — Đầy đủ tiện ích",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "1.190.000",
    period: "đ/tháng",
    description: "Trọn gói cao cấp — Mọi thứ bạn cần",
    popular: false,
  },
];

// Render giá trị tính năng
function renderValue(value: boolean | string) {
  if (value === true) {
    return (
      <span
        className="material-symbols-outlined text-green-600 text-xl"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        check_circle
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="material-symbols-outlined text-on-surface-variant/30 text-xl">
        remove
      </span>
    );
  }
  return (
    <span className="text-xs font-bold text-primary bg-primary/8 px-2.5 py-1 rounded-full">
      {value}
    </span>
  );
}

export default function PricingContent() {
  return (
    <>
      {/* === HERO === */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-8">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                payments
              </span>
              Bảng giá
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-6">
              Giá minh bạch,{" "}
              <span className="text-primary">không phí ẩn</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              So sánh chi tiết các gói dịch vụ để chọn giải pháp phù hợp nhất
              với nhu cầu của bạn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === 3 GÓI OVERVIEW === */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative p-8 rounded-3xl text-center border-2 transition-all ${
                  plan.popular
                    ? "border-primary bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.03]"
                    : "border-outline-variant/20 bg-white shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tertiary-container text-on-tertiary-container px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md whitespace-nowrap">
                    Phổ biến nhất
                  </div>
                )}
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <p
                  className={`text-sm mb-5 ${
                    plan.popular ? "text-white/80" : "text-on-surface-variant"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1 mb-6">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span
                    className={`text-sm ${
                      plan.popular ? "text-white/70" : "text-on-surface-variant"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
                <Link
                  href="/register"
                  className={`block w-full py-4 rounded-full font-bold transition-all ${
                    plan.popular
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02]"
                  }`}
                >
                  Đăng ký ngay
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === BẢNG SO SÁNH CHI TIẾT === */}
      <section className="py-24 bg-sky-50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-4">
              So sánh chi tiết
            </h2>
            <p className="text-on-surface-variant">
              Xem đầy đủ tính năng của từng gói dịch vụ
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl border border-outline-variant/10 overflow-hidden"
          >
            {/* Header bảng */}
            <div className="grid grid-cols-4 border-b border-outline-variant/10">
              <div className="p-6">
                <p className="font-bold text-on-surface-variant text-sm">Tính năng</p>
              </div>
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-6 text-center ${
                    plan.popular ? "bg-primary/5" : ""
                  }`}
                >
                  <p className="font-black text-lg">{plan.name}</p>
                  <p className="text-xs text-on-surface-variant">
                    {plan.price}{plan.period}
                  </p>
                </div>
              ))}
            </div>

            {/* Nội dung bảng */}
            {comparisonFeatures.map((category, catIdx) => (
              <div key={catIdx}>
                {/* Tiêu đề category */}
                <div className="px-6 py-4 bg-surface">
                  <p className="text-xs font-black text-primary uppercase tracking-widest">
                    {category.category}
                  </p>
                </div>
                {/* Các feature */}
                {category.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="grid grid-cols-4 border-b border-outline-variant/5 hover:bg-surface/50 transition-colors"
                  >
                    <div className="p-4 pl-6 flex items-center">
                      <span className="text-sm text-on-surface">{feature.name}</span>
                    </div>
                    <div className={`p-4 flex items-center justify-center`}>
                      {renderValue(feature.basic)}
                    </div>
                    <div className="p-4 flex items-center justify-center bg-primary/[0.02]">
                      {renderValue(feature.upgrade)}
                    </div>
                    <div className="p-4 flex items-center justify-center">
                      {renderValue(feature.premium)}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Footer bảng: nút CTA */}
            <div className="grid grid-cols-4 border-t border-outline-variant/10">
              <div className="p-6" />
              {plans.map((plan) => (
                <div key={plan.id} className="p-6 text-center">
                  <Link
                    href="/register"
                    className={`inline-block px-6 py-3 rounded-full font-bold text-sm transition-all ${
                      plan.popular
                        ? "bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105"
                        : "border-2 border-primary/20 text-primary hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    Chọn {plan.name}
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* === FAQ NHANH === */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-headline text-3xl font-extrabold mb-4">
            Bạn có câu hỏi?
          </h2>
          <p className="text-on-surface-variant mb-8">
            Xem các câu hỏi thường gặp hoặc liên hệ ngay để được tư vấn miễn phí.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/faq"
              className="border-2 border-outline-variant/30 text-on-surface px-8 py-4 rounded-full font-bold hover:border-primary hover:text-primary transition-all"
            >
              Xem FAQ →
            </Link>
            <Link
              href="/contact"
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
