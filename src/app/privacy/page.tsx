import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import PrivacyContent from "@/components/legal/PrivacyContent";

export const metadata: Metadata = {
  title: "Chính sách bảo mật - LITE Space",
  description:
    "Chính sách bảo mật và quyền riêng tư của LITE Space. Tìm hiểu cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.",
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <PrivacyContent />
      <Footer />
      <Chatbot />
    </main>
  );
}
