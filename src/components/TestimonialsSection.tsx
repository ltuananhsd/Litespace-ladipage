"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-transparent overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-5 -z-0">
        <span className="material-symbols-outlined text-[400px] text-primary select-none">format_quote</span>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-headline text-3xl md:text-4xl font-extrabold text-center mb-16"
        >
          Khách hàng nói về chúng tôi
        </motion.h2>

        <div className="flex flex-col gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-8 md:w-[70%]"
          >
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-[3rem] overflow-hidden shadow-2xl rotate-3 shrink-0">
              <Image 
                alt="Nguyễn Minh Quân" 
                className="object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNIs5toSJjupNOAyzB-JyEOPScRiyFWivE0nPaj0V14Ze4s-W35Ui96XvH9rG_tMElhtlF-egsFGN5geS5ibvEFl4ZkS7ZMThCD_4gYoyLY-dpFK79qy7oumGUCT5pSD-EOCVoGsIwNcjxWyc_aV5_qC7tObPIruIAsY5CFs6PrK6Vh4IUMecfEiXOJfuhtlRMoMI2fIfYKfuCFCuQVJMquSMG0kzBhqh70Um66CqTkVNt039_O-1z-BBNxd_-8pLWXsletKBXRdI"
                fill
              />
            </div>
            <div className="glass-morphism p-6 md:p-8 rounded-[2.5rem] shadow-xl relative">
              <p className="text-lg md:text-xl font-medium italic leading-relaxed text-on-surface mb-6">"Dịch vụ tại LITE Space cực kỳ chuyên nghiệp. Việc xử lý thư tín nhanh gọn giúp tôi tiết kiệm rất nhiều thời gian để tập trung phát triển sản phẩm."</p>
              <div>
                <h4 className="font-bold text-lg">Nguyễn Minh Quân</h4>
                <p className="text-sm text-primary font-black uppercase tracking-widest">Founder, TechWave Solutions</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row-reverse items-center gap-8 md:w-[70%] md:ml-auto"
          >
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-[3rem] overflow-hidden shadow-2xl -rotate-3 shrink-0">
              <Image 
                alt="Lê Phương Thảo" 
                className="object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuQoMW-Le-t2tYhfgxKL8Fnsh37xIhfe-M9k2tXk2DxnTug0iihho-b0AaAV18eXBCRN3vi-C3vTHepMuez1jE0YgvY083G06ehfLVbX6PFD64dmyUfNfXHVBnOUC2A4wdDovqRrXTk_hIh0Gl6CrdGHCSUCSldxaxRbfMm_i-TYgjrIs-isWrM-aOY9cGyjOrb0Wpja7PQZS_PQZ3y2OzzoXQJCzkTIlPNYlSV91UmQHSvynYvBwgwt8nttmLuNaGRDn59bfuVhw"
                fill
              />
            </div>
            <div className="glass-morphism p-6 md:p-8 rounded-[2.5rem] shadow-xl relative">
              <p className="text-lg md:text-xl font-medium italic leading-relaxed text-on-surface mb-6">"Địa chỉ văn phòng tại đây rất uy tín, khách hàng của tôi luôn ấn tượng khi đến làm việc. Chi phí vô cùng hợp lý cho Startup."</p>
              <div>
                <h4 className="font-bold text-lg">Lê Phương Thảo</h4>
                <p className="text-sm text-primary font-black uppercase tracking-widest">CEO, Bloom Marketing</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-8 md:w-[70%]"
          >
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-[3rem] overflow-hidden shadow-2xl rotate-6 shrink-0">
              <Image 
                alt="Trần Văn Hùng" 
                className="object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9pvs7xZvJgh4Njy4AnmWYxZbQe4bJSoUuHSp9WWV707Vudk-TOVc3A7Dr6z2nBo5dTk2GDgT_eLQMhKkZ488y5ShUeNcY5aFsLxHfmgXD7K7Diek_kFcwfYZHQ1-SkpRt7KtD41kQWeAo-0cdEPqRNSpv4ze6wD-cRDLNyyfIkpn4RHVIQa_Hp4f5KgMyAaL3KIF01y4Nyc-52sIPh2xxhosTAi3_kTJFfZ0NUHQNmo2yNy3hLL9M8NrGnTMmVTDT6tBrZx6Xjc0"
                fill
              />
            </div>
            <div className="glass-morphism p-6 md:p-8 rounded-[2.5rem] shadow-xl relative">
              <p className="text-lg md:text-xl font-medium italic leading-relaxed text-on-surface mb-6">"Sự hỗ trợ nhiệt tình về mặt pháp lý và mở tài khoản ngân hàng của LITE Space là điều tôi đánh giá cao nhất."</p>
              <div>
                <h4 className="font-bold text-lg">Trần Văn Hùng</h4>
                <p className="text-sm text-primary font-black uppercase tracking-widest">Giám đốc, Logistics Việt</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
