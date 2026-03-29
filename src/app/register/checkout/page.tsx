import type { Metadata } from "next";
import CheckoutContent from "@/components/register/CheckoutContent";

export const metadata: Metadata = {
  title: "Thanh toán",
  description:
    "Xác nhận thông tin và thanh toán đăng ký dịch vụ văn phòng ảo tại LITE Space.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
