"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StepProgress from "@/components/shared/StepProgress";
import RegisterSidebar from "@/components/shared/RegisterSidebar";
import { useRegistration, formatVND } from "@/hooks/useRegistration";

// === MOCK DATA ADD-ONS (giá placeholder — chờ data thật từ Sales) ===
interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number; // VNĐ/tháng hoặc 1 lần
  priceType: "monthly" | "one_time";
  icon: string;
  category: "legal" | "tech" | "office" | "marketing";
  popular?: boolean;
}

const addOns: AddOnItem[] = [
  {
    id: "company-registration",
    name: "Đăng ký kinh doanh",
    description: "Hỗ trợ đăng ký pháp nhân mới trọn gói",
    price: 3500000,
    priceType: "one_time",
    icon: "gavel",
    category: "legal",
    popular: true,
  },
  {
    id: "accounting-3m",
    name: "Kế toán 3 tháng",
    description: "Dịch vụ kế toán chuyên nghiệp trong 3 tháng đầu",
    price: 1500000,
    priceType: "one_time",
    icon: "calculate",
    category: "legal",
  },
  {
    id: "bank-account",
    name: "Mở tài khoản ngân hàng",
    description: "Hỗ trợ mở tài khoản doanh nghiệp tại ngân hàng uy tín",
    price: 500000,
    priceType: "one_time",
    icon: "account_balance",
    category: "legal",
    popular: true,
  },
  {
    id: "mail-forwarding",
    name: "Chuyển phát thư",
    description: "Scan & chuyển phát các bưu phẩm về địa chỉ cá nhân",
    price: 200000,
    priceType: "monthly",
    icon: "mail",
    category: "office",
  },
  {
    id: "meeting-room",
    name: "Phòng họp (4 giờ/tháng)",
    description: "Sử dụng phòng họp cao cấp tại tòa nhà",
    price: 800000,
    priceType: "monthly",
    icon: "meeting_room",
    category: "office",
  },
  {
    id: "phone-answering",
    name: "Tiếp nhận cuộc gọi",
    description: "Lễ tân ảo nhận cuộc gọi nhân danh công ty bạn",
    price: 500000,
    priceType: "monthly",
    icon: "call",
    category: "tech",
  },
  {
    id: "logo-design",
    name: "Thiết kế Logo",
    description: "Bộ nhận diện thương hiệu chuyên nghiệp (3 mẫu)",
    price: 2000000,
    priceType: "one_time",
    icon: "palette",
    category: "marketing",
  },
  {
    id: "landing-page",
    name: "Thiết kế Landing Page",
    description: "1 trang web giới thiệu doanh nghiệp responsive",
    price: 3000000,
    priceType: "one_time",
    icon: "web",
    category: "marketing",
    popular: true,
  },
];

const categories = [
  { id: "all", label: "Tất cả", icon: "apps" },
  { id: "legal", label: "Pháp lý", icon: "gavel" },
  { id: "office", label: "Văn phòng", icon: "meeting_room" },
  { id: "tech", label: "Công nghệ", icon: "devices" },
  { id: "marketing", label: "Marketing", icon: "campaign" },
];

