"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Dịch vụ chính
const mainServices = [
  {
    icon: "location_on",
    title: "Địa chỉ kinh doanh",
    description:
      "Sở hữu địa chỉ doanh nghiệp uy tín tại trung tâm TP.HCM. Hợp pháp để đăng ký giấy phép kinh doanh, in danh thiếp, và nhận thư từ.",
    features: [
      "Địa chỉ trung tâm Quận 1, TP.HCM",
      "Hợp pháp đăng ký GPKD",
      "In trên danh thiếp, hóa đơn, hợp đồng",
      "Nhận thư từ, bưu phẩm tại địa chỉ",
    ],
    color: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    icon: "support_agent",
    title: "Lễ tân chuyên nghiệp",
    description:
      "Đội ngũ lễ tân chuyên nghiệp tiếp đón khách hàng, đối tác, trả lời điện thoại nhân danh công ty của bạn.",
    features: [
      "Tiếp đón khách thay mặt doanh nghiệp",
      "Trả lời điện thoại nhân danh công ty",
      "Thông báo lịch hẹn qua Zalo/SMS",
      "Hình ảnh chuyên nghiệp cho thương hiệu",
    ],
    color: "bg-purple-500/10",
    iconColor: "text-purple-600",
  },
  {
    icon: "mail",
    title: "Xử lý thư tín",
    description:
      "Tiếp nhận, phân loại, thông báo và chuyển tiếp thư từ, bưu phẩm. Scan thư gửi qua email để bạn nhận ở bất kỳ đâu.",
    features: [
      "Tiếp nhận thư từ, bưu phẩm hàng ngày",
      "Thông báo ngay khi có thư mới",
      "Scan & gửi qua email (gói Upgrade+)",
      "Chuyển tiếp bưu phẩm theo yêu cầu",
    ],
    color: "bg-green-500/10",
    iconColor: "text-green-600",
  },
  {
    icon: "gavel",
    title: "Hỗ trợ pháp lý",
    description:
      "Hỗ trợ đầy đủ thủ tục pháp lý: đăng ký kinh doanh, thay đổi giấy phép, mở tài khoản ngân hàng doanh nghiệp.",
    features: [
      "Đăng ký giấy phép kinh doanh mới",
      "Thay đổi nội dung GPKD",
      "Hỗ trợ mở tài khoản ngân hàng DN",
      "Tư vấn pháp lý doanh nghiệp",
    ],
    color: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    icon: "calculate",
    title: "Kế toán thuế",
    description:
      "Dịch vụ kế toán và khai báo thuế doanh nghiệp. Giúp bạn yên tâm tập trung vào kinh doanh cốt lõi.",
    features: [
      "Báo cáo thuế hàng quý",
      "Sổ sách kế toán theo quy định",
      "Tư vấn thuế doanh nghiệp",
      "3 tháng miễn phí (gói Upgrade+)",
    ],
    color: "bg-red-500/10",
    iconColor: "text-red-600",
  },
  {
    icon: "palette",
    title: "Thiết kế thương hiệu",
    description:
      "Thiết kế logo chuyên nghiệp và landing page cho doanh nghiệp mới khởi nghiệp. Nâng tầm hình ảnh thương hiệu ngay từ ngày đầu.",
    features: [
      "Thiết kế logo chuyên nghiệp",
      "Landing page giới thiệu doanh nghiệp",
      "Bộ nhận dạng thương hiệu cơ bản",
      "Miễn phí với gói Premium",
    ],
    color: "bg-pink-500/10",
    iconColor: "text-pink-600",
  },
];

// Lợi ích nổi bật
const benefits = [
  {
    icon: "savings",
    title: "Tiết kiệm 80% chi phí",
    description: "So với thuê văn phòng truyền thống, bạn tiết kiệm đến 80% chi phí mặt bằng mỗi tháng.",
  },
  {
    icon: "bolt",
    title: "Kích hoạt trong 24h",
    description: "Dịch vụ được kích hoạt trong vòng 24 giờ sau khi ký hợp đồng. Không phải chờ đợi.",
  },
  {
    icon: "trending_up",
    title: "Linh hoạt mở rộng",
    description: "Nâng cấp hoặc hạ cấp gói dịch vụ bất cứ lúc nào phù hợp với quy mô doanh nghiệp.",
  },
  {
    icon: "verified_user",
    title: "100% hợp pháp",
    description: "Địa chỉ kinh doanh hợp pháp, đáp ứng đầy đủ yêu cầu để đăng ký và vận hành doanh nghiệp.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesContent() {
  return (
    <>
      {/* === HERO === */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-tertiary/5 rounded-full blur-[100px]" />
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
                widgets
              </span>
              Dịch vụ của chúng tôi
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-6">
              Giải pháp <span className="text-primary">toàn diện</span>
              <br />
              cho doanh nghiệp của bạn
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
              Từ địa chỉ kinh doanh đến kế toán, pháp lý và thiết kế — tất cả
              trong một gói dịch vụ văn phòng ảo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === DỊCH VỤ CHÍNH === */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-3xl shadow-lg border border-outline-variant/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-5`}
                >
                  <span
                    className={`material-symbols-outlined text-3xl ${service.iconColor}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {service.icon}
                  </span>
                </div>

                {/* Tiêu đề */}
                <h3 className="font-headline text-xl font-extrabold text-on-surface mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Danh sách tính năng */}
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-on-surface-variant"
                    >
                      <span
                        className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === LỢI ÍCH === */}
      <section className="py-24 bg-sky-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
              Tại sao chọn <span className="text-primary">LITE Space</span>?
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              Không chỉ tiết kiệm chi phí — chúng tôi mang đến giải pháp toàn diện.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-7 rounded-3xl shadow-md text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <span
                    className="material-symbols-outlined text-primary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {benefit.icon}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-6">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="text-on-surface-variant text-lg mb-10 max-w-xl mx-auto">
              Chọn gói dịch vụ phù hợp và kích hoạt văn phòng ảo ngay hôm nay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.99] transition-transform"
              >
                Đăng ký ngay
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-outline-variant/30 text-on-surface px-10 py-5 rounded-full font-bold text-lg hover:border-primary hover:text-primary transition-all"
              >
                Xem bảng giá →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
