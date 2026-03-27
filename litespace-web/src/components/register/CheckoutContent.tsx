"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Kiểu dữ liệu đơn hàng
type OrderData = {
  plan: {
    id: string;
    name: string;
    price: string;
    priceNumber: number;
    period: string;
  };
  customer: {
    fullName: string;
    phone: string;
    email: string;
    companyName: string;
    businessField: string;
    note: string;
  };
};

export default function CheckoutContent() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "qr">("qr");
  const [isProcessing, setIsProcessing] = useState(false);

  // Đọc dữ liệu đơn hàng từ sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("litespace_order");
    if (stored) {
      setOrder(JSON.parse(stored));
    } else {
      // Nếu không có dữ liệu, quay lại trang đăng ký
      router.push("/register");
    }
  }, [router]);

  // Xử lý xác nhận thanh toán
  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Giả lập xử lý thanh toán
    setTimeout(() => {
      sessionStorage.setItem("litespace_payment_confirmed", "true");
      router.push("/register/success");
    }, 2000);
  };

  if (!order) {
    return (
      <section className="pt-40 pb-28">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-6" />
          <p className="text-on-surface-variant">Đang tải thông tin đơn hàng...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* === HERO === */}
      <section className="relative pt-40 pb-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
              Xác nhận & Thanh toán
            </h1>

            {/* Thanh tiến trình */}
            <div className="flex items-center justify-center gap-4 mt-8">
              {[
                { num: 1, label: "Chọn gói & Thông tin" },
                { num: 2, label: "Thanh toán" },
                { num: 3, label: "Hoàn tất" },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        s.num <= 2
                          ? "bg-primary text-white"
                          : "bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      {s.num < 2 ? (
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      ) : (
                        s.num
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium hidden sm:inline ${
                        s.num === 2
                          ? "text-primary font-bold"
                          : s.num < 2
                          ? "text-primary"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div
                      className={`w-8 md:w-16 h-[2px] ${
                        i < 1 ? "bg-primary" : "bg-outline-variant/30"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* === NỘI DUNG CHÍNH === */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Cột trái: Tóm tắt đơn hàng (2/5) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Tóm tắt gói */}
              <div className="bg-white p-7 rounded-3xl shadow-lg border border-outline-variant/10">
                <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    receipt_long
                  </span>
                  Tóm tắt đơn hàng
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant text-sm">Gói dịch vụ</span>
                    <span className="font-bold">{order.plan.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant text-sm">Chu kỳ</span>
                    <span className="font-medium">Hàng tháng</span>
                  </div>
                  <div className="border-t border-outline-variant/20 pt-4 flex justify-between items-center">
                    <span className="font-bold text-lg">Tổng cộng</span>
                    <span className="font-black text-2xl text-primary">
                      {order.plan.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Thông tin khách hàng */}
              <div className="bg-white p-7 rounded-3xl shadow-lg border border-outline-variant/10">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    person
                  </span>
                  Thông tin khách hàng
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Họ tên</span>
                    <span className="font-medium">{order.customer.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">SĐT</span>
                    <span className="font-medium">{order.customer.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Email</span>
                    <span className="font-medium">{order.customer.email}</span>
                  </div>
                  {order.customer.companyName && (
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Công ty</span>
                      <span className="font-medium">{order.customer.companyName}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => router.push("/register")}
                  className="text-primary text-sm font-bold mt-4 hover:underline"
                >
                  Chỉnh sửa thông tin
                </button>
              </div>
            </motion.div>

            {/* Cột phải: Phương thức thanh toán (3/5) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-outline-variant/10">
                <h3 className="font-headline text-xl font-extrabold mb-6">
                  Phương thức thanh toán
                </h3>

                {/* Chọn phương thức */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("qr")}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === "qr"
                        ? "border-primary bg-primary/5"
                        : "border-outline-variant/20 hover:border-primary/30"
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary text-3xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                      qr_code_2
                    </span>
                    <p className="font-bold">Quét mã QR</p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Thanh toán nhanh qua ứng dụng ngân hàng
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === "bank"
                        ? "border-primary bg-primary/5"
                        : "border-outline-variant/20 hover:border-primary/30"
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary text-3xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                      account_balance
                    </span>
                    <p className="font-bold">Chuyển khoản ngân hàng</p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Chuyển khoản thủ công theo thông tin bên dưới
                    </p>
                  </button>
                </div>

                {/* Nội dung thanh toán QR */}
                {paymentMethod === "qr" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center p-8 bg-surface rounded-2xl mb-8"
                  >
                    <div className="w-56 h-56 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-inner border border-outline-variant/20 mb-4">
                      <div className="text-center">
                        <span className="material-symbols-outlined text-primary text-6xl">qr_code_2</span>
                        <p className="text-xs text-on-surface-variant mt-2">Mã QR thanh toán</p>
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant">
                      Mở ứng dụng ngân hàng và quét mã QR để thanh toán
                    </p>
                    <p className="text-xs text-on-surface-variant mt-2">
                      Nội dung CK:{" "}
                      <span className="font-bold text-on-surface">
                        LITESPACE {order.plan.name.toUpperCase()} {order.customer.phone}
                      </span>
                    </p>
                  </motion.div>
                )}

                {/* Nội dung chuyển khoản ngân hàng */}
                {paymentMethod === "bank" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 bg-surface rounded-2xl mb-8 space-y-4"
                  >
                    <div className="grid grid-cols-[120px_1fr] gap-3 text-sm">
                      <span className="text-on-surface-variant font-medium">Ngân hàng</span>
                      <span className="font-bold">Vietcombank</span>
                      <span className="text-on-surface-variant font-medium">Số tài khoản</span>
                      <span className="font-bold font-mono">0123 456 789 000</span>
                      <span className="text-on-surface-variant font-medium">Chủ tài khoản</span>
                      <span className="font-bold">CÔNG TY TNHH LITE SPACE</span>
                      <span className="text-on-surface-variant font-medium">Số tiền</span>
                      <span className="font-bold text-primary text-lg">{order.plan.price}</span>
                      <span className="text-on-surface-variant font-medium">Nội dung CK</span>
                      <span className="font-bold text-primary">
                        LITESPACE {order.plan.name.toUpperCase()} {order.customer.phone}
                      </span>
                    </div>
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
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Xác nhận đã thanh toán
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-on-surface-variant mt-4">
                  Đội ngũ LITE Space sẽ xác nhận thanh toán trong vòng 15 phút
                  (trong giờ hành chính).
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
