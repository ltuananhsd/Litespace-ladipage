"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function CTABanner({
  title,
  description,
  primaryButtonText = "Đăng ký ngay",
  primaryButtonHref = "/register",
  secondaryButtonText = "Liên hệ tư vấn",
  secondaryButtonHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-primary text-on-primary py-16 px-6 md:px-12 text-center shadow-2xl"
        >
          {/* Background decoration elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-black font-headline tracking-tight leading-tight">
              {title}
            </h2>
            
            <p className="text-lg md:text-xl text-on-primary/80 max-w-2xl mx-auto">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href={primaryButtonHref}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                {primaryButtonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={secondaryButtonHref}
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg text-white border-2 border-white/30 hover:bg-white/10 transition-colors"
              >
                {secondaryButtonText}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
