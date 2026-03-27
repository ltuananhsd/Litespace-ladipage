"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingSection() {
  return (
    <section className="py-32 bg-transparent" id="pricing-carousel">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-center">Gói dịch vụ linh hoạt</h2>
          <p className="text-on-surface-variant text-center text-lg">Cuộn ngang để so sánh các đặc quyền dành riêng cho bạn</p>
        </motion.div>
        
        <div className="flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto lg:overflow-visible pt-8 pb-12 lg:pb-16 items-stretch snap-x snap-mandatory lg:snap-none hide-scrollbar">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="snap-center shrink-0 w-[85vw] md:w-[350px] lg:w-auto flex flex-col bg-white p-10 rounded-3xl shadow-lg border border-outline-variant/10"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="text-5xl font-black text-primary">590.000đ</span>
                <span className="text-on-surface-variant font-bold">/tháng</span>
              </div>
            </div>
            <ul className="space-y-5 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-sm font-medium"><span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Địa chỉ kinh doanh hợp pháp</li>
              <li className="flex items-center gap-3 text-sm font-medium"><span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Tuân thủ pháp lý doanh nghiệp</li>
              <li className="flex items-center gap-3 text-sm font-medium"><span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Tiếp nhận thư từ, bưu phẩm</li>
              <li className="flex items-center gap-3 text-sm font-medium opacity-50"><span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Scan thư (có phí)</li>
              <li className="flex items-center gap-3 text-sm font-medium"><span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Danh thiếp tiêu chuẩn</li>
            </ul>
            <Link href="/register?plan=basic" className="block w-full mt-auto py-4 rounded-full font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all text-center">Chọn Basic</Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="snap-center shrink-0 w-[85vw] md:w-[420px] lg:w-auto flex flex-col bg-primary p-10 lg:p-12 rounded-3xl shadow-2xl relative lg:scale-105 z-10"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ffc107] text-slate-900 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap shadow-md">Dễ Chọn Nhất</div>
            <div className="mb-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Upgrade</h3>
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="text-5xl lg:text-6xl font-black">1.090.000đ</span>
                <span className="opacity-80">/tháng</span>
              </div>
            </div>
            <ul className="flex flex-col gap-5 mb-10 text-white flex-grow">
              <li className="flex items-center gap-3 text-sm font-bold"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Tất cả tính năng Basic</li>
              <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Scan & Chuyển tiếp thư miễn phí</li>
              <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Hỗ trợ mở TK Ngân hàng (3 lần)</li>
              <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Hỗ trợ đăng ký kinh doanh</li>
              <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> 3 tháng Kế toán miễn phí</li>
              <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Thay đổi GPKD (2 lần/năm)</li>
            </ul>
            <Link href="/register?plan=upgrade" className="block w-full mt-auto py-5 rounded-full font-bold bg-white text-primary border-2 border-slate-900 hover:scale-[1.02] transition-transform shadow-xl text-center">Bắt đầu ngay</Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="snap-center shrink-0 w-[85vw] md:w-[350px] lg:w-auto flex flex-col bg-white p-10 rounded-3xl shadow-lg border border-outline-variant/10"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="text-5xl font-black text-primary">1.190.000đ</span>
                <span className="text-on-surface-variant font-bold">/tháng</span>
              </div>
            </div>
            <ul className="space-y-5 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-sm font-bold"><span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Tất cả đặc quyền Upgrade</li>
              <li className="flex items-center gap-3 text-sm font-medium"><span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Ưu tiên mở 5 TK Ngân hàng</li>
              <li className="flex items-center gap-3 text-sm font-medium"><span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Miễn phí 01 bộ Logo chuyên nghiệp</li>
              <li className="flex items-center gap-3 text-sm font-medium"><span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Miễn phí thiết kế Landing Page</li>
              <li className="flex items-center gap-3 text-sm font-medium"><span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Tư vấn pháp lý 24/7</li>
            </ul>
            <Link href="/register?plan=premium" className="block w-full mt-auto py-4 rounded-full font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all text-center">Chọn Premium</Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
