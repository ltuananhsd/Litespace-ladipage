import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import BlogListContent from "@/components/blog/BlogListContent";

export const metadata: Metadata = {
  title: "Blog - LITE Space | Kiến thức văn phòng ảo & Khởi nghiệp",
  description:
    "Chia sẻ kiến thức về văn phòng ảo, đăng ký kinh doanh, kế toán thuế và xu hướng khởi nghiệp mới nhất.",
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <BlogListContent />
      <Footer />
      <Chatbot />
    </main>
  );
}
