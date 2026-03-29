"use client";

import { useState, useEffect, useCallback } from "react";

// === KIỂU DỮ LIỆU CHÍNH ===

/** Thông tin tòa nhà đã chọn */
export interface SelectedBuilding {
  id: string;
  name: string;
  address: string;
}

/** Thông tin gói dịch vụ đã chọn */
export interface SelectedPackage {
  id: string;
  name: "basic" | "upgrade" | "premium";
  basePrice: number; // VNĐ/tháng
}

/** Thông tin giảm giá từ mã khuyến mại */
export interface Discount {
  type: "percent" | "fixed";
  value: number;
  name: string;
}

/** Thông tin liên hệ khách hàng */
export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  taxId?: string; // chỉ khi registrationType = 'transfer'
  industry?: string; // chỉ khi registrationType = 'new'
  capitalAmount?: number; // chỉ khi registrationType = 'new'
}

/** State toàn bộ flow đăng ký 10 bước */
export interface RegistrationState {
  selectedBrand: "lmak" | "lite" | null;
  selectedBuilding: SelectedBuilding | null;
  selectedPackage: SelectedPackage | null;
  contractMonths: 6 | 12 | 24 | null;
  addOns: string[];
  promoCode: string | null;
  discount: Discount | null;
  contactInfo: ContactInfo | null;
  registrationType: "new" | "transfer" | null;
  kycStatus: "pending" | "uploaded" | "skipped";
  contractSigned: boolean;
  contractId: string | null;
  paymentStatus: "pending" | "confirmed";
  registrationId: string | null;
  currentStep: number;
}

// Key lưu trong sessionStorage
const STORAGE_KEY = "litespace_registration";

// State mặc định khi bắt đầu flow mới
const DEFAULT_STATE: RegistrationState = {
  selectedBrand: null,
  selectedBuilding: null,
  selectedPackage: null,
  contractMonths: null,
  addOns: [],
  promoCode: null,
  discount: null,
  contactInfo: null,
  registrationType: null,
  kycStatus: "pending",
  contractSigned: false,
  contractId: null,
  paymentStatus: "pending",
  registrationId: null,
  currentStep: 1,
};

// === HELPER FUNCTIONS ===

/** Đọc state từ sessionStorage */
function getStoredState(): RegistrationState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_STATE;
  }
}

/** Ghi state vào sessionStorage */
function setStoredState(state: RegistrationState): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Bỏ qua lỗi storage đầy
  }
}

/** Format tiền VNĐ (VD: 1.090.000đ) */
export function formatVND(amount: number): string {
  return amount.toLocaleString("vi-VN") + "đ";
}

/** Tính tổng tiền thanh toán từ state hiện tại */
export function calculateTotal(state: RegistrationState): {
  baseMonthly: number;
  basePeriod: number;
  addOnsTotal: number;
  discountAmount: number;
  grandTotal: number;
} {
  const baseMonthly = state.selectedPackage?.basePrice ?? 0;
  const months = state.contractMonths ?? 0;
  const basePeriod = baseMonthly * months;

  // TODO: Tính giá add-ons thực tế khi có data từ Sales
  const addOnsTotal = 0;

  let discountAmount = 0;
  if (state.discount) {
    const subtotal = basePeriod + addOnsTotal;
    if (state.discount.type === "percent") {
      discountAmount = Math.round(subtotal * (state.discount.value / 100));
    } else {
      discountAmount = state.discount.value;
    }
  }

  const grandTotal = basePeriod + addOnsTotal - discountAmount;

  return {
    baseMonthly,
    basePeriod,
    addOnsTotal,
    discountAmount,
    grandTotal: Math.max(0, grandTotal),
  };
}

// === BẢNG VALIDATE TỪNG BƯỚC ===

/** Kiểm tra xem đã đủ data để đi tới bước tiếp theo chưa */
export function canProceedToStep(
  step: number,
  state: RegistrationState
): boolean {
  switch (step) {
    case 1:
      return true; // Luôn có thể vào Bước 1
    case 2:
      return state.selectedBrand !== null;
    case 3:
      return state.selectedBuilding !== null;
    case 4:
      return state.selectedPackage !== null;
    case 5:
      return state.contractMonths !== null;
    case 6:
      return state.contractMonths !== null; // Add-ons là tùy chọn, chỉ cần qua Bước 4
    case 7:
      return state.contractMonths !== null; // Promo tùy chọn
    case 8:
      return state.contactInfo !== null && state.registrationType !== null;
    case 9:
      return state.kycStatus !== "pending" || state.registrationType === "new";
    case 10:
      return state.contractSigned;
    default:
      return false;
  }
}

/** Lấy label tiếng Việt cho mỗi bước */
export function getStepLabel(step: number): string {
  const labels: Record<number, string> = {
    1: "Thương hiệu",
    2: "Tòa nhà",
    3: "Gói dịch vụ",
    4: "Thời hạn",
    5: "Dịch vụ thêm",
    6: "Mã khuyến mại",
    7: "Thông tin",
    8: "Giấy tờ",
    9: "Hợp đồng",
    10: "Thanh toán",
  };
  return labels[step] ?? "";
}

/** Lấy route tương ứng cho mỗi bước */
export function getStepRoute(step: number): string {
  const routes: Record<number, string> = {
    1: "/register",
    2: "/register/building",
    3: "/register/package",
    4: "/register/duration",
    5: "/register/addons",
    6: "/register/promo",
    7: "/register/contact",
    8: "/register/kyc",
    9: "/register/contract",
    10: "/register/checkout",
  };
  return routes[step] ?? "/register";
}

// === HOOK CHÍNH ===

export function useRegistration() {
  const [state, setState] = useState<RegistrationState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Đọc state từ sessionStorage khi mount (client-side only)
  useEffect(() => {
    const stored = getStoredState();
    setState(stored);
    setIsLoaded(true);
  }, []);

  // Cập nhật 1 phần state (merge partial)
  const updateState = useCallback(
    (partial: Partial<RegistrationState>) => {
      setState((prev) => {
        const next = { ...prev, ...partial };
        setStoredState(next);
        return next;
      });
    },
    []
  );

  // Xóa toàn bộ state (bắt đầu lại từ đầu)
  const resetState = useCallback(() => {
    setState(DEFAULT_STATE);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Chuyển tới bước tiếp theo
  const goToStep = useCallback(
    (step: number) => {
      updateState({ currentStep: step });
    },
    [updateState]
  );

  // Kiểm tra bước hiện tại có thể tiến tiếp không
  const canProceed = useCallback(
    (targetStep: number) => {
      return canProceedToStep(targetStep, state);
    },
    [state]
  );

  // Tính toán giá
  const totals = calculateTotal(state);

  return {
    state,
    isLoaded,
    updateState,
    resetState,
    goToStep,
    canProceed,
    totals,
  };
}
