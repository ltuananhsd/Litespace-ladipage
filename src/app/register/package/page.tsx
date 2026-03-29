"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepProgress from "@/components/shared/StepProgress";
import { useRegistration, formatVND } from "@/hooks/useRegistration";

// === DỮ LIỆU GÓI DỊCH VỤ (nguồn: RegisterContent.tsx cũ + plan) ===
const packages = [
  {
    id: "basic",
    name: "basic" as const,
    label: "Basic",
    price: 590000,
    period: "/tháng",
    description: "Dành cho doanh nghiệp mới khởi nghiệp",
    badge: null,
    minMonths: 12,
    features: [
      { name: "Địa chỉ kinh doanh hợp pháp", included: true },
      { name: "Tuân thủ pháp lý doanh nghiệp", included: true },
      { name: "Tiếp nhận thư từ, bưu phẩm", included: true },
      { name: "Scan thư (có phí)", included: true },
      { name: "Danh thiếp tiêu chuẩn", included: true },
      { name: "Scan & Chuyển tiếp thư miễn phí", included: false },
      { name: "Hỗ trợ mở TK Ngân hàng", included: false },
      { name: "Hỗ trợ đăng ký kinh doanh", included: false },
      { name: "Kế toán miễn phí", included: false },
      { name: "Thay đổi GPKD", included: false },
      { name: "Ưu tiên mở 5 TK Ngân hàng", included: false },
      { name: "Miễn phí Logo chuyên nghiệp", included: false },
      { name: "Miễn phí Landing Page", included: false },
      { name: "Tư vấn pháp lý 24/7", included: false },
    ],
  },
  {
    id: "upgrade",
    name: "upgrade" as const,
    label: "Upgrade",
    price: 1090000,
    period: "/tháng",
    description: "Gói phổ biến nhất — Đầy đủ tiện ích",
    badge: "Phổ biến nhất",
    minMonths: 6,
    features: [
      { name: "Địa chỉ kinh doanh hợp pháp", included: true },
      { name: "Tuân thủ pháp lý doanh nghiệp", included: true },
      { name: "Tiếp nhận thư từ, bưu phẩm", included: true },
      { name: "Scan thư (có phí)", included: true },
      { name: "Danh thiếp tiêu chuẩn", included: true },
      { name: "Scan & Chuyển tiếp thư miễn phí", included: true },
      { name: "Hỗ trợ mở TK Ngân hàng (3 lần)", included: true },
      { name: "Hỗ trợ đăng ký kinh doanh", included: true },
      { name: "3 tháng Kế toán miễn phí", included: true },
      { name: "Thay đổi GPKD (2 lần/năm)", included: true },
      { name: "Ưu tiên mở 5 TK Ngân hàng", included: false },
      { name: "Miễn phí Logo chuyên nghiệp", included: false },
      { name: "Miễn phí Landing Page", included: false },
      { name: "Tư vấn pháp lý 24/7", included: false },
    ],
  },
  {
    id: "premium",
    name: "premium" as const,
    label: "Premium",
    price: 1190000,
    period: "/tháng",
    description: "Trọn gói cao cấp — Ưu tiên tối đa",
    badge: "Tốt nhất",
    minMonths: 6,
    features: [
      { name: "Địa chỉ kinh doanh hợp pháp", included: true },
      { name: "Tuân thủ pháp lý doanh nghiệp", included: true },
      { name: "Tiếp nhận thư từ, bưu phẩm", included: true },
      { name: "Scan thư (có phí)", included: true },
      { name: "Danh thiếp tiêu chuẩn", included: true },
      { name: "Scan & Chuyển tiếp thư miễn phí", included: true },
      { name: "Hỗ trợ mở TK Ngân hàng (3 lần)", included: true },
      { name: "Hỗ trợ đăng ký kinh doanh", included: true },
      { name: "3 tháng Kế toán miễn phí", included: true },
      { name: "Thay đổi GPKD (2 lần/năm)", included: true },
      { name: "Ưu tiên mở 5 TK Ngân hàng", included: true },
      { name: "Miễn phí 01 bộ Logo chuyên nghiệp", included: true },
      { name: "Miễn phí thiết kế Landing Page", included: true },
      { name: "Tư vấn pháp lý 24/7", included: true },
    ],
  },
];

