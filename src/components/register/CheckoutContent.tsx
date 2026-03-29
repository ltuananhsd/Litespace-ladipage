"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StepProgress from "@/components/shared/StepProgress";
import RegisterSidebar from "@/components/shared/RegisterSidebar";
import { useRegistration, formatVND } from "@/hooks/useRegistration";

export default function CheckoutContent() {
  const router = useRouter();
  const { state, updateState, totals, isLoaded } = useRegistration();
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "bank">("qr");
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect nếu không có dữ liệu
  if (isLoaded && !state.contractSigned) {
    router.push("/register/contract");
    return null;
  }

  // Loading
  if (!isLoaded) {
    return (
      <section className="pt-20 pb-28">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-6" />
          <p className="text-on-surface-variant">
            Đang tải thông tin đơn hàng...
          </p>
        </div>
      </section>
    );
  }

  // Nội dung chuyển khoản
  const transferContent = `LITESPACE ${state.contractId ?? ""} ${state.contactInfo?.phone ?? ""}`;

  // Xử lý xác nhận thanh toán
  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Giả lập xử lý
    setTimeout(() => {
      updateState({ paymentStatus: "confirmed" });
      // Lưu thêm vào key cũ để SuccessContent đọc được (backward compat)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("litespace_payment_confirmed", "true");
      }
      router.push("/register/success");
    }, 2000);
  };

  return (
    <>
      <StepProgress currentStep={10} />

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Tiêu đề */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-5">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                payments
              </span>
              Bước 10 — Thanh toán
            </div>
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-3">
              Xác nhận{" "}
              <span className="text-primary">& Thanh toán</span>
            </h1>
            <p className="text-on-surface-variant text-base max-w-lg mx-auto">
              Bước cuối cùng — hoàn tất thanh toán để kích hoạt dịch vụ.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* === CỘT TRÁI: Thanh toán === */}
            <div className="flex-1 min-w-0">
              {/* Phương thức thanh toán */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-surface-container-lowest rounded-[2rem] p-6 md:p-8 mb-6"
              >
                <h3 className="font-headline text-base font-extrabold text-on-surface mb-5">
                  Phương thức thanh toán
                </h3>

                {/* 2 nút chọn */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("qr")}
                    className={`p-5 rounded-2xl text-left transition-all ${
                      paymentMethod === "qr"
                        ? "bg-primary/5 ring-2 ring-primary"
                        : "bg-surface hover:bg-primary/5"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-primary text-3xl mb-2"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      qr_code_2
                    </span>
                    <p className="font-bold text-on-surface">Quét mã QR</p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Thanh toán nhanh qua ứng dụng ngân hàng
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-5 rounded-2xl text-left transition-all ${
                      paymentMethod === "bank"
                        ? "bg-primary/5 ring-2 ring-primary"
                        : "bg-surface hover:bg-primary/5"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-primary text-3xl mb-2"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      account_balance
                    </span>
                    <p className="font-bold text-on-surface">
                      Chuyển khoản ngân hàng
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Chuyển khoản thủ công theo thông tin bên dưới
                    </p>
                  </button>
                </div>

                {/* == QR == */}
                {paymentMethod === "qr" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center p-8 bg-surface rounded-2xl mb-6"
                  >
                    <div className="w-56 h-56 bg-surface-container-lowest rounded-2xl mx-auto flex items-center justify-center shadow-inner mb-4">
                      <div className="text-center">
                        <span className="material-symbols-outlined text-primary text-6xl">
                          qr_code_2
                        </span>
                        <p className="text-xs text-on-surface-variant mt-2">
                          Mã QR thanh toán
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant">
                      Mở ứng dụng ngân hàng → Quét mã QR → Thanh toán
                    </p>
                    <div className="mt-3 p-3 bg-primary/5 rounded-xl">
                      <p className="text-xs text-on-surface-variant">
                        Nội dung CK:{" "}
                        <span className="font-bold text-on-surface">
                          {transferContent}
                        </span>
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* == Chuyển khoản == */}
                {paymentMethod === "bank" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 bg-surface rounded-2xl mb-6 space-y-4"
                  >
                    {[
                      { label: "Ngân hàng", value: "Vietcombank" },
                      { label: "Số tài khoản", value: "0123 456 789 000", mono: true },
                      { label: "Chủ tài khoản", value: "CÔNG TY TNHH LITE SPACE" },
                      { label: "Số tiền", value: formatVND(totals.grandTotal), highlight: true },
                      { label: "Nội dung CK", value: transferContent, highlight: true },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-on-surface-variant font-medium">
                          {row.label}
                        </span>
                        <span
                          className={`font-bold ${
                            row.highlight
                              ? "text-primary"
                              : "text-on-surface"
                          } ${row.mono ? "font-mono" : ""}`}
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Nút xác nhận */}
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="w-full py-5 rounded-full bg-primary text-on-primary font-bold text-lg shadow-xl shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Xác nhận đã thanh toán
                      <span
                        className="material-symbols-outlined text-xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-on-surface-variant mt-4">
                  Đội ngũ LITE Space sẽ xác nhận thanh toán trong vòng 15 phút
                  (trong giờ hành chính).
                </p>
              </motion.div>

              {/* Quay lại */}
              <button
                type="button"
                onClick={() => router.push("/register/contract")}
                className="px-6 py-3.5 rounded-full border-2 border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:border-primary hover:text-primary transition-all"
              >
                ← Quay lại
              </button>
            </div>

            {/* === CỘT PHẢI: Sidebar === */}
            <RegisterSidebar state={state} totals={totals} />
          </div>
        </div>
      </section>
    </>
  );
}
