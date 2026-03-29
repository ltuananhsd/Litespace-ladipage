"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import StepProgress from "@/components/shared/StepProgress";
import RegisterSidebar from "@/components/shared/RegisterSidebar";
import { useRegistration, formatVND } from "@/hooks/useRegistration";

export default function ContractPage() {
  const router = useRouter();
  const { state, updateState, totals } = useRegistration();

  const [agreed, setAgreed] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  // Giả lập ký hợp đồng
  const handleSign = () => {
    if (!agreed) return;
    setIsSigning(true);
    // TODO: Tích hợp eSign thật (VNPT CA / FPT CA / tự build) khi đã chốt
    setTimeout(() => {
      updateState({
        contractSigned: true,
        contractId: `LS-${Date.now()}`,
        currentStep: 10,
      });
      router.push("/register/checkout");
    }, 2000);
  };

  return (
    <>
      <StepProgress currentStep={9} />

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
                    contract
                  </span>
                  Bước 9 — Xem xét hợp đồng
                </div>
                <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
                  Xem xét{" "}
                  <span className="text-primary">hợp đồng dịch vụ</span>
                </h1>
                <p className="text-on-surface-variant text-base max-w-lg">
                  Vui lòng đọc kỹ các điều khoản trước khi ký xác nhận.
                </p>
              </motion.div>

              {/* Tóm tắt đơn hàng */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-surface-container-lowest rounded-[2rem] p-6 md:p-8 mb-6"
              >
                <h3 className="font-headline text-base font-extrabold text-on-surface mb-5 flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    summarize
                  </span>
                  Tóm tắt đơn hàng
                </h3>

                <div className="space-y-3 text-sm">
                  {/* Thương hiệu */}
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Thương hiệu</span>
                    <span className="font-bold text-on-surface uppercase">
                      {state.selectedBrand ?? "—"}
                    </span>
                  </div>

                  {/* Tòa nhà */}
                  {state.selectedBuilding && (
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-on-surface-variant flex-shrink-0">
                        Tòa nhà
                      </span>
                      <span className="font-bold text-on-surface text-right">
                        {state.selectedBuilding.name}
                      </span>
                    </div>
                  )}

                  {/* Gói */}
                  {state.selectedPackage && (
                    <div className="flex justify-between items-center">
                      <span className="text-on-surface-variant">Gói dịch vụ</span>
                      <span className="font-bold text-on-surface capitalize">
                        {state.selectedPackage.name}
                      </span>
                    </div>
                  )}

                  {/* Thời hạn */}
                  {state.contractMonths && (
                    <div className="flex justify-between items-center">
                      <span className="text-on-surface-variant">Thời hạn</span>
                      <span className="font-bold text-on-surface">
                        {state.contractMonths} tháng
                      </span>
                    </div>
                  )}

                  {/* Thông tin KH */}
                  {state.contactInfo && (
                    <>
                      <div className="h-[1px] bg-surface-container rounded-full my-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-on-surface-variant">Họ tên</span>
                        <span className="font-semibold text-on-surface">
                          {state.contactInfo.fullName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-on-surface-variant">Công ty</span>
                        <span className="font-semibold text-on-surface">
                          {state.contactInfo.companyName}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Đường phân cách */}
                  <div className="h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full my-2" />

                  {/* Tổng */}
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-on-surface text-base">
                      Tổng thanh toán
                    </span>
                    <span className="font-black text-primary text-xl">
                      {formatVND(totals.grandTotal)}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Nội dung hợp đồng (PDF mock) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-surface-container-lowest rounded-[2rem] p-6 md:p-8 mb-6"
              >
                <h3 className="font-headline text-base font-extrabold text-on-surface mb-4 flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    description
                  </span>
                  Điều khoản dịch vụ
                </h3>

                {/* Khung giả lập PDF hợp đồng */}
                <div className="bg-surface rounded-2xl p-6 h-[360px] overflow-y-auto text-sm text-on-surface-variant leading-relaxed space-y-4 scrollbar-thin">
                  <p className="text-center font-bold text-on-surface text-base mb-6">
                    HỢP ĐỒNG CUNG CẤP DỊCH VỤ VĂN PHÒNG ẢO
                  </p>
                  <p className="font-bold text-on-surface">Điều 1: Các định nghĩa</p>
                  <p>
                    &ldquo;Dịch vụ văn phòng ảo&rdquo; là dịch vụ cung cấp địa chỉ
                    kinh doanh hợp pháp, tiếp nhận thư từ bưu phẩm và các dịch vụ
                    hỗ trợ kinh doanh khác theo gói dịch vụ mà Bên B đã lựa chọn.
                  </p>

                  <p className="font-bold text-on-surface">Điều 2: Phạm vi dịch vụ</p>
                  <p>
                    Bên A cam kết cung cấp cho Bên B các dịch vụ được liệt kê
                    trong gói dịch vụ đã chọn, bao gồm nhưng không giới hạn:
                    đăng ký địa chỉ kinh doanh, nhận thư bưu phẩm, hỗ trợ
                    thủ tục hành chính pháp lý.
                  </p>

                  <p className="font-bold text-on-surface">Điều 3: Thời hạn hợp đồng</p>
                  <p>
                    Hợp đồng có hiệu lực kể từ ngày ký và kéo dài{" "}
                    {state.contractMonths ?? "___"} tháng. Sau thời hạn trên,
                    hợp đồng sẽ tự động gia hạn nếu không có thông báo chấm
                    dứt từ một trong hai bên.
                  </p>

                  <p className="font-bold text-on-surface">Điều 4: Phí dịch vụ và thanh toán</p>
                  <p>
                    Phí dịch vụ hàng tháng:{" "}
                    {formatVND(state.selectedPackage?.basePrice ?? 0)}.
                    Tổng thanh toán cho toàn bộ thời hạn hợp đồng:{" "}
                    {formatVND(totals.grandTotal)}. Phí được thanh toán một
                    lần trước hoặc theo thỏa thuận.
                  </p>

                  <p className="font-bold text-on-surface">Điều 5: Quyền và nghĩa vụ các bên</p>
                  <p>
                    Bên A có trách nhiệm đảm bảo dịch vụ hoạt động liên tục,
                    ổn định. Bên B có trách nhiệm sử dụng dịch vụ đúng mục
                    đích đã đăng ký, tuân thủ pháp luật Việt Nam.
                  </p>

                  <p className="font-bold text-on-surface">Điều 6: Bảo mật thông tin</p>
                  <p>
                    Hai bên cam kết bảo mật toàn bộ thông tin kinh doanh,
                    thông tin cá nhân và dữ liệu phát sinh trong quá trình
                    thực hiện hợp đồng theo quy định pháp luật Việt Nam về
                    bảo vệ dữ liệu cá nhân.
                  </p>

                  <p className="text-xs text-on-surface-variant/50 mt-6 text-center italic">
                    — Bản mẫu hợp đồng · Nội dung chính thức sẽ được cập nhật
                    khi có xác nhận từ phòng pháp lý —
                  </p>
                </div>
              </motion.div>

              {/* Checkbox đồng ý + Ký */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-5"
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={() => setAgreed(!agreed)}
                  className="flex items-start gap-3 text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                      agreed
                        ? "bg-primary border-primary"
                        : "border-outline-variant/40"
                    }`}
                  >
                    {agreed && (
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
                  <span className="text-sm text-on-surface-variant">
                    Tôi đã đọc, hiểu và đồng ý với toàn bộ{" "}
                    <span className="font-bold text-primary">
                      Điều khoản hợp đồng
                    </span>
                    ,{" "}
                    <span className="font-bold text-primary">
                      Chính sách bảo mật
                    </span>{" "}
                    và{" "}
                    <span className="font-bold text-primary">
                      Quy định sử dụng dịch vụ
                    </span>{" "}
                    của LITE Space.
                  </span>
                </button>

                {/* Nút hành động */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => router.push("/register/kyc")}
                    className="px-6 py-3.5 rounded-full border-2 border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:border-primary hover:text-primary transition-all"
                  >
                    ← Quay lại
                  </button>
                  <button
                    type="button"
                    onClick={handleSign}
                    disabled={!agreed || isSigning}
                    className={`flex-1 sm:flex-none px-10 py-4 rounded-full font-bold text-base transition-all flex items-center justify-center gap-2 ${
                      agreed && !isSigning
                        ? "bg-primary text-on-primary shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.99]"
                        : "bg-surface-container text-on-surface-variant cursor-not-allowed"
                    }`}
                  >
                    {isSigning ? (
                      <>
                        <span className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                        Đang ký...
                      </>
                    ) : (
                      <>
                        <span
                          className="material-symbols-outlined text-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          draw
                        </span>
                        Ký hợp đồng điện tử
                      </>
                    )}
                  </button>
                </div>
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
