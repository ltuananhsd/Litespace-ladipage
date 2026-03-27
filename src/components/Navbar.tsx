"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Danh sách các link điều hướng chính
const navLinks = [
  { href: "/services", label: "Dịch vụ" },
  { href: "/pricing", label: "Bảng giá" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Theo dõi scroll để thay đổi style navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Đóng menu mobile khi thay đổi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Khóa cuộn trang khi menu mobile đang mở
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl rounded-full px-8 py-3 flex justify-between items-center shadow-xl transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-2xl"
            : "glass-morphism"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black text-primary tracking-tighter font-headline"
        >
          LITE Space
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="text-on-surface-variant hover:text-primary transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Nút CTA desktop */}
        <Link
          href="/register"
          className="hidden md:block bg-primary text-on-primary px-5 py-2 rounded-full font-bold text-xs hover:scale-105 transition-transform"
        >
          Đăng ký ngay
        </Link>

        {/* Nút hamburger cho mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-surface transition-colors relative z-[110]"
          aria-label="Mở menu điều hướng"
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-on-surface rounded-full mb-1"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            className="block w-5 h-[2px] bg-on-surface rounded-full mb-1"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-on-surface rounded-full"
          />
        </button>
      </motion.nav>

      {/* Menu mobile dạng fullscreen overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Lớp phủ tối phía sau */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            />

            {/* Nội dung menu mobile */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-[95] w-[90%] max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-outline-variant/20 p-8"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl text-on-surface font-semibold text-lg hover:bg-primary/5 hover:text-primary transition-all"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Nút CTA trong menu mobile */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6 pt-6 border-t border-outline-variant/20"
              >
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-primary text-on-primary px-6 py-4 rounded-full font-bold text-base shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                >
                  Đăng ký ngay
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
