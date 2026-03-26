"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-screen py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight">Tại sao chọn LITE Space?</h2>
            <p className="text-on-surface-variant text-xl mt-4">Tối ưu hóa nguồn lực để tập trung vào giá trị cốt lõi.</p>
          </motion.div>

          {/* Desktop Mode Feature Grid */}
          <motion.div 
            className="w-full hidden md:grid grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Column 1 */}
            <div className="space-y-6 pt-12">
              <motion.div variants={itemVariants} className="glass-morphism p-8 rounded-3xl shadow-xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-4xl mb-4 text-glow">location_on</span>
                <h3 className="font-bold text-lg mb-2">Địa chỉ uy tín</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Vị trí đắc địa tại trung tâm thành phố giúp nâng tầm hình ảnh thương hiệu.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="glass-morphism p-8 rounded-3xl shadow-xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-4xl mb-4 text-glow">mark_as_unread</span>
                <h3 className="font-bold text-lg mb-2">Xử lý thư tín</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Nhận và thông báo thư từ, bưu phẩm ngay lập tức qua App/Email.</p>
              </motion.div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="glass-morphism p-8 rounded-3xl shadow-xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-4xl mb-4 text-glow">support_agent</span>
                <h3 className="font-bold text-lg mb-2">Lễ tân chuyên nghiệp</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Đội ngũ lễ tân được đào tạo bài bản, đón tiếp khách hàng chu đáo.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="glass-morphism p-8 rounded-3xl shadow-xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-4xl mb-4 text-glow">savings</span>
                <h3 className="font-bold text-lg mb-2">Tiết kiệm 90%</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Giảm tối đa chi phí vận hành so với thuê văn phòng truyền thống.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile Mode Feature Grid */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10">
              <h3 className="font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary">location_on</span> Địa chỉ uy tín</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10">
              <h3 className="font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary">support_agent</span> Lễ tân chuyên nghiệp</h3>
            </div>
          </div>
        </div>

        <motion.div 
          className="relative group"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full h-[600px] rounded-[4rem] overflow-hidden shadow-2xl">
            <Image
              alt="Office Lifestyle"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmq887yKk9z2HosWjGY3pUExNqWLoDyfR7lWNa4FT_d75vgwjZHsQFuBL3jfbuq0DV2JkCGAcwCYhkfEOo0ZJmBTf34pXeFnOHN3vOfKESXqICfXeXVH9QqxAO_dqf299v18PMS_rwwanH71NIM7ftbYEDmpQ3mwMgF6X0ORwig_nNpSMxAEiiPtL9zM1N3xiLXqNUy_s7mA1Xw2-yC5jHgW58qS052Tat31NegZwwSQ6sYo6mHOmrpeJhihi8RNwskUJ_zPwYTn4"
              fill
            />
          </div>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl border border-primary/10 max-w-xs"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-tertiary rounded-full animate-pulse"></div>
              <span className="text-sm font-bold">Trạng thái trực tuyến</span>
            </div>
            <p className="text-sm font-bold text-on-surface">500+ Doanh nghiệp đã tham gia hệ sinh thái của chúng tôi</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
