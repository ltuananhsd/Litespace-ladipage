import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: {
    template: "%s | Đăng ký - LITE Space",
    default: "Đăng ký dịch vụ - LITE Space",
  },
  description:
    "Đăng ký dịch vụ văn phòng ảo tại LITE Space. Chỉ 10 bước đơn giản để sở hữu văn phòng chuyên nghiệp.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      {/* Nội dung chính — mỗi page con sẽ tự tích hợp StepProgress + RegisterSidebar */}
      <div className="min-h-screen pt-24 pb-32">
        {children}
      </div>
      <Footer />
      <Chatbot />
    </main>
  );
}
