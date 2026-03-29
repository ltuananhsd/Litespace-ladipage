"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import StepProgress from "@/components/shared/StepProgress";
import RegisterSidebar from "@/components/shared/RegisterSidebar";
import { useRegistration, formatVND } from "@/hooks/useRegistration";

// Cấu hình thời hạn hợp đồng theo gói
const durationOptions: {
  months: 6 | 12 | 24;
  label: string;
  discount?: string;
}[] = [
  { months: 6, label: "6 tháng" },
  { months: 12, label: "12 tháng", discount: "Tiết kiệm hơn" },
  { months: 24, label: "24 tháng", discount: "Tốt nhất" },
];

// Gói Basic chỉ cho 12, 24 tháng
const minMonthsByPackage: Record<string, number> = {
  basic: 12,
  upgrade: 6,
  premium: 6,
};

export default function DurationPage() {
  const router = useRouter();
  const { state, updateState, totals } = useRegistration();
  const [selected, setSelected] = useState<6 | 12 | 24 | null>(
    state.contractMonths
  );

  const packageName = state.selectedPackage?.name ?? "basic";
  const minMonths = minMonthsByPackage[packageName] ?? 12;

  const handleContinue = () => {
    if (!selected) return;
    updateState({ contractMonths: selected, currentStep: 5 });
    router.push("/register/addons");
  };

  // Tính giá hiển thị cho mỗi option
  const basePrice = state.selectedPackage?.basePrice ?? 0;

  return (
    <>
      <StepProgress currentStep={4} />

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* === CỘT TRÁI: Nội dung chính === */}
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
                    calendar_month
                  </span>
                  Bước 4 — Thời hạn hợp đồng
                </div>
                <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
                  Chọn thời hạn{" "}
                  <span className="text-primary">hợp đồng</span>
                </h1>
                <p className="text-on-surface-variant text-base max-w-lg">
                  Thời hạn dài hơn = chi phí tối ưu hơn. Chọn phương án phù hợp
                  với kế hoạch của bạn.
                </p>
              </motion.div>

              {/* Gói đã chọn */}
              {state.selectedPackage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-primary/5 p-4 rounded-2xl mb-8 flex items-center gap-3"
                >
                  <span
                    className="material-symbols-outlined text-primary text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  <div>
                    <p className="text-xs text-on-surface-variant">
                      Gói đã chọn
                    </p>
                    <p className="font-bold text-on-surface capitalize">
                      {state.selectedPackage.name} —{" "}
                      {formatVND(state.selectedPackage.basePrice)}/tháng
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Duration Options */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4 mb-10"
              >
                {durationOptions.map((option) => {
                  const isDisabled = option.months < minMonths;
                  const isSelected = selected === option.months;
                  const totalAmount = basePrice * option.months;

                  return (
                    <button
                      key={option.months}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => setSelected(option.months)}
                      className={`relative w-full text-left p-6 rounded-[1.5rem] transition-all duration-300 ${
                        isDisabled
                          ? "opacity-40 cursor-not-allowed bg-surface-container"
                          : isSelected
                          ? "bg-surface-container-lowest ring-2 ring-primary shadow-[0_12px_60px_rgba(0,88,187,0.1)]"
                          : "bg-surface-container-lowest hover:shadow-[0_8px_40px_rgba(44,47,49,0.06)] hover:-translate-y-0.5 cursor-pointer"
                      }`}
                      title={
                        isDisabled
                          ? `Gói ${packageName} yêu cầu tối thiểu ${minMonths} tháng`
                          : undefined
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Radio */}
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                              isSelected
                                ? "border-primary"
                                : "border-outline-variant/40"
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

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-extrabold text-on-surface">
                                {option.label}
                              </span>
                              {option.discount && !isDisabled && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container text-[10px] font-black uppercase tracking-wider">
                                  {option.discount}
                                </span>
                              )}
                            </div>
                            {isDisabled && (
                              <p className="text-xs text-error mt-1">
                                Gói {state.selectedPackage?.name} yêu cầu tối
                                thiểu {minMonths} tháng
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Tổng tiền */}
                        {!isDisabled && (
                          <div className="text-right">
                            <p className="text-lg font-black text-on-surface">
                              {formatVND(totalAmount)}
                            </p>
                            <p className="text-xs text-on-surface-variant">
                              tổng {option.months} tháng
                            </p>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </motion.div>

              {/* Nút hành động */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/register/package")}
                  className="px-6 py-3.5 rounded-full border-2 border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:border-primary hover:text-primary transition-all"
                >
                  ← Quay lại
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!selected}
                  className={`flex-1 sm:flex-none px-10 py-4 rounded-full font-bold text-base transition-all ${
                    selected
                      ? "bg-primary text-on-primary shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.99]"
                      : "bg-surface-container text-on-surface-variant cursor-not-allowed"
                  }`}
                >
                  Tiếp tục
                  <span className="material-symbols-outlined text-lg ml-1.5 align-middle">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* === CỘT PHẢI: Sidebar giá === */}
            <RegisterSidebar
              state={{ ...state, contractMonths: selected, currentStep: 4 }}
              totals={{
                ...totals,
                basePeriod: basePrice * (selected ?? 0),
                grandTotal: basePrice * (selected ?? 0),
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
