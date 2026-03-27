import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import TermsContent from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "Điều khoản dịch vụ - LITE Space",
  description:
    "Điều khoản và điều kiện sử dụng dịch vụ văn phòng ảo của LITE Space. Vui lòng đọc kỹ trước khi đăng ký.",
};

export default function TermsPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <TermsContent />
      <Footer />
      <Chatbot />
    </main>
  );
}
