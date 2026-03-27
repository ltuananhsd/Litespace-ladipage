"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Dữ liệu các gói dịch vụ
const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "590.000đ",
    priceNumber: 590000,
    period: "/tháng",
    description: "Dành cho doanh nghiệp mới khởi nghiệp",
    features: [
      "Địa chỉ kinh doanh hợp pháp",
      "Tuân thủ pháp lý doanh nghiệp",
      "Tiếp nhận thư từ, bưu phẩm",
      "Scan thư (có phí)",
      "Danh thiếp tiêu chuẩn",
    ],
    popular: false,
  },
  {
    id: "upgrade",
    name: "Upgrade",
    price: "1.090.000đ",
    priceNumber: 1090000,
    period: "/tháng",
    description: "Gói phổ biến nhất — Đầy đủ tiện ích",
    features: [
      "Tất cả tính năng Basic",
      "Scan & Chuyển tiếp thư miễn phí",
      "Hỗ trợ mở TK Ngân hàng (3 lần)",
      "Hỗ trợ đăng ký kinh doanh",
      "3 tháng Kế toán miễn phí",
      "Thay đổi GPKD (2 lần/năm)",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "1.190.000đ",
    priceNumber: 1190000,
    period: "/tháng",
    description: "Trọn gói cao cấp — Ưu tiên tối đa",
    features: [
      "Tất cả đặc quyền Upgrade",
      "Ưu tiên mở 5 TK Ngân hàng",
      "Miễn phí 01 bộ Logo chuyên nghiệp",
      "Miễn phí thiết kế Landing Page",
      "Tư vấn pháp lý 24/7",
    ],
    popular: false,
  },
];

