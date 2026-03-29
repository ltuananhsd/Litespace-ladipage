"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepProgress from "@/components/shared/StepProgress";
import RegisterSidebar from "@/components/shared/RegisterSidebar";
import { useRegistration } from "@/hooks/useRegistration";

export default function PromoPage() {
  const router = useRouter();
  const { state, updateState, totals } = useRegistration();

  const [code, setCode] = useState(state.promoCode ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(!!state.discount);

  // Áp dụng mã khuyến mại
  const handleApply = async () => {
    if (!code.trim()) {
      setError("Vui lòng nhập mã khuyến mại");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          packageId: state.selectedPackage?.id,
          buildingId: state.selectedBuilding?.id,
        }),
      });

      const data = await res.json();

      if (data.valid) {
        updateState({
          promoCode: code.trim().toUpperCase(),
          discount: {
            type: data.discountType,
            value: data.value,
            name: data.programName,
          },
        });
        setApplied(true);
        setError(null);
      } else {
        setError(data.message ?? "Mã khuyến mại không hợp lệ");
        setApplied(false);
      }
    } catch {
      setError("Không thể kiểm tra mã. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  // Xóa mã đã áp dụng
  const handleRemove = () => {
    setCode("");
    setApplied(false);
    setError(null);
    updateState({ promoCode: null, discount: null });
  };

  // Tiếp tục (có hoặc không có mã)
  const handleContinue = () => {
    updateState({ currentStep: 7 });
    router.push("/register/contact");
  };

  return (
    <>
      <StepProgress currentStep={6} />

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* === CỘT TRÁI === */}
            <div className="flex-1 min-w-0">
              {/* Tiêu đề */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-5">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    local_offer
                  </span>
                  Bước 6 — Mã khuyến mại
                </div>
                <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
                  Bạn có mã{" "}
                  <span className="text-primary">khuyến mại</span> không?
                </h1>
                <p className="text-on-surface-variant text-base max-w-lg">
                  Nhập mã giảm giá từ nhân viên tư vấn để nhận ưu đãi đặc biệt.
                  Bước này hoàn toàn tùy chọn.
                </p>
              </motion.div>

              {/* Input mã */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-[0_12px_60px_rgba(44,47,49,0.04)] mb-8"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        setError(null);
                      }}
                      disabled={applied}
                      placeholder="Nhập mã khuyến mại (VD: LITESPACE10)"
                      className={`w-full px-5 py-4 rounded-2xl bg-surface text-sm font-semibold uppercase tracking-wider transition-all outline-none ${
                        applied
                          ? "text-primary bg-primary/5"
                          : "text-on-surface focus:ring-2 focus:ring-primary/20"
                      } ${
                        error
                          ? "ring-2 ring-error/30"
                          : "border border-transparent focus:border-primary"
                      }`}
                    />
                  </div>

                  {applied ? (
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="px-6 py-4 rounded-2xl text-error font-bold text-sm hover:bg-error/5 transition-colors"
                    >
                      Xóa mã
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApply}
                      disabled={isLoading || !code.trim()}
                      className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all ${
                        isLoading || !code.trim()
                          ? "bg-surface-container text-on-surface-variant cursor-not-allowed"
                          : "bg-primary text-on-primary hover:bg-primary-dim shadow-lg shadow-primary/20"
                      }`}
                    >
                      {isLoading ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                          Đang kiểm tra...
                        </span>
                      ) : (
                        "Áp dụng"
                      )}
                    </button>
                  )}
                </div>

                {/* Kết quả */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 text-sm text-error flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base">
                        error
                      </span>
                      {error}
                    </motion.p>
                  )}

                  {applied && state.discount && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 rounded-2xl bg-tertiary/5 flex items-center gap-3"
                    >
                      <span
                        className="material-symbols-outlined text-tertiary text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        celebration
                      </span>
                      <div>
                        <p className="text-sm font-bold text-on-surface">
                          {state.discount.name}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          Giảm{" "}
                          {state.discount.type === "percent"
                            ? `${state.discount.value}%`
                            : `${state.discount.value.toLocaleString("vi-VN")}đ`}{" "}
                          trên tổng hóa đơn
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Nút hành động */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/register/addons")}
                  className="px-6 py-3.5 rounded-full border-2 border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:border-primary hover:text-primary transition-all"
                >
                  ← Quay lại
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex-1 sm:flex-none px-10 py-4 rounded-full bg-primary text-on-primary font-bold text-base shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.99] transition-transform"
                >
                  {applied ? "Tiếp tục" : "Bỏ qua, tiếp tục"}
                  <span className="material-symbols-outlined text-lg ml-1.5 align-middle">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* === CỘT PHẢI: Sidebar === */}
            <RegisterSidebar state={state} totals={totals} />
          </div>
        </div>
      </section>
    </>
  );
}
