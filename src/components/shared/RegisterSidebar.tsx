"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  formatVND,
  type RegistrationState,
} from "@/hooks/useRegistration";

interface RegisterSidebarProps {
  state: RegistrationState;
  totals: {
    baseMonthly: number;
    basePeriod: number;
    addOnsTotal: number;
    discountAmount: number;
    grandTotal: number;
  };
}

export default function RegisterSidebar({
  state,
  totals,
}: RegisterSidebarProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Chỉ hiển thị từ Bước 4 trở đi
  if (state.currentStep < 4) return null;

  const sidebarContent = (
    <div className="space-y-5">
      {/* Tiêu đề */}
      <div className="flex items-center gap-2">
        <span
          className="material-symbols-outlined text-primary text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          receipt_long
        </span>
        <h3 className="font-headline text-base font-extrabold text-on-surface">
          Tóm tắt đơn hàng
        </h3>
      </div>

      {/* Thông tin tòa nhà */}
      {state.selectedBuilding && (
        <div className="space-y-1">
          <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">
            Tòa nhà
          </p>
          <p className="text-sm font-semibold text-on-surface">
            {state.selectedBuilding.name}
          </p>
          <p className="text-xs text-on-surface-variant">
            {state.selectedBuilding.address}
          </p>
        </div>
      )}

      {/* Thông tin gói dịch vụ */}
      {state.selectedPackage && (
        <div className="space-y-1">
          <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">
            Gói dịch vụ
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-on-surface capitalize">
              {state.selectedPackage.name}
            </p>
            <p className="text-sm font-bold text-on-surface">
              {formatVND(state.selectedPackage.basePrice)}
              <span className="text-xs text-on-surface-variant font-normal">
                /tháng
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Thời hạn hợp đồng */}
      {state.contractMonths && (
        <div className="space-y-1">
          <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">
            Thời hạn
          </p>
          <p className="text-sm font-semibold text-on-surface">
            {state.contractMonths} tháng
          </p>
        </div>
      )}

      {/* Đường phân cách nhẹ bằng background shift (tuân thủ DESIGN.md: không dùng border) */}
      <div className="h-[1px] bg-surface-container rounded-full" />

      {/* Tạm tính */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-on-surface-variant">Tạm tính</p>
        <p className="text-sm font-bold text-on-surface">
          {formatVND(totals.basePeriod)}
        </p>
      </div>

      {/* Add-ons (hiện từ Bước 5) */}
      {state.currentStep >= 5 && state.addOns.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">
            Dịch vụ kèm theo
          </p>
          {/* TODO: Hiển thị từng add-on với giá khi có data thật */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-on-surface-variant">
              {state.addOns.length} dịch vụ
            </p>
            <p className="text-sm font-bold text-on-surface">
              {formatVND(totals.addOnsTotal)}
            </p>
          </div>
        </div>
      )}

      {/* Mã khuyến mại (hiện từ Bước 6) */}
      {state.currentStep >= 6 && state.discount && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-tertiary text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_offer
            </span>
            <p className="text-xs font-bold text-tertiary">
              {state.discount.name}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-on-surface-variant">Giảm giá</p>
            <p className="text-sm font-bold text-error">
              -{formatVND(totals.discountAmount)}
            </p>
          </div>
        </div>
      )}

      {/* Đường phân cách */}
      <div className="h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full" />

      {/* TỔNG THANH TOÁN */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-extrabold text-on-surface">
          Tổng thanh toán
        </p>
        <p className="text-xl font-black text-primary">
          {formatVND(totals.grandTotal)}
        </p>
      </div>

      {/* Ghi chú VAT */}
      <p className="text-[10px] text-on-surface-variant/60 text-right">
        Đã bao gồm VAT
      </p>
    </div>
  );

  return (
    <>
      {/* === DESKTOP (≥768px): Cột phải sticky === */}
      <aside className="hidden md:block w-[280px] lg:w-[300px] flex-shrink-0">
        <div className="sticky top-28">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-surface-container-lowest rounded-[2rem] p-6 shadow-[0_12px_80px_rgba(44,47,49,0.06)]"
          >
            {sidebarContent}
          </motion.div>
        </div>
      </aside>

      {/* === MOBILE (<768px): Sticky bottom bar === */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        {/* Thanh tóm tắt (luôn hiện) */}
        <motion.button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full bg-surface-container-lowest/95 backdrop-blur-xl px-5 py-3.5 flex items-center justify-between shadow-[0_-4px_40px_rgba(44,47,49,0.08)]"
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              receipt_long
            </span>
            <span className="text-sm font-bold text-on-surface">
              Tổng: {formatVND(totals.grandTotal)}
            </span>
          </div>
          <span
            className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${
              mobileExpanded ? "rotate-180" : ""
            }`}
          >
            expand_less
          </span>
        </motion.button>

        {/* Panel mở rộng */}
        <AnimatePresence>
          {mobileExpanded && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileExpanded(false)}
                className="fixed inset-0 bg-on-surface/20 -z-10"
              />

              {/* Nội dung */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-surface-container-lowest rounded-t-[2rem] p-6 max-h-[70vh] overflow-y-auto"
              >
                {sidebarContent}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