// Hiệu ứng animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function RegisterContent() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("upgrade");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    companyName: "",
    businessField: "",
    note: "",
  });
  const [step, setStep] = useState<1 | 2>(1); // Bước 1: Chọn gói, Bước 2: Điền thông tin

  // Xử lý thay đổi input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lưu dữ liệu vào sessionStorage để truyền sang trang checkout
    const orderData = {
      plan: plans.find((p) => p.id === selectedPlan),
      customer: formData,
    };
    sessionStorage.setItem("litespace_order", JSON.stringify(orderData));
    router.push("/register/checkout");
  };

  return (
    <>
      {/* === HERO === */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px]" />
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
                app_registration
              </span>
              Đăng ký dịch vụ
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-6">
              Chọn gói phù hợp{" "}
              <span className="text-primary">cho bạn</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              Chỉ 3 bước đơn giản để sở hữu văn phòng ảo chuyên nghiệp.
            </p>

            {/* Thanh tiến trình */}
            <div className="flex items-center justify-center gap-4 mt-10">
              {[
                { num: 1, label: "Chọn gói & Thông tin" },
                { num: 2, label: "Thanh toán" },
                { num: 3, label: "Hoàn tất" },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        s.num === 1
                          ? "bg-primary text-white"
                          : "bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      {s.num}
                    </div>
                    <span
                      className={`text-sm font-medium hidden sm:inline ${
                        s.num === 1
                          ? "text-primary font-bold"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="w-8 md:w-16 h-[2px] bg-outline-variant/30" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* === BƯỚC 1: CHỌN GÓI === */}
      {step === 1 && (
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              {plans.map((plan) => (
                <motion.button
                  key={plan.id}
                  variants={itemVariants}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative text-left p-8 rounded-3xl border-2 transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? plan.popular
                        ? "border-primary bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.02]"
                        : "border-primary bg-white shadow-2xl shadow-primary/10 scale-[1.02]"
                      : "border-outline-variant/20 bg-white hover:border-primary/30 hover:shadow-lg"
                  }`}
                >
                  {/* Badge phổ biến */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tertiary-container text-on-tertiary-container px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-md">
                      Dễ Chọn Nhất
                    </div>
                  )}

                  {/* Radio indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedPlan === plan.id
                          ? plan.popular
                            ? "border-white"
                            : "border-primary"
                          : "border-outline-variant"
                      }`}
                    >
                      {selectedPlan === plan.id && (
                        <div
                          className={`w-3 h-3 rounded-full ${
                            plan.popular && selectedPlan === plan.id
                              ? "bg-white"
                              : "bg-primary"
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Giá */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-black">{plan.price}</span>
                    <span
                      className={`text-sm font-medium ${
                        selectedPlan === plan.id && plan.popular
                          ? "text-white/70"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    className={`text-sm mb-6 ${
                      selectedPlan === plan.id && plan.popular
                        ? "text-white/80"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Danh sách tính năng */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span
                          className={`material-symbols-outlined text-lg ${
                            selectedPlan === plan.id && plan.popular
                              ? "text-white"
                              : "text-primary"
                          }`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.button>
              ))}
            </motion.div>

            {/* Nút tiếp tục */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-primary text-on-primary px-12 py-5 rounded-full font-bold text-lg shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.99] transition-transform"
              >
                Tiếp tục điền thông tin
                <span className="material-symbols-outlined text-xl ml-2 align-middle">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* === BƯỚC 2: ĐIỀN THÔNG TIN === */}
      {step === 2 && (
        <section className="pb-24">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Gói đã chọn */}
              <div className="bg-primary/5 border border-primary/15 p-5 rounded-2xl mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-primary text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  <div>
                    <p className="text-sm text-on-surface-variant">Gói đã chọn</p>
                    <p className="font-bold text-on-surface">
                      {plans.find((p) => p.id === selectedPlan)?.name} —{" "}
                      {plans.find((p) => p.id === selectedPlan)?.price}
                      {plans.find((p) => p.id === selectedPlan)?.period}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-primary font-bold text-sm hover:underline"
                >
                  Đổi gói
                </button>
              </div>

              {/* Form thông tin */}
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-outline-variant/10 space-y-6"
              >
                <h2 className="font-headline text-2xl font-extrabold mb-2">
                  Thông tin đăng ký
                </h2>
                <p className="text-on-surface-variant text-sm mb-6">
                  Vui lòng điền đầy đủ thông tin để chúng tôi xử lý đăng ký nhanh
                  nhất.
                </p>

                {/* Họ tên + SĐT */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                      Họ và tên <span className="text-error">*</span>
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                      Số điện thoại <span className="text-error">*</span>
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                      placeholder="090x xxx xxx"
                      type="tel"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                    Email <span className="text-error">*</span>
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                    placeholder="email@congty.com"
                    type="email"
                    required
                  />
                </div>

                {/* Tên công ty + Lĩnh vực */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                      Tên công ty
                    </label>
                    <input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                      placeholder="Công ty TNHH ABC"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                      Lĩnh vực hoạt động
                    </label>
                    <select
                      name="businessField"
                      value={formData.businessField}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm appearance-none cursor-pointer"
                    >
                      <option value="">-- Chọn lĩnh vực --</option>
                      <option value="tech">Công nghệ thông tin</option>
                      <option value="trade">Thương mại</option>
                      <option value="service">Dịch vụ</option>
                      <option value="consulting">Tư vấn</option>
                      <option value="marketing">Marketing</option>
                      <option value="education">Giáo dục</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>

                {/* Ghi chú */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                    Ghi chú thêm
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm resize-none"
                    placeholder="Yêu cầu đặc biệt hoặc câu hỏi thêm..."
                    rows={3}
                  />
                </div>

                {/* Nút hành động */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-8 py-4 rounded-full border-2 border-outline-variant/30 text-on-surface-variant font-bold hover:border-primary hover:text-primary transition-all"
                  >
                    ← Quay lại
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-5 rounded-full bg-primary text-on-primary font-bold text-lg shadow-xl shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-transform"
                  >
                    Tiến hành thanh toán
                    <span className="material-symbols-outlined text-xl ml-2 align-middle">
                      arrow_forward
                    </span>
                  </button>
                </div>

                <p className="text-xs text-center text-on-surface-variant pt-2">
                  Bằng việc tiếp tục, bạn đồng ý với{" "}
                  <a href="/terms" className="text-primary font-bold hover:underline">
                    Điều khoản dịch vụ
                  </a>{" "}
                  và{" "}
                  <a href="/privacy" className="text-primary font-bold hover:underline">
                    Chính sách bảo mật
                  </a>
                  .
                </p>
              </form>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