export default function AddonsPage() {
  const router = useRouter();
  const { state, updateState, totals } = useRegistration();

  const [selected, setSelected] = useState<string[]>(state.addOns ?? []);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered =
    categoryFilter === "all"
      ? addOns
      : addOns.filter((a) => a.category === categoryFilter);

  // Tính tổng add-ons
  const addOnsMonthly = selected.reduce((sum, id) => {
    const item = addOns.find((a) => a.id === id);
    return sum + (item?.priceType === "monthly" ? item.price : 0);
  }, 0);

  const addOnsOneTime = selected.reduce((sum, id) => {
    const item = addOns.find((a) => a.id === id);
    return sum + (item?.priceType === "one_time" ? item.price : 0);
  }, 0);

  const addOnsTotalForPeriod =
    addOnsMonthly * (state.contractMonths ?? 0) + addOnsOneTime;

  // Đồng bộ khi selected thay đổi
  useEffect(() => {
    updateState({ addOns: selected });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const toggleAddon = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    updateState({ addOns: selected, currentStep: 6 });
    router.push("/register/promo");
  };

  return (
    <>
      <StepProgress currentStep={5} />

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
                className="mb-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-5">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    add_shopping_cart
                  </span>
                  Bước 5 — Dịch vụ kèm theo
                </div>
                <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
                  Dịch vụ{" "}
                  <span className="text-primary">kèm theo</span>
                </h1>
                <p className="text-on-surface-variant text-base max-w-lg">
                  Tùy chọn dịch vụ bổ sung. Bước này hoàn toàn không bắt buộc —
                  bạn có thể thêm sau.
                </p>
              </motion.div>

              {/* Bộ lọc danh mục */}
              <div className="flex items-center gap-2 flex-wrap mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1.5 ${
                      categoryFilter === cat.id
                        ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                        : "bg-surface-container-lowest text-on-surface-variant hover:bg-primary/5"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {cat.icon}
                    </span>
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Grid add-ons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-3 mb-8"
              >
                {filtered.map((item) => {
                  const isSelected = selected.includes(item.id);

                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAddon(item.id)}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full text-left p-5 rounded-[1.5rem] transition-all duration-300 flex items-start gap-4 ${
                        isSelected
                          ? "bg-surface-container-lowest ring-2 ring-primary shadow-[0_8px_40px_rgba(0,88,187,0.08)]"
                          : "bg-surface-container-lowest hover:shadow-[0_4px_20px_rgba(44,47,49,0.04)] cursor-pointer"
                      }`}
                    >
                      {/* Checkbox */}
                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                          isSelected
                            ? "bg-primary border-primary"
                            : "border-outline-variant/40"
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="material-symbols-outlined text-on-primary text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check
                          </motion.span>
                        )}
                      </div>

                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isSelected ? "bg-primary/10" : "bg-surface"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-xl ${
                            isSelected ? "text-primary" : "text-on-surface-variant"
                          }`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {item.icon}
                        </span>
                      </div>

                      {/* Thông tin */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-sm font-bold text-on-surface">
                            {item.name}
                          </h4>
                          {item.popular && (
                            <span className="px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container text-[9px] font-black uppercase">
                              Gợi ý
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-1">
                          {item.description}
                        </p>
                      </div>

                      {/* Giá */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-black text-on-surface">
                          {formatVND(item.price)}
                        </p>
                        <p className="text-[10px] text-on-surface-variant">
                          {item.priceType === "monthly" ? "/tháng" : "1 lần"}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Tóm tắt nhanh add-ons đã chọn */}
              {selected.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-tertiary/5 p-4 rounded-2xl mb-6 text-sm"
                >
                  <p className="font-bold text-on-surface mb-1">
                    Đã chọn {selected.length} dịch vụ
                  </p>
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                    {addOnsMonthly > 0 && (
                      <span>
                        Hàng tháng: <b className="text-on-surface">{formatVND(addOnsMonthly)}</b>
                      </span>
                    )}
                    {addOnsOneTime > 0 && (
                      <span>
                        Một lần: <b className="text-on-surface">{formatVND(addOnsOneTime)}</b>
                      </span>
                    )}
                    <span>
                      Tổng kỳ: <b className="text-primary">{formatVND(addOnsTotalForPeriod)}</b>
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Nút hành động */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/register/duration")}
                  className="px-6 py-3.5 rounded-full border-2 border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:border-primary hover:text-primary transition-all"
                >
                  ← Quay lại
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex-1 sm:flex-none px-10 py-4 rounded-full bg-primary text-on-primary font-bold text-base shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.99] transition-transform"
                >
                  {selected.length > 0 ? "Tiếp tục" : "Bỏ qua, tiếp tục"}
                  <span className="material-symbols-outlined text-lg ml-1.5 align-middle">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* === CỘT PHẢI: Sidebar === */}
            <RegisterSidebar
              state={{ ...state, addOns: selected, currentStep: 5 }}
              totals={{
                ...totals,
                addOnsTotal: addOnsTotalForPeriod,
                grandTotal: totals.basePeriod + addOnsTotalForPeriod - totals.discountAmount,
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
