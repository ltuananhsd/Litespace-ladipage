import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import SuccessContent from "@/components/register/SuccessContent";

export const metadata: Metadata = {
  title: "Đăng ký thành công - LITE Space",
  description:
    "Chúc mừng! Bạn đã đăng ký dịch vụ văn phòng ảo tại LITE Space thành công.",
};

export default function SuccessPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <SuccessContent />
      <Footer />
      <Chatbot />
    </main>
  );
}
