"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StepProgress from "@/components/shared/StepProgress";
import { useRegistration } from "@/hooks/useRegistration";

// Hiệu ứng animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function RegisterPage() {
  const router = useRouter();
  const { state, updateState } = useRegistration();

  // Xử lý chọn thương hiệu
  const handleSelectBrand = (brand: "lmak" | "lite") => {
    if (brand === "lite") return; // LITE chưa kích hoạt
    updateState({ selectedBrand: brand, currentStep: 2 });
    router.push("/register/building");
  };

  return (
    <>
      {/* Thanh tiến trình */}
      <StepProgress currentStep={1} />

      {/* === HERO === */}
      <section className="relative pb-8 overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                apartment
              </span>
              Bước 1 — Chọn thương hiệu
            </div>
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
              Chọn phong cách{" "}
              <span className="text-primary">văn phòng ảo</span> của bạn
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg max-w-xl mx-auto">
              Hai thương hiệu — một hệ sinh thái. Chọn phong cách phù hợp với
              tầm nhìn doanh nghiệp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === 2 CARD THƯƠNG HIỆU === */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6 mb-10"
          >
            {/* Card L'MAK — Active */}
            <motion.button
              variants={cardVariants}
              type="button"
              onClick={() => handleSelectBrand("lmak")}
              className="group relative text-left p-8 md:p-10 rounded-[2rem] bg-surface-container-lowest transition-all duration-300 hover:shadow-[0_12px_60px_rgba(0,88,187,0.12)] hover:-translate-y-1 cursor-pointer"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  diamond
                </span>
                Flagship
              </div>

              {/* Tên thương hiệu */}
              <h2 className="font-headline text-3xl font-extrabold text-on-surface mb-2">
                L&apos;MAK
              </h2>
              <p className="text-sm text-on-surface-variant mb-6">
                Cao cấp · Trung tâm thành phố
              </p>

              {/* Bảng thông tin */}
              <div className="space-y-3 mb-8">
                {[
                  {
                    icon: "location_city",
                    label: "Tòa nhà",
                    value: "Quy mô lớn, bề thế, vị trí trung tâm",
                  },
                  {
                    icon: "smart_toy",
                    label: "Công nghệ",
                    value: "Face-ID · Sustainability · Hospitality",
                  },
                  {
                    icon: "groups",
                    label: "Đối tượng",
                    value:
                      "DN cần hình ảnh cao cấp, địa chỉ danh giá",
                  },
                  {
                    icon: "support_agent",
                    label: "Vận hành",
                    value: "ESTA",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">
                        {item.label}
                      </p>
                      <p className="text-sm text-on-surface">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                <span>Chọn L&apos;MAK</span>
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </div>
            </motion.button>

            {/* Card LITE — Disabled */}
            <motion.div
              variants={cardVariants}
              className="relative text-left p-8 md:p-10 rounded-[2rem] bg-surface-container-lowest opacity-50 cursor-not-allowed select-none"
            >
              {/* Badge Sắp ra mắt */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container text-[10px] font-black uppercase tracking-widest shadow-md whitespace-nowrap">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    schedule
                  </span>
                  Sắp ra mắt
                </div>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-on-surface-variant/10 text-on-surface-variant text-[10px] font-black uppercase tracking-widest mb-6">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  eco
                </span>
                Phổ thông
              </div>

              {/* Tên thương hiệu */}
              <h2 className="font-headline text-3xl font-extrabold text-on-surface mb-2">
                LITE
              </h2>
              <p className="text-sm text-on-surface-variant mb-6">
                Linh hoạt · Đa vị trí
              </p>

              {/* Bảng thông tin */}
              <div className="space-y-3 mb-8">
                {[
                  {
                    icon: "location_city",
                    label: "Tòa nhà",
                    value: "Quy mô nhỏ hơn, vị trí linh hoạt",
                  },
                  {
                    icon: "smart_toy",
                    label: "Công nghệ",
                    value: "Hospitality (không Tech, không Sustainability)",
                  },
                  {
                    icon: "groups",
                    label: "Đối tượng",
                    value: "Startup, freelancer, DN linh hoạt",
                  },
                  {
                    icon: "support_agent",
                    label: "Vận hành",
                    value: "ESTA",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-lg mt-0.5">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">
                        {item.label}
                      </p>
                      <p className="text-sm text-on-surface">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA disabled */}
              <div className="flex items-center gap-2 text-on-surface-variant font-bold">
                <span>Sắp ra mắt</span>
                <span className="material-symbols-outlined text-lg">lock</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Ghi chú */}
          <p className="text-center text-xs text-on-surface-variant">
            Cả hai thương hiệu đều thuộc hệ sinh thái{" "}
            <span className="font-bold text-on-surface">ESTA</span> — Đơn vị
            vận hành và quản lý chuyên nghiệp.
          </p>
        </div>
      </section>
    </>
  );
}
