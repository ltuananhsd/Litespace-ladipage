"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Danh mục + câu hỏi
const faqCategories = [
  {
    id: "general",
    label: "Tổng quan",
    icon: "help",
    questions: [
      {
        q: "Văn phòng ảo là gì?",
        a: "Văn phòng ảo (Virtual Office) là dịch vụ cung cấp địa chỉ kinh doanh hợp pháp, dịch vụ lễ tân, xử lý thư tín mà không cần thuê không gian vật lý. Doanh nghiệp có thể sử dụng địa chỉ này để đăng ký giấy phép kinh doanh, in trên danh thiếp, hóa đơn và hợp đồng.",
      },
      {
        q: "Địa chỉ văn phòng ảo có hợp pháp không?",
        a: "Hoàn toàn hợp pháp. Địa chỉ LITE Space đáp ứng đầy đủ quy định pháp luật Việt Nam để đăng ký và vận hành doanh nghiệp. Cơ quan thuế và Sở KH-ĐT chấp nhận địa chỉ văn phòng ảo cho mục đích đăng ký kinh doanh.",
      },
      {
        q: "Ai phù hợp sử dụng văn phòng ảo?",
        a: "Văn phòng ảo phù hợp với: doanh nghiệp startup mới thành lập, freelancer cần địa chỉ kinh doanh, doanh nghiệp làm việc từ xa (remote), chi nhánh đại diện tại TP.HCM, và doanh nghiệp muốn tiết kiệm chi phí mặt bằng.",
      },
    ],
  },
  {
    id: "registration",
    label: "Đăng ký",
    icon: "app_registration",
    questions: [
      {
        q: "Quy trình đăng ký như thế nào?",
        a: "Chỉ cần 3 bước đơn giản: (1) Chọn gói dịch vụ phù hợp, (2) Điền thông tin và thanh toán, (3) Ký hợp đồng điện tử. Dịch vụ sẽ được kích hoạt trong vòng 24 giờ sau khi hoàn tất.",
      },
      {
        q: "Tôi cần chuẩn bị giấy tờ gì?",
        a: "Với doanh nghiệp mới: chỉ cần CMND/CCCD của người đại diện. Với doanh nghiệp đã đăng ký: cần thêm Giấy phép kinh doanh hiện tại. LITE Space sẽ hướng dẫn chi tiết khi bạn đăng ký.",
      },
      {
        q: "Sau bao lâu dịch vụ được kích hoạt?",
        a: "Dịch vụ được kích hoạt trong vòng 24 giờ sau khi hợp đồng được ký kết và thanh toán hoàn tất. Với các thủ tục pháp lý (đăng ký GPKD, mở tài khoản ngân hàng), thời gian sẽ theo quy định từ cơ quan nhà nước.",
      },
    ],
  },
  {
    id: "payment",
    label: "Thanh toán",
    icon: "payments",
    questions: [
      {
        q: "Có những hình thức thanh toán nào?",
        a: "LITE Space chấp nhận: chuyển khoản ngân hàng, quét mã QR qua ứng dụng ngân hàng/ví điện tử. Hóa đơn VAT sẽ được xuất trong vòng 7 ngày làm việc.",
      },
      {
        q: "Thanh toán theo chu kỳ nào?",
        a: "Phí dịch vụ được thanh toán hàng tháng hoặc hàng năm (tiết kiệm thêm 10% khi thanh toán năm). Chu kỳ bắt đầu từ ngày kích hoạt dịch vụ.",
      },
      {
        q: "Có được hoàn tiền không?",
        a: "Có. Bạn có thể yêu cầu hoàn tiền trong vòng 7 ngày kể từ ngày kích hoạt dịch vụ. Số tiền hoàn trả sẽ được trừ đi chi phí dịch vụ đã sử dụng.",
      },
    ],
  },
  {
    id: "legal",
    label: "Pháp lý",
    icon: "gavel",
    questions: [
      {
        q: "LITE Space có hỗ trợ đăng ký giấy phép kinh doanh không?",
        a: "Có (gói Upgrade và Premium). Đội ngũ LITE Space sẽ hỗ trợ toàn bộ thủ tục đăng ký GPKD mới hoặc thay đổi nội dung GPKD. Thời gian xử lý thông thường 3-5 ngày làm việc.",
      },
      {
        q: "Tôi có thể mở tài khoản ngân hàng doanh nghiệp không?",
        a: "Có. LITE Space hỗ trợ mở tài khoản ngân hàng doanh nghiệp tại các ngân hàng lớn: Vietcombank, VietinBank, BIDV, ACB, Techcombank... Số lần hỗ trợ tùy thuộc gói dịch vụ.",
      },
      {
        q: "Nếu tôi muốn ngừng dịch vụ thì sao?",
        a: "Bạn có thể chấm dứt dịch vụ bằng cách thông báo bằng văn bản trước 30 ngày. Sau đó bạn có 30 ngày để thay đổi địa chỉ doanh nghiệp. Phí dịch vụ chưa sử dụng sẽ được hoàn trả.",
      },
    ],
  },
  {
    id: "support",
    label: "Hỗ trợ",
    icon: "support_agent",
    questions: [
      {
        q: "Thời gian hỗ trợ như thế nào?",
        a: "Gói Basic và Upgrade: hỗ trợ trong giờ hành chính (8h-17h30, thứ 2-6). Gói Premium: hỗ trợ 24/7 qua Zalo, hotline và email. Thời gian phản hồi trung bình: 5-15 phút.",
      },
      {
        q: "Tôi liên hệ hỗ trợ bằng cách nào?",
        a: "Bạn có thể liên hệ qua nhiều kênh: Zalo (phản hồi 5 phút), Hotline 1900 xxxx, Email: support@litespace.vn, hoặc sử dụng chatbot AI ngay trên website.",
      },
      {
        q: "Có thể nâng cấp hoặc hạ cấp gói dịch vụ không?",
        a: "Hoàn toàn có thể. Bạn có quyền nâng cấp hoặc hạ cấp gói bất cứ lúc nào. Thay đổi sẽ có hiệu lực từ chu kỳ thanh toán tiếp theo. Liên hệ tư vấn viên để được hỗ trợ.",
      },
    ],
  },
];

