"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="narrative" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.jsdelivr.net/gh/ltuananhsd/video@main/make_it_live_202603270115.mp4" type="video/mp4" />
        </video>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 text-center max-w-4xl px-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-8">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          Giải pháp văn phòng 4.0
        </div>
        <h1 className="font-headline text-5xl md:text-8xl font-extrabold text-white leading-[1.1] tracking-tight mb-8">
          Văn phòng ảo <span className="text-primary-container">chuyên nghiệp</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
          Tiết kiệm chi phí – Vận hành linh hoạt – Địa chỉ uy tín. Khởi tạo sự nghiệp vững chắc cùng LITE Space.
        </p>
        <div className="mt-12 flex justify-center gap-4">
          <Link href="/register" className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all">
            Đăng ký ngay
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
