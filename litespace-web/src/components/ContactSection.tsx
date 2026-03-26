"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden" id="contact">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white blur-[150px] rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] shadow-2xl"
        >
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Sẵn sàng nâng tầm <br className="hidden md:block" /> doanh nghiệp?
            </h2>
            <p className="text-on-surface-variant text-lg">Để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ tư vấn trong 15 phút.</p>
          </div>
          <form className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-black text-on-surface/60 uppercase tracking-widest ml-1">Họ và tên</label>
              <input className="w-full px-6 py-4 rounded-2xl bg-surface border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Ví dụ: Nguyễn Văn A" type="text" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-black text-on-surface/60 uppercase tracking-widest ml-1">Số điện thoại</label>
              <input className="w-full px-6 py-4 rounded-2xl bg-surface border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="090x xxx xxx" type="tel" />
            </div>
            <div className="md:col-span-2 space-y-3">
              <label className="text-sm font-black text-on-surface/60 uppercase tracking-widest ml-1">Email</label>
              <input className="w-full px-6 py-4 rounded-2xl bg-surface border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="email@congty.com" type="email" />
            </div>
            <div className="md:col-span-2 space-y-3">
              <label className="text-sm font-black text-on-surface/60 uppercase tracking-widest ml-1">Ghi chú thêm</label>
              <textarea className="w-full px-6 py-4 rounded-2xl bg-surface border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Bạn cần tư vấn về gói dịch vụ nào?" rows={3}></textarea>
            </div>
            <div className="md:col-span-2 pt-6">
              <button className="w-full py-6 rounded-full bg-primary text-on-primary font-bold text-2xl shadow-xl shadow-primary/30 hover:scale-[1.01] transition-transform" type="button">
                Gửi yêu cầu ngay
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
