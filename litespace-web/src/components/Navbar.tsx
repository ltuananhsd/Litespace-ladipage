"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl glass-morphism rounded-full px-8 py-3 flex justify-between items-center shadow-xl"
    >
      <div className="text-xl font-black text-primary tracking-tighter font-headline">
        LITE Space
      </div>
      <div className="hidden md:flex items-center gap-8 font-medium text-sm">
        <Link
          className="text-on-surface-variant hover:text-primary transition-colors"
          href="#narrative"
        >
          Về chúng tôi
        </Link>
        <Link
          className="text-on-surface-variant hover:text-primary transition-colors"
          href="#pricing-carousel"
        >
          Bảng giá
        </Link>
        <Link
          className="text-on-surface-variant hover:text-primary transition-colors"
          href="#contact"
        >
          Liên hệ
        </Link>
      </div>
      <button className="bg-primary text-on-primary px-5 py-2 rounded-full font-bold text-xs hover:scale-105 transition-transform">
        Đăng ký ngay
      </button>
    </motion.nav>
  );
}
