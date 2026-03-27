"use client";

import { motion } from "framer-motion";

// Các mục điều khoản dịch vụ
const sections = [
  {
    title: "1. Định nghĩa",
    content: `Trong Điều khoản dịch vụ này:

• **"LITE Space"** hay **"Chúng tôi"** là Công ty TNHH LITE Space, đơn vị cung cấp dịch vụ văn phòng ảo.
• **"Khách hàng"** hay **"Bạn"** là cá nhân hoặc tổ chức đăng ký và sử dụng dịch vụ.
• **"Dịch vụ"** bao gồm tất cả các sản phẩm và dịch vụ do LITE Space cung cấp: địa chỉ kinh doanh, lễ tân, xử lý thư tín, hỗ trợ pháp lý, kế toán, và các dịch vụ liên quan.
• **"Hợp đồng"** là thỏa thuận giữa LITE Space và Khách hàng, bao gồm các Điều khoản này và các phụ lục (nếu có).`,
  },
  {
    title: "2. Phạm vi dịch vụ",
    content: `LITE Space cung cấp các dịch vụ văn phòng ảo bao gồm:

• Cho thuê địa chỉ kinh doanh hợp pháp để đăng ký doanh nghiệp.
• Dịch vụ lễ tân: tiếp đón khách, trả lời điện thoại nhân danh công ty khách hàng.
• Tiếp nhận, thông báo và chuyển tiếp thư từ, bưu phẩm.
• Hỗ trợ thủ tục đăng ký kinh doanh, thay đổi giấy phép kinh doanh.
• Hỗ trợ mở tài khoản ngân hàng doanh nghiệp.
• Dịch vụ kế toán cơ bản (theo gói đăng ký).
• Thiết kế logo và landing page (gói Premium).

Phạm vi cụ thể tùy thuộc vào gói dịch vụ mà Khách hàng đăng ký.`,
  },
  {
    title: "3. Đăng ký và thanh toán",
    content: `• Khách hàng cần cung cấp thông tin chính xác, đầy đủ khi đăng ký dịch vụ.
• Phí dịch vụ được thanh toán theo chu kỳ hàng tháng hoặc hàng năm, tùy lựa chọn.
• Thanh toán chấp nhận qua: chuyển khoản ngân hàng, ví điện tử, quét mã QR.
• Phí dịch vụ chưa bao gồm VAT (nếu có).
• Hóa đơn điện tử sẽ được xuất trong vòng 7 ngày làm việc sau khi thanh toán.
• Nếu thanh toán chậm quá 15 ngày, LITE Space có quyền tạm ngưng dịch vụ.`,
  },
  {
    title: "4. Quyền và nghĩa vụ của Khách hàng",
    content: `**Quyền:**
• Sử dụng đầy đủ các dịch vụ theo gói đã đăng ký.
• Yêu cầu hỗ trợ kỹ thuật và tư vấn trong giờ làm việc.
• Nâng cấp hoặc hạ cấp gói dịch vụ theo nhu cầu.
• Yêu cầu hoàn tiền theo chính sách hoàn tiền của LITE Space.

**Nghĩa vụ:**
• Cung cấp thông tin chính xác, đầy đủ và cập nhật kịp thời.
• Thanh toán phí dịch vụ đúng hạn.
• Không sử dụng địa chỉ LITE Space cho các hoạt động vi phạm pháp luật.
• Thông báo cho LITE Space khi thay đổi thông tin doanh nghiệp quan trọng.`,
  },
  {
    title: "5. Quyền và nghĩa vụ của LITE Space",
    content: `**Quyền:**
• Thu phí dịch vụ theo quy định.
• Tạm ngưng hoặc chấm dứt dịch vụ nếu Khách hàng vi phạm Điều khoản.
• Thay đổi nội dung dịch vụ với thông báo trước 30 ngày.
• Điều chỉnh mức phí dịch vụ với thông báo trước 60 ngày.

**Nghĩa vụ:**
• Cung cấp dịch vụ đúng nội dung và chất lượng cam kết.
• Bảo mật thông tin khách hàng theo Chính sách bảo mật.
• Hỗ trợ khách hàng trong thời gian hợp lý.
• Thông báo kịp thời về các thay đổi ảnh hưởng đến dịch vụ.`,
  },
  {
    title: "6. Chính sách hoàn tiền",
    content: `• Khách hàng có thể yêu cầu hoàn tiền trong vòng 7 ngày kể từ ngày kích hoạt dịch vụ.
• Số tiền hoàn trả sẽ được trừ đi chi phí dịch vụ đã sử dụng và phí xử lý.
• Hoàn tiền được thực hiện trong vòng 14 ngày làm việc qua phương thức thanh toán ban đầu.
• Không áp dụng hoàn tiền cho các dịch vụ bổ sung đã hoàn thành (thiết kế logo, đăng ký kinh doanh...).`,
  },
  {
    title: "7. Chấm dứt dịch vụ",
    content: `• Khách hàng có thể chấm dứt dịch vụ bất cứ lúc nào bằng cách thông báo bằng văn bản trước 30 ngày.
• LITE Space có quyền chấm dứt dịch vụ nếu Khách hàng vi phạm nghiêm trọng Điều khoản hoặc sử dụng dịch vụ cho mục đích trái pháp luật.
• Sau khi chấm dứt, Khách hàng có trách nhiệm thay đổi địa chỉ doanh nghiệp trong vòng 30 ngày.
• Phí dịch vụ đã thanh toán cho thời gian chưa sử dụng sẽ được hoàn trả theo chính sách hoàn tiền.`,
  },
  {
    title: "8. Giới hạn trách nhiệm",
    content: `• LITE Space không chịu trách nhiệm cho các thiệt hại gián tiếp, hậu quả hoặc đặc biệt phát sinh từ việc sử dụng dịch vụ.
• Trách nhiệm tối đa của LITE Space không vượt quá tổng phí dịch vụ mà Khách hàng đã thanh toán trong 12 tháng gần nhất.
• LITE Space không chịu trách nhiệm cho các sự kiện bất khả kháng: thiên tai, dịch bệnh, thay đổi chính sách pháp luật...`,
  },
  {
    title: "9. Luật áp dụng và giải quyết tranh chấp",
    content: `• Điều khoản này được điều chỉnh bởi pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
• Mọi tranh chấp sẽ được giải quyết thông qua thương lượng, hòa giải.
• Nếu không thể hòa giải, tranh chấp sẽ được đưa ra Tòa án có thẩm quyền tại TP. Hồ Chí Minh.`,
  },
  {
    title: "10. Liên hệ",
    content: `Nếu bạn có thắc mắc về Điều khoản dịch vụ, vui lòng liên hệ:

• **Email:** legal@litespace.vn
• **Điện thoại:** 028 xxxx xxxx
• **Địa chỉ:** Tầng 8, Tòa nhà ABC Tower, 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh`,
  },
];

export default function TermsContent() {
  return (
    <>
      {/* === HERO === */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/3 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center">
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
                gavel
              </span>
              Pháp lý
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-6">
              Điều khoản dịch vụ
            </h1>
            <p className="text-on-surface-variant text-lg">
              Cập nhật lần cuối: Tháng 3, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* === NỘI DUNG === */}
      <section className="pb-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-outline-variant/10"
          >
            <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
              Vui lòng đọc kỹ các Điều khoản dịch vụ dưới đây trước khi sử
              dụng dịch vụ của LITE Space. Bằng việc đăng ký và sử dụng dịch
              vụ, bạn đồng ý tuân thủ các điều khoản này.
            </p>

            <div className="space-y-10">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <h2 className="font-headline text-xl md:text-2xl font-extrabold text-on-surface mb-4">
                    {section.title}
                  </h2>
                  <div className="text-on-surface-variant leading-relaxed whitespace-pre-line text-[15px]">
                    {section.content.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-on-surface font-bold">
                          {part}
                        </strong>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
