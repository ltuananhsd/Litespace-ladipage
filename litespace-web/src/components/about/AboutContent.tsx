"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Hiệu ứng xuất hiện tuần tự cho các phần tử con
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Dữ liệu các giá trị cốt lõi
const coreValues = [
  {
    icon: "verified",
    title: "Uy tín",
    description: "Hơn 500 doanh nghiệp đã tin tưởng và đồng hành cùng chúng tôi.",
  },
  {
    icon: "speed",
    title: "Nhanh chóng",
    description: "Thiết lập văn phòng ảo chỉ trong 24 giờ, không cần thủ tục phức tạp.",
  },
  {
    icon: "support_agent",
    title: "Tận tâm",
    description: "Đội ngũ chăm sóc khách hàng chuyên nghiệp, hỗ trợ 24/7.",
  },
  {
    icon: "eco",
    title: "Bền vững",
    description: "Giải pháp thân thiện môi trường, giảm thiểu dấu chân carbon doanh nghiệp.",
  },
];

// Dữ liệu thành tựu nổi bật
const milestones = [
  { number: "500+", label: "Doanh nghiệp" },
  { number: "5+", label: "Năm hoạt động" },
  { number: "98%", label: "Hài lòng" },
  { number: "24/7", label: "Hỗ trợ" },
];

