"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepProgress from "@/components/shared/StepProgress";
import RegisterSidebar from "@/components/shared/RegisterSidebar";
import { useRegistration, type ContactInfo } from "@/hooks/useRegistration";

// Validate email
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Validate SĐT VN (10 số, bắt đầu bằng 0)
const isValidPhone = (phone: string) => /^0\d{9}$/.test(phone.replace(/\s/g, ""));

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  taxId?: string;
  industry?: string;
}

export default function ContactPage() {
  const router = useRouter();
  const { state, updateState, totals } = useRegistration();

  // Form state
  const [form, setForm] = useState<ContactInfo>(
    state.contactInfo ?? {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
    }
  );
  const [regType, setRegType] = useState<"new" | "transfer">(
    state.registrationType ?? "new"
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Xử lý thay đổi input
  const handleChange = useCallback(
    (field: keyof ContactInfo, value: string | number) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      // Xóa lỗi khi user bắt đầu sửa
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  // Đánh dấu field đã được focus
  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  // Validate tất cả fields
  const validate = useCallback((): FormErrors => {
    const errs: FormErrors = {};

    if (!form.fullName.trim()) errs.fullName = "Vui lòng nhập họ tên";
    if (!form.email.trim()) errs.email = "Vui lòng nhập email";
    else if (!isValidEmail(form.email)) errs.email = "Email không đúng định dạng";
    if (!form.phone.trim()) errs.phone = "Vui lòng nhập số điện thoại";
    else if (!isValidPhone(form.phone))
      errs.phone = "SĐT phải có 10 số, bắt đầu bằng 0";
    if (!form.companyName.trim()) errs.companyName = "Vui lòng nhập tên công ty";

    if (regType === "transfer" && !form.taxId?.trim()) {
      errs.taxId = "Vui lòng nhập mã số thuế";
    }

    return errs;
  }, [form, regType]);

  // Submit
  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    // Đánh dấu tất cả đã touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      companyName: true,
      taxId: true,
    });

    if (Object.keys(errs).length > 0) return;

    updateState({
      contactInfo: form,
      registrationType: regType,
      currentStep: 8,
    });
    router.push("/register/kyc");
  };

  // Helper render input field
  const renderField = (
    field: keyof ContactInfo,
    label: string,
    placeholder: string,
    type: string = "text",
    required: boolean = true
  ) => {
    const value = (form[field] as string) ?? "";
    const error = touched[field] ? errors[field] : undefined;

    return (
      <div className="space-y-2">
        <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
          {label}{" "}
          {required && <span className="text-error">*</span>}
        </label>
        <input
          type={type}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          onBlur={() => handleBlur(field)}
          placeholder={placeholder}
          className={`w-full px-5 py-4 rounded-2xl bg-surface text-sm transition-all outline-none border ${
            error
              ? "border-error/40 ring-2 ring-error/10"
              : "border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20"
          }`}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-error flex items-center gap-1 ml-1"
          >
            <span className="material-symbols-outlined text-xs">error</span>
            {error}
          </motion.p>
        )}
      </div>
    );
  };

  return (
    <>
      <StepProgress currentStep={7} />

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
                    person
                  </span>
                  Bước 7 — Thông tin liên hệ
                </div>
                <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
                  Thông tin{" "}
                  <span className="text-primary">liên hệ</span>
                </h1>
                <p className="text-on-surface-variant text-base max-w-lg">
                  Điền thông tin cá nhân và doanh nghiệp để chúng tôi xử lý đăng
                  ký nhanh nhất.
                </p>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-[0_12px_60px_rgba(44,47,49,0.04)]"
              >
                <div className="space-y-5">
                  {/* Họ tên + SĐT */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {renderField("fullName", "Họ và tên", "Nguyễn Văn A")}
                    {renderField(
                      "phone",
                      "Số điện thoại",
                      "0901 234 567",
                      "tel"
                    )}
                  </div>

                  {/* Email */}
                  {renderField("email", "Email", "email@congty.com", "email")}

                  {/* Tên công ty */}
                  {renderField(
                    "companyName",
                    "Tên công ty",
                    "Công ty TNHH ABC"
                  )}

                  {/* Phân nhánh: Mở mới / Chuyển địa chỉ */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                      Mục đích đăng ký{" "}
                      <span className="text-error">*</span>
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {(
                        [
                          {
                            value: "new" as const,
                            icon: "rocket_launch",
                            label: "Mở công ty mới",
                            desc: "Đăng ký pháp nhân mới",
                          },
                          {
                            value: "transfer" as const,
                            icon: "swap_horiz",
                            label: "Chuyển địa chỉ",
                            desc: "Công ty đã có, chuyển trụ sở",
                          },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setRegType(opt.value)}
                          className={`text-left p-4 rounded-2xl transition-all duration-300 ${
                            regType === opt.value
                              ? "bg-primary/5 ring-2 ring-primary"
                              : "bg-surface hover:bg-primary/5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`material-symbols-outlined text-xl ${
                                regType === opt.value
                                  ? "text-primary"
                                  : "text-on-surface-variant"
                              }`}
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              {opt.icon}
                            </span>
                            <div>
                              <p
                                className={`text-sm font-bold ${
                                  regType === opt.value
                                    ? "text-primary"
                                    : "text-on-surface"
                                }`}
                              >
                                {opt.label}
                              </p>
                              <p className="text-xs text-on-surface-variant">
                                {opt.desc}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* === NHÁNH A: Mở công ty mới === */}
                  <AnimatePresence mode="wait">
                    {regType === "new" && (
                      <motion.div
                        key="new"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5 overflow-hidden"
                      >
                        <div className="grid sm:grid-cols-2 gap-5">
                          {renderField(
                            "industry",
                            "Ngành nghề dự kiến",
                            "Công nghệ thông tin",
                            "text",
                            false
                          )}
                          <div className="space-y-2">
                            <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                              Vốn điều lệ dự kiến
                            </label>
                            <input
                              type="text"
                              value={
                                form.capitalAmount
                                  ? form.capitalAmount.toLocaleString("vi-VN")
                                  : ""
                              }
                              onChange={(e) => {
                                const num = parseInt(
                                  e.target.value.replace(/\D/g, ""),
                                  10
                                );
                                handleChange(
                                  "capitalAmount",
                                  isNaN(num) ? 0 : num
                                );
                              }}
                              placeholder="100.000.000"
                              className="w-full px-5 py-4 rounded-2xl bg-surface text-sm transition-all outline-none border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                            <p className="text-[10px] text-on-surface-variant/60 ml-1">
                              Đơn vị: VNĐ
                            </p>
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-secondary-container/20 text-xs text-on-surface-variant flex items-start gap-2">
                          <span className="material-symbols-outlined text-secondary text-base mt-0.5">
                            info
                          </span>
                          <span>
                            Mở pháp nhân là bắt buộc với công ty mới. Bạn có thể
                            sử dụng dịch vụ mở công ty của LITE Space (đã chọn ở
                            bước Add-on) hoặc tự thực hiện.
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* === NHÁNH B: Chuyển địa chỉ === */}
                    {regType === "transfer" && (
                      <motion.div
                        key="transfer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5 overflow-hidden"
                      >
                        {renderField(
                          "taxId",
                          "Mã số thuế (MST)",
                          "0123456789",
                          "text",
                          true
                        )}
                        <div className="p-4 rounded-2xl bg-secondary-container/20 text-xs text-on-surface-variant flex items-start gap-2">
                          <span className="material-symbols-outlined text-secondary text-base mt-0.5">
                            info
                          </span>
                          <span>
                            Hệ thống sẽ tra cứu thông tin công ty từ MST.
                            Bước KYC tiếp theo sẽ yêu cầu giấy tờ pháp lý
                            bao gồm CMND/CCCD và Giấy phép ĐKKD.
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Nút hành động */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 pt-6">
                  <button
                    type="button"
                    onClick={() => router.push("/register/promo")}
                    className="px-6 py-3.5 rounded-full border-2 border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:border-primary hover:text-primary transition-all"
                  >
                    ← Quay lại
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 sm:flex-none px-10 py-4 rounded-full bg-primary text-on-primary font-bold text-base shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.99] transition-transform"
                  >
                    Tiếp tục
                    <span className="material-symbols-outlined text-lg ml-1.5 align-middle">
                      arrow_forward
                    </span>
                  </button>
                </div>

                <p className="text-xs text-center text-on-surface-variant mt-4">
                  Bằng việc tiếp tục, bạn đồng ý với{" "}
                  <a
                    href="/terms"
                    className="text-primary font-bold hover:underline"
                  >
                    Điều khoản dịch vụ
                  </a>{" "}
                  và{" "}
                  <a
                    href="/privacy"
                    className="text-primary font-bold hover:underline"
                  >
                    Chính sách bảo mật
                  </a>
                  .
                </p>
              </motion.div>
            </div>

            {/* === CỘT PHẢI: Sidebar === */}
            <RegisterSidebar state={state} totals={totals} />
          </div>
        </div>
      </section>
    </>
  );
}