// Hiệu ứng
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PackagePage() {
  const router = useRouter();
  const { state, updateState } = useRegistration();
  const [selectedId, setSelectedId] = useState(
    state.selectedPackage?.id ?? "upgrade"
  );
  const [showCompare, setShowCompare] = useState(false);

  // Xử lý chọn gói và tiếp tục
  const handleContinue = () => {
    const pkg = packages.find((p) => p.id === selectedId);
    if (!pkg) return;
    updateState({
      selectedPackage: {
        id: pkg.id,
        name: pkg.name,
        basePrice: pkg.price,
      },
      currentStep: 4,
    });
    router.push("/register/duration");
  };

  return (
    <>
      <StepProgress currentStep={3} />

      {/* Tiêu đề */}
      <section className="pb-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-5">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                package_2
              </span>
              Bước 3 — Chọn gói dịch vụ
            </div>
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-3">
              Gói dịch vụ{" "}
              <span className="text-primary">phù hợp với bạn</span>
            </h1>
            <p className="text-on-surface-variant text-base max-w-lg mx-auto">
              So sánh và chọn gói dịch vụ tối ưu cho nhu cầu doanh nghiệp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3 Pricing Card */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-5"
          >
            {packages.map((pkg) => {
              const isSelected = selectedId === pkg.id;
              return (
                <motion.button
                  key={pkg.id}
                  variants={cardVariants}
                  type="button"
                  onClick={() => setSelectedId(pkg.id)}
                  className={`relative text-left p-7 rounded-[2rem] transition-all duration-300 ${
                    isSelected
                      ? "bg-surface-container-lowest shadow-[0_12px_60px_rgba(0,88,187,0.12)] scale-[1.02] ring-2 ring-primary"
                      : "bg-surface-container-lowest hover:shadow-[0_8px_40px_rgba(44,47,49,0.06)] hover:-translate-y-0.5"
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container text-[10px] font-black uppercase tracking-widest shadow-md whitespace-nowrap">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-headline text-xl font-extrabold text-on-surface">
                      {pkg.label}
                    </h3>
                    {/* Radio indicator */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? "border-primary" : "border-outline-variant/40"
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 rounded-full bg-primary"
                        />
                      )}
                    </div>
                  </div>

                  {/* Giá */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-black text-on-surface">
                      {formatVND(pkg.price)}
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">
                      {pkg.period}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-5">
                    {pkg.description}
                  </p>

                  {/* Top 5 tính năng */}
                  <ul className="space-y-2.5">
                    {pkg.features.slice(0, 6).map((feat) => (
                      <li
                        key={feat.name}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span
                          className={`material-symbols-outlined text-base ${
                            feat.included
                              ? "text-primary"
                              : "text-outline-variant/40"
                          }`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {feat.included ? "check_circle" : "cancel"}
                        </span>
                        <span
                          className={
                            feat.included
                              ? "text-on-surface"
                              : "text-on-surface-variant/50 line-through"
                          }
                        >
                          {feat.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Nút so sánh + Tiếp tục */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setShowCompare(!showCompare)}
              className="px-6 py-3.5 rounded-full border-2 border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:border-primary hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-base mr-1.5 align-middle">
                compare_arrows
              </span>
              {showCompare ? "Ẩn so sánh" : "So sánh chi tiết"}
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/register/building")}
                className="px-6 py-3.5 rounded-full border-2 border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:border-primary hover:text-primary transition-all"
              >
                ← Quay lại
              </button>
              <button
                type="button"
                onClick={handleContinue}
                className="px-10 py-4 rounded-full bg-primary text-on-primary font-bold text-base shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.99] transition-transform"
              >
                Tiếp tục
                <span className="material-symbols-outlined text-lg ml-1.5 align-middle">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Bảng so sánh chi tiết */}
          <AnimatePresence>
            {showCompare && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 overflow-hidden"
              >
                <div className="bg-surface-container-lowest rounded-[2rem] p-6 md:p-8 overflow-x-auto">
                  <h3 className="font-headline text-lg font-extrabold text-on-surface mb-6">
                    So sánh tất cả tính năng
                  </h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-left text-xs font-black text-on-surface-variant/60 uppercase tracking-widest py-3 pr-4">
                          Tính năng
                        </th>
                        {packages.map((pkg) => (
                          <th
                            key={pkg.id}
                            className={`text-center py-3 px-3 text-sm font-bold ${
                              selectedId === pkg.id
                                ? "text-primary"
                                : "text-on-surface"
                            }`}
                          >
                            {pkg.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {packages[0].features.map((_, idx) => (
                        <tr
                          key={idx}
                          className={
                            idx % 2 === 0 ? "bg-surface/50" : ""
                          }
                        >
                          <td className="py-2.5 pr-4 text-on-surface">
                            {packages[0].features[idx].name}
                          </td>
                          {packages.map((pkg) => (
                            <td key={pkg.id} className="text-center py-2.5 px-3">
                              <span
                                className={`material-symbols-outlined text-base ${
                                  pkg.features[idx].included
                                    ? "text-primary"
                                    : "text-outline-variant/30"
                                }`}
                                style={{
                                  fontVariationSettings: "'FILL' 1",
                                }}
                              >
                                {pkg.features[idx].included
                                  ? "check_circle"
                                  : "remove"}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                      {/* Dòng giá */}
                      <tr className="border-t border-surface-container">
                        <td className="py-3 pr-4 font-bold text-on-surface">
                          Giá / tháng
                        </td>
                        {packages.map((pkg) => (
                          <td
                            key={pkg.id}
                            className={`text-center py-3 px-3 font-black text-base ${
                              selectedId === pkg.id
                                ? "text-primary"
                                : "text-on-surface"
                            }`}
                          >
                            {formatVND(pkg.price)}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
