"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type OrderData = {
  plan: {
    id: string;
    name: string;
    price: string;
  };
  customer: {
    fullName: string;
    phone: string;
    email: string;
  };
};

export default function SuccessContent() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("litespace_order");
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  // Các bước tiếp theo sau khi đăng ký
  const nextSteps = [
    {
      icon: "mark_email_read",
      title: "Kiểm tra email",
      description: "Chúng tôi đã gửi email xác nhận đến địa chỉ email bạn đã đăng ký. Vui lòng kiểm tra hộp thư (bao gồm cả thư mục Spam).",
    },
    {
      icon: "support_agent",
      title: "Tư vấn viên liên hệ",
      description: "Đội ngũ LITE Space sẽ liên hệ bạn qua điện thoại trong vòng 15 phút để xác nhận thông tin và hướng dẫn các bước tiếp theo.",
    },
    {
      icon: "description",
      title: "Ký hợp đồng",
      description: "Sau khi xác nhận, hợp đồng điện tử sẽ được gửi qua email. Bạn có thể ký trực tuyến mà không cần gặp trực tiếp.",
    },
    {
      icon: "rocket_launch",
      title: "Kích hoạt dịch vụ",
      description: "Dịch vụ văn phòng ảo sẽ được kích hoạt trong vòng 24 giờ sau khi hợp đồng được ký kết hoàn tất.",
    },
  ];

  return (
    <>
      {/* === HERO THÀNH CÔNG === */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px]" />
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

            {/* Thanh tiến trình hoàn tất */}
            <div className="flex items-center justify-center gap-4 mb-10">
              {[
                { num: 1, label: "Chọn gói & Thông tin" },
                { num: 2, label: "Thanh toán" },
                { num: 3, label: "Hoàn tất" },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold bg-primary text-white">
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                    <span className="text-sm font-medium hidden sm:inline text-primary">
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="w-8 md:w-16 h-[2px] bg-primary" />
                  )}
                </div>
              ))}
            </div>

            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-4">
              Đăng ký{" "}
              <span className="text-green-600">thành công!</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-lg mx-auto">
              {order ? (
                <>
                  Cảm ơn <strong className="text-on-surface">{order.customer.fullName}</strong>! Đăng ký gói{" "}
                  <strong className="text-primary">{order.plan.name}</strong> đã được ghi nhận.
                </>
              ) : (
                "Đăng ký dịch vụ văn phòng ảo của bạn đã được ghi nhận thành công."
              )}
            </p>
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

          <div className="space-y-6">
            {nextSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex gap-5 items-start bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-outline-variant/10"
              >
                {/* Số thứ tự */}
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
                  <h3 className="font-bold text-lg mb-1">{step.title}</h3>
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
              <a
                href="https://zalo.me/0901234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors group"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-xl">chat</span>
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Nhắn Zalo</p>
                  <p className="text-[11px] text-white/60">Phản hồi 5 phút</p>
                </div>
              </a>

              <a
                href="tel:19001234"
                className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors group"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Gọi Hotline</p>
                  <p className="text-[11px] text-white/60">1900 xxxx</p>
                </div>
              </a>

              <a
                href="mailto:support@litespace.vn"
                className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors group"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Gửi Email</p>
                  <p className="text-[11px] text-white/60">support@litespace.vn</p>
                </div>
              </a>
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
