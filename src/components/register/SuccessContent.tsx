"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import StepProgress from "@/components/shared/StepProgress";
import { useRegistration } from "@/hooks/useRegistration";

// Các bước tiếp theo sau khi đăng ký
const nextSteps = [
  {
    icon: "mark_email_read",
    title: "Kiểm tra email",
    description:
      "Email xác nhận đã được gửi. Vui lòng kiểm tra hộp thư (bao gồm cả Spam).",
  },
  {
    icon: "support_agent",
    title: "Tư vấn viên liên hệ",
    description:
      "Đội ngũ LITE Space sẽ liên hệ bạn trong vòng 15 phút để xác nhận và hướng dẫn.",
  },
  {
    icon: "description",
    title: "Xử lý hồ sơ",
    description:
      "Hợp đồng và giấy tờ pháp lý sẽ được xử lý trong 1-3 ngày làm việc.",
  },
  {
    icon: "rocket_launch",
    title: "Kích hoạt dịch vụ",
    description:
      "Dịch vụ văn phòng ảo được kích hoạt trong 24 giờ sau khi hoàn tất hồ sơ.",
  },
];

export default function SuccessContent() {
  const { state, resetState } = useRegistration();

  // Tự động xóa data registration sau 5 phút (để user có thể đăng ký lại)
  useEffect(() => {
    const timer = setTimeout(() => {
      resetState();
    }, 5 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [resetState]);

  return (
    <>
      <StepProgress currentStep={10} totalSteps={10} />

      {/* === HERO THÀNH CÔNG === */}
      <section className="relative pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            {/* Icon thành công */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30"
            >
              <span
                className="material-symbols-outlined text-white text-5xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </motion.div>

            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-4">
              Đăng ký{" "}
              <span className="text-green-600">thành công!</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-lg mx-auto">
              {state.contactInfo ? (
                <>
                  Cảm ơn{" "}
                  <strong className="text-on-surface">
                    {state.contactInfo.fullName}
                  </strong>
                  ! Đăng ký gói{" "}
                  <strong className="text-primary capitalize">
                    {state.selectedPackage?.name}
                  </strong>{" "}
                  tại{" "}
                  <strong className="text-on-surface">
                    {state.selectedBuilding?.name}
                  </strong>{" "}
                  đã được ghi nhận.
                </>
              ) : (
                "Đăng ký dịch vụ văn phòng ảo của bạn đã được ghi nhận thành công."
              )}
            </p>

            {/* Mã đơn hàng */}
            {state.contractId && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary font-bold text-sm mt-6"
              >
                <span className="material-symbols-outlined text-base">
                  confirmation_number
                </span>
                Mã đơn: {state.contractId}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* === CÁC BƯỚC TIẾP THEO === */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline text-2xl md:text-3xl font-extrabold text-center mb-12"
          >
            Các bước tiếp theo
          </motion.h2>

          <div className="space-y-4">
            {nextSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex gap-5 items-start bg-surface-container-lowest p-6 md:p-8 rounded-[2rem]"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {step.icon}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Bước {index + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-on-surface">
                    {step.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === LIÊN HỆ NHANH === */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
          >
            <div className="text-center text-white mb-8">
              <h2 className="font-headline text-2xl md:text-3xl font-extrabold mb-3">
                Cần hỗ trợ ngay?
              </h2>
              <p className="text-white/80">
                Đội ngũ của chúng tôi luôn sẵn sàng giúp đỡ bạn.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  href: "https://zalo.me/0901234567",
                  icon: "chat",
                  title: "Nhắn Zalo",
                  sub: "Phản hồi 5 phút",
                  external: true,
                },
                {
                  href: "tel:19001234",
                  icon: "call",
                  title: "Gọi Hotline",
                  sub: "1900 xxxx",
                  external: false,
                },
                {
                  href: "mailto:support@litespace.vn",
                  icon: "mail",
                  title: "Gửi Email",
                  sub: "support@litespace.vn",
                  external: false,
                },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <span
                      className="material-symbols-outlined text-white text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{item.title}</p>
                    <p className="text-[11px] text-white/60">{item.sub}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/"
                className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
              >
                Về trang chủ
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