// Component Accordion item
function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-outline-variant/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-surface/50 transition-colors"
      >
        <span className="font-bold text-on-surface pr-4">{question}</span>
        <span
          className={`material-symbols-outlined text-primary transition-transform duration-300 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm text-on-surface-variant leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqContent() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const currentCategory = faqCategories.find((c) => c.id === activeCategory);

  return (
    <>
      {/* === HERO === */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
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
                quiz
              </span>
              FAQ
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-6">
              Câu hỏi thường gặp
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              Tìm câu trả lời nhanh cho các thắc mắc phổ biến về dịch vụ văn
              phòng ảo LITE Space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === NỘI DUNG FAQ === */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar danh mục */}
            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-56 shrink-0"
            >
              <div className="md:sticky md:top-28 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenQuestion(null);
                    }}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-on-surface-variant hover:bg-surface hover:text-on-surface"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {cat.icon}
                    </span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.nav>

            {/* Danh sách câu hỏi */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 bg-white rounded-3xl shadow-xl border border-outline-variant/10 overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-outline-variant/10 bg-surface/50">
                <h2 className="font-headline text-xl font-extrabold flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {currentCategory?.icon}
                  </span>
                  {currentCategory?.label}
                </h2>
              </div>

              {currentCategory?.questions.map((item, index) => (
                <AccordionItem
                  key={`${activeCategory}-${index}`}
                  question={item.q}
                  answer={item.a}
                  isOpen={openQuestion === `${activeCategory}-${index}`}
                  onToggle={() =>
                    setOpenQuestion(
                      openQuestion === `${activeCategory}-${index}`
                        ? null
                        : `${activeCategory}-${index}`
                    )
                  }
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary p-8 md:p-12 rounded-[2.5rem] text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span
                className="material-symbols-outlined text-white text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                chat
              </span>
            </div>
            <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-white mb-3">
              Chưa tìm được câu trả lời?
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Đội ngũ tư vấn viên sẵn sàng giải đáp mọi thắc mắc của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
              >
                Liên hệ ngay
              </Link>
              <a
                href="https://zalo.me/0901234567"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Chat Zalo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