// Dữ liệu đội ngũ
const teamMembers = [
  {
    name: "Nguyễn Hoàng Nam",
    role: "Founder & CEO",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNIs5toSJjupNOAyzB-JyEOPScRiyFWivE0nPaj0V14Ze4s-W35Ui96XvH9rG_tMElhtlF-egsFGN5geS5ibvEFl4ZkS7ZMThCD_4gYoyLY-dpFK79qy7oumGUCT5pSD-EOCVoGsIwNcjxWyc_aV5_qC7tObPIruIAsY5CFs6PrK6Vh4IUMecfEiXOJfuhtlRMoMI2fIfYKfuCFCuQVJMquSMG0kzBhqh70Um66CqTkVNt039_O-1z-BBNxd_-8pLWXsletKBXRdI",
    quote: "Xây dựng không gian làm việc linh hoạt cho tương lai.",
  },
  {
    name: "Trần Minh Anh",
    role: "COO",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuQoMW-Le-t2tYhfgxKL8Fnsh37xIhfe-M9k2tXk2DxnTug0iihho-b0AaAV18eXBCRN3vi-C3vTHepMuez1jE0YgvY083G06ehfLVbX6PFD64dmyUfNfXHVBnOUC2A4wdDovqRrXTk_hIh0Gl6CrdGHCSUCSldxaxRbfMm_i-TYgjrIs-isWrM-aOY9cGyjOrb0Wpja7PQZS_PQZ3y2OzzoXQJCzkTIlPNYlSV91UmQHSvynYvBwgwt8nttmLuNaGRDn59bfuVhw",
    quote: "Vận hành luôn hướng đến sự hoàn hảo trong từng chi tiết.",
  },
  {
    name: "Phạm Thanh Tùng",
    role: "CTO",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9pvs7xZvJgh4Njy4AnmWYxZbQe4bJSoUuHSp9WWV707Vudk-TOVc3A7Dr6z2nBo5dTk2GDgT_eLQMhKkZ488y5ShUeNcY5aFsLxHfmgXD7K7Diek_kFcwfYZHQ1-SkpRt7KtD41kQWeAo-0cdEPqRNSpv4ze6wD-cRDLNyyfIkpn4RHVIQa_Hp4f5KgMyAaL3KIF01y4Nyc-52sIPh2xxhosTAi3_kTJFfZ0NUHQNmo2yNy3hLL9M8NrGnTMmVTDT6tBrZx6Xjc0",
    quote: "Công nghệ là nền tảng để mang đến trải nghiệm vượt trội.",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* === HERO SECTION === */}
      <section className="relative pt-40 pb-28 overflow-hidden">
        {/* Hiệu ứng nền gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-8">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                apartment
              </span>
              Về LITE Space
            </div>
            <h1 className="font-headline text-4xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight mb-6">
              Kiến tạo không gian{" "}
              <span className="text-primary">làm việc tương lai</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              LITE Space ra đời với sứ mệnh giúp mọi doanh nghiệp — từ Startup
              đến SME — sở hữu địa chỉ kinh doanh uy tín với chi phí tối ưu
              nhất.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === CÂU CHUYỆN THƯƠNG HIỆU === */}
      <section className="py-24 bg-sky-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Hình ảnh */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative w-full h-[420px] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  alt="Không gian làm việc LITE Space"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmq887yKk9z2HosWjGY3pUExNqWLoDyfR7lWNa4FT_d75vgwjZHsQFuBL3jfbuq0DV2JkCGAcwCYhkfEOo0ZJmBTf34pXeFnOHN3vOfKESXqICfXeXVH9QqxAO_dqf299v18PMS_rwwanH71NIM7ftbYEDmpQ3mwMgF6X0ORwig_nNpSMxAEiiPtL9zM1N3xiLXqNUy_s7mA1Xw2-yC5jHgW58qS052Tat31NegZwwSQ6sYo6mHOmrpeJhihi8RNwskUJ_zPwYTn4"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Badge nổi */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-6 -right-4 md:-right-8 bg-white px-6 py-4 rounded-2xl shadow-xl border border-primary/10"
              >
                <p className="text-3xl font-black text-primary">2019</p>
                <p className="text-xs font-bold text-on-surface-variant">Năm thành lập</p>
              </motion.div>
            </motion.div>

            {/* Nội dung câu chuyện */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight">
                Câu chuyện của chúng tôi
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Ra đời từ năm 2019, LITE Space bắt đầu với một ý tưởng đơn giản
                nhưng đầy táo bạo: <strong className="text-on-surface">tại sao doanh nghiệp lại phải chi hàng
                chục triệu đồng mỗi tháng cho một văn phòng?</strong>
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Chúng tôi tin rằng trong thời đại số, địa chỉ kinh doanh uy tín
                không nhất thiết phải đi kèm chi phí khổng lồ. LITE Space cung
                cấp giải pháp văn phòng ảo toàn diện, giúp doanh nghiệp tập
                trung nguồn lực vào phát triển sản phẩm và dịch vụ.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Trải qua hơn 5 năm hoạt động, chúng tôi tự hào đồng hành cùng
                hơn <strong className="text-on-surface">500+ doanh nghiệp</strong> trên khắp Việt Nam.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === GIÁ TRỊ CỐT LÕI === */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              Những nguyên tắc định hình mọi quyết định và hành động của chúng
              tôi.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {coreValues.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="group bg-white p-8 rounded-3xl shadow-lg border border-outline-variant/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span
                    className="material-symbols-outlined text-primary text-3xl group-hover:text-white transition-colors"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {value.icon}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === THÀNH TỰU NỔI BẬT === */}
      <section className="py-20 bg-primary">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {milestones.map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className="text-center text-white"
              >
                <p className="text-5xl md:text-6xl font-black mb-2">{item.number}</p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === ĐỘI NGŨ === */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Đội ngũ lãnh đạo
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              Những con người tâm huyết đứng đằng sau thành công của LITE Space.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="group bg-white rounded-3xl shadow-lg border border-outline-variant/10 overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    alt={member.name}
                    src={member.avatar}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white">
                    <h3 className="font-bold text-xl">{member.name}</h3>
                    <p className="text-sm font-medium opacity-90">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-on-surface-variant italic text-sm leading-relaxed">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === TẦM NHÌN & SỨ MỆNH === */}
      <section className="py-28 bg-sky-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Tầm nhìn */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-primary/10"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  visibility
                </span>
              </div>
              <h3 className="font-headline text-2xl md:text-3xl font-extrabold mb-4">
                Tầm nhìn
              </h3>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Trở thành nền tảng văn phòng ảo hàng đầu Đông Nam Á, nơi mọi
                doanh nghiệp đều có thể khởi nghiệp và phát triển mà không bị
                giới hạn bởi chi phí mặt bằng.
              </p>
            </motion.div>

            {/* Sứ mệnh */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-primary/10"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <span
                  className="material-symbols-outlined text-secondary text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  rocket_launch
                </span>
              </div>
              <h3 className="font-headline text-2xl md:text-3xl font-extrabold mb-4">
                Sứ mệnh
              </h3>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Cung cấp giải pháp văn phòng ảo toàn diện, hỗ trợ doanh nghiệp
                vận hành linh hoạt, tuân thủ pháp lý và xây dựng hình ảnh
                chuyên nghiệp với chi phí chỉ bằng 10% thuê văn phòng truyền
                thống.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === CTA CUỐI TRANG === */}
      <section className="py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="text-on-surface-variant text-lg mb-10">
              Hãy để LITE Space đồng hành cùng bạn trên hành trình xây dựng
              doanh nghiệp thành công.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-transform inline-block"
              >
                Đăng ký ngay
              </a>
              <a
                href="/#contact"
                className="border-2 border-primary text-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all inline-block"
              >
                Liên hệ tư vấn
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
