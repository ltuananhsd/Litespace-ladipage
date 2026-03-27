import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import PricingContent from "@/components/pricing/PricingContent";

export const metadata: Metadata = {
  title: "Bảng giá - LITE Space | Văn phòng ảo từ 590.000đ/tháng",
  description:
    "So sánh chi tiết các gói dịch vụ văn phòng ảo tại LITE Space. Giá chỉ từ 590.000đ/tháng với đầy đủ tiện ích.",
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <PricingContent />
      <Footer />
      <Chatbot />
    </main>
  );
}
