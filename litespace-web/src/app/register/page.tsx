import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import RegisterContent from "@/components/register/RegisterContent";

export const metadata: Metadata = {
  title: "Đăng ký dịch vụ - LITE Space | Văn phòng ảo chuyên nghiệp",
  description:
    "Đăng ký dịch vụ văn phòng ảo tại LITE Space. Chọn gói phù hợp và bắt đầu ngay hôm nay.",
};

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <RegisterContent />
      <Footer />
      <Chatbot />
    </main>
  );
}
