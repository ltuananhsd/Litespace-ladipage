import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import FaqContent from "@/components/faq/FaqContent";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp (FAQ) - LITE Space",
  description:
    "Giải đáp mọi thắc mắc về dịch vụ văn phòng ảo tại LITE Space: đăng ký, thanh toán, pháp lý, kế toán và hỗ trợ.",
};

export default function FaqPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <FaqContent />
      <Footer />
      <Chatbot />
    </main>
  );
}
