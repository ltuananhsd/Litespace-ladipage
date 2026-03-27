import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Liên hệ - LITE Space | Văn phòng ảo chuyên nghiệp",
  description:
    "Liên hệ LITE Space để được tư vấn miễn phí về dịch vụ văn phòng ảo. Địa chỉ, số điện thoại, email và form liên hệ trực tiếp.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <ContactContent />
      <Footer />
      <Chatbot />
    </main>
  );
}
