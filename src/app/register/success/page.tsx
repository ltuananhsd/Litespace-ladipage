import type { Metadata } from "next";
import SuccessContent from "@/components/register/SuccessContent";

export const metadata: Metadata = {
  title: "Đăng ký thành công",
  description:
    "Chúc mừng! Bạn đã đăng ký dịch vụ văn phòng ảo tại LITE Space thành công.",
};

export default function SuccessPage() {
  return <SuccessContent />;
}
