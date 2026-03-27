import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ServicesContent from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Dịch vụ - LITE Space | Giải pháp văn phòng ảo toàn diện",
  description:
    "Khám phá đầy đủ các dịch vụ văn phòng ảo tại LITE Space: địa chỉ kinh doanh, lễ tân, kế toán, pháp lý, thiết kế và hơn thế nữa.",
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <ServicesContent />
      <Footer />
      <Chatbot />
    </main>
  );
}
