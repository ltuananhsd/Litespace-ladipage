"use client";

import { motion } from "framer-motion";
import { getStepLabel } from "@/hooks/useRegistration";

interface StepProgressProps {
  currentStep: number;
  totalSteps?: number;
}

export default function StepProgress({
  currentStep,
  totalSteps = 10,
}: StepProgressProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="w-full py-6 px-4">
      {/* === DESKTOP: Hiển thị đầy đủ label === */}
      <div className="hidden md:flex items-center justify-center gap-0 max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          const isFuture = step > currentStep;

          return (
            <div key={step} className="flex items-center">
              {/* Dot + Label */}
              <div className="flex flex-col items-center gap-1.5 min-w-[64px]">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.15 : 1 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-primary text-on-primary"
                        : isCurrent
                        ? "bg-primary text-on-primary shadow-lg shadow-primary/30"
                        : "bg-surface-container text-on-surface-variant"
                    }
                  `}
                >
                  {isCompleted ? (
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                  ) : (
                    step
                  )}
                </motion.div>

                <span
                  className={`text-[10px] font-semibold text-center leading-tight transition-colors duration-300 ${
                    isCurrent
                      ? "text-primary font-bold"
                      : isCompleted
                      ? "text-primary/70"
                      : "text-on-surface-variant/50"
                  }`}
                >
                  {getStepLabel(step)}
                </span>
              </div>

              {/* Đường nối giữa các bước */}
              {index < steps.length - 1 && (
                <div className="flex-1 min-w-[16px] max-w-[32px] h-[2px] mx-1 rounded-full overflow-hidden bg-surface-container">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{
                      width: isCompleted ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* === MOBILE: Chỉ hiện dots + bước hiện tại === */}
      <div className="md:hidden">
        {/* Thông tin bước hiện tại */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              {currentStep}/{totalSteps}
            </span>
            <span className="text-sm font-bold text-on-surface">
              {getStepLabel(currentStep)}
            </span>
          </div>
        </div>

        {/* Thanh tiến trình dạng bar */}
        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
