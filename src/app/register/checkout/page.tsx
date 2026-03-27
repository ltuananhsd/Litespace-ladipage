import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import CheckoutContent from "@/components/register/CheckoutContent";

export const metadata: Metadata = {
  title: "Thanh toán - LITE Space | Văn phòng ảo chuyên nghiệp",
  description:
    "Xác nhận thông tin và thanh toán đăng ký dịch vụ văn phòng ảo tại LITE Space.",
};

export default function CheckoutPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <CheckoutContent />
      <Footer />
      <Chatbot />
    </main>
  );
}
