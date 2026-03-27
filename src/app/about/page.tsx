import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "Giới thiệu - LITE Space | Văn phòng ảo chuyên nghiệp",
  description:
    "Tìm hiểu câu chuyện thương hiệu, tầm nhìn, sứ mệnh và đội ngũ đằng sau LITE Space — giải pháp văn phòng ảo hàng đầu Việt Nam.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <AboutContent />
      <Footer />
      <Chatbot />
    </main>
  );
}
