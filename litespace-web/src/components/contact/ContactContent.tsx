"use client";

import { motion } from "framer-motion";

// Thông tin liên hệ
const contactInfo = [
  {
    icon: "location_on",
    title: "Địa chỉ văn phòng",
    details: ["Tầng 8, Tòa nhà ABC Tower", "123 Nguyễn Huệ, Quận 1", "TP. Hồ Chí Minh"],
  },
  {
    icon: "call",
    title: "Điện thoại",
    details: ["Hotline: 1900 xxxx", "Tư vấn: 028 xxxx xxxx", "Zalo: 090x xxx xxx"],
  },
  {
    icon: "mail",
    title: "Email",
    details: ["info@litespace.vn", "support@litespace.vn"],
  },
  {
    icon: "schedule",
    title: "Giờ làm việc",
    details: ["Thứ 2 - Thứ 6: 8:00 - 18:00", "Thứ 7: 8:00 - 12:00", "Chủ nhật: Nghỉ"],
  },
];

// Hiệu ứng animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactContent() {
  return (
    <>
      {/* === HERO SECTION === */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Hiệu ứng nền */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
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
                contact_support
              </span>
              Liên hệ
            </div>
            <h1 className="font-headline text-4xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight mb-6">
              Chúng tôi luôn{" "}
              <span className="text-primary">sẵn sàng hỗ trợ</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Đội ngũ tư vấn chuyên nghiệp sẽ phản hồi trong vòng 15 phút. Hãy
              chọn cách liên hệ phù hợp nhất với bạn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === THÔNG TIN LIÊN HỆ (4 cards) === */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group bg-white p-7 rounded-3xl shadow-lg border border-outline-variant/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                  <span
                    className="material-symbols-outlined text-primary text-3xl group-hover:text-white transition-colors"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <div className="space-y-1">
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-sm text-on-surface-variant leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === FORM LIÊN HỆ + BẢN ĐỒ === */}
      <section className="py-24 bg-sky-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form liên hệ */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-outline-variant/10"
            >
              <h2 className="font-headline text-2xl md:text-3xl font-extrabold mb-2">
                Gửi yêu cầu tư vấn
              </h2>
              <p className="text-on-surface-variant mb-8">
                Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong 15 phút.
              </p>

              <form className="space-y-6">
                {/* Họ tên + SĐT */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                      Họ và tên <span className="text-error">*</span>
                    </label>
                    <input
                      className="w-full px-5 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                      placeholder="Ví dụ: Nguyễn Văn A"
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                      Số điện thoại <span className="text-error">*</span>
                    </label>
                    <input
                      className="w-full px-5 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                      placeholder="090x xxx xxx"
                      type="tel"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                    Email
                  </label>
                  <input
                    className="w-full px-5 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                    placeholder="email@congty.com"
                    type="email"
                  />
                </div>

                {/* Chọn gói quan tâm */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                    Gói dịch vụ quan tâm
                  </label>
                  <select className="w-full px-5 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm text-on-surface appearance-none cursor-pointer">
                    <option value="">-- Chọn gói dịch vụ --</option>
                    <option value="basic">Basic — 590.000đ/tháng</option>
                    <option value="upgrade">Upgrade — 1.090.000đ/tháng</option>
                    <option value="premium">Premium — 1.190.000đ/tháng</option>
                    <option value="other">Tư vấn thêm</option>
                  </select>
                </div>

                {/* Ghi chú */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface/60 uppercase tracking-widest ml-1">
                    Nội dung cần tư vấn
                  </label>
                  <textarea
                    className="w-full px-5 py-4 rounded-2xl bg-surface border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm resize-none"
                    placeholder="Mô tả nhu cầu của bạn để chúng tôi tư vấn phù hợp nhất..."
                    rows={4}
                  />
                </div>

                {/* Nút gửi */}
                <button
                  type="button"
                  className="w-full py-5 rounded-full bg-primary text-on-primary font-bold text-lg shadow-xl shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-transform"
                >
                  Gửi yêu cầu tư vấn
                </button>

                <p className="text-xs text-center text-on-surface-variant">
                  Bằng việc gửi form, bạn đồng ý với{" "}
                  <a href="/privacy" className="text-primary font-bold hover:underline">
                    Chính sách bảo mật
                  </a>{" "}
                  của chúng tôi.
                </p>
              </form>
            </motion.div>

            {/* Bản đồ + Liên kết nhanh */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {/* Bản đồ Google Maps */}
              <div className="w-full h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4450570037!2d106.70141!3d10.77639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670b841c7%3A0xb537a82e73e6e7b3!2zMTIzIE5ndXnhu4VuIEh14buHLCBC4bq_biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ LITE Space"
                />
              </div>

              {/* Các kênh liên hệ nhanh */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-outline-variant/10">
                <h3 className="font-bold text-xl mb-6">Kết nối nhanh</h3>
                <div className="space-y-4">
                  {/* Zalo */}
                  <a
                    href="https://zalo.me/0901234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#0068FF]/5 hover:bg-[#0068FF]/10 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[#0068FF] rounded-xl flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-white text-2xl">chat</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface group-hover:text-[#0068FF] transition-colors">
                        Nhắn tin Zalo
                      </p>
                      <p className="text-xs text-on-surface-variant">Phản hồi trong 5 phút</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant ml-auto">
                      arrow_forward
                    </span>
                  </a>

                  {/* Gọi điện */}
                  <a
                    href="tel:19001234"
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                      <span
                        className="material-symbols-outlined text-white text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        call
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface group-hover:text-green-600 transition-colors">
                        Gọi Hotline 1900 xxxx
                      </p>
                      <p className="text-xs text-on-surface-variant">Miễn phí cuộc gọi</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant ml-auto">
                      arrow_forward
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@litespace.vn"
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                      <span
                        className="material-symbols-outlined text-white text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        mail
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface group-hover:text-primary transition-colors">
                        Gửi Email
                      </p>
                      <p className="text-xs text-on-surface-variant">info@litespace.vn</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant ml-auto">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === CTA CUỐI TRANG === */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary p-12 md:p-16 rounded-[3rem] shadow-2xl"
          >
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-4">
              Bạn đã sẵn sàng?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
              Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt dành cho khách hàng
              mới.
            </p>
            <a
              href="/register"
              className="inline-block bg-white text-primary px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Đăng ký dùng thử
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
