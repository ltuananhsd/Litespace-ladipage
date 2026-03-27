"use client";

import { motion } from "framer-motion";

// Các mục chính sách bảo mật
const sections = [
  {
    title: "1. Thu thập thông tin",
    content: `Khi bạn sử dụng dịch vụ của LITE Space, chúng tôi có thể thu thập các loại thông tin sau:

• **Thông tin cá nhân:** Họ tên, email, số điện thoại, địa chỉ doanh nghiệp khi bạn đăng ký dịch vụ hoặc gửi form liên hệ.
• **Thông tin doanh nghiệp:** Tên công ty, mã số thuế, lĩnh vực hoạt động.
• **Thông tin kỹ thuật:** Địa chỉ IP, loại trình duyệt, thời gian truy cập, trang web đã xem.
• **Cookie:** Chúng tôi sử dụng cookie để cải thiện trải nghiệm người dùng và phân tích lưu lượng truy cập.`,
  },
  {
    title: "2. Mục đích sử dụng thông tin",
    content: `Thông tin thu thập được sử dụng cho các mục đích sau:

• Cung cấp, duy trì và cải thiện dịch vụ văn phòng ảo.
• Xử lý yêu cầu đăng ký, tư vấn và hỗ trợ khách hàng.
• Gửi thông báo quan trọng về dịch vụ, cập nhật chính sách.
• Gửi thông tin khuyến mãi, ưu đãi (chỉ khi bạn đồng ý nhận).
• Tuân thủ các yêu cầu pháp lý và quy định hiện hành.
• Phân tích và thống kê nhằm nâng cao chất lượng dịch vụ.`,
  },
  {
    title: "3. Chia sẻ thông tin",
    content: `LITE Space cam kết không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho bên thứ ba, ngoại trừ các trường hợp:

• **Đối tác dịch vụ:** Các đơn vị hỗ trợ vận hành (kế toán, ngân hàng, pháp lý) theo hợp đồng bảo mật.
• **Yêu cầu pháp lý:** Khi có yêu cầu từ cơ quan nhà nước có thẩm quyền.
• **Bảo vệ quyền lợi:** Khi cần thiết để bảo vệ quyền, tài sản hoặc sự an toàn của LITE Space và khách hàng.`,
  },
  {
    title: "4. Bảo mật dữ liệu",
    content: `Chúng tôi áp dụng các biện pháp bảo mật tiên tiến để bảo vệ thông tin của bạn:

• Mã hóa SSL/TLS cho toàn bộ dữ liệu truyền tải.
• Hệ thống tường lửa và giám sát 24/7.
• Kiểm soát truy cập nghiêm ngặt theo nguyên tắc "cần biết".
• Sao lưu dữ liệu định kỳ và lưu trữ tại trung tâm dữ liệu đạt chuẩn.
• Đào tạo nhân viên về bảo mật thông tin thường xuyên.`,
  },
  {
    title: "5. Quyền của người dùng",
    content: `Bạn có các quyền sau đối với dữ liệu cá nhân của mình:

• **Quyền truy cập:** Yêu cầu xem thông tin cá nhân mà chúng tôi đang lưu trữ.
• **Quyền chỉnh sửa:** Yêu cầu cập nhật hoặc sửa đổi thông tin không chính xác.
• **Quyền xóa:** Yêu cầu xóa thông tin cá nhân (trừ khi pháp luật yêu cầu lưu trữ).
• **Quyền từ chối:** Từ chối nhận thông tin marketing bất cứ lúc nào.
• **Quyền khiếu nại:** Liên hệ cơ quan bảo vệ dữ liệu nếu bạn cho rằng quyền lợi bị vi phạm.`,
  },
  {
    title: "6. Cookie và công nghệ theo dõi",
    content: `Website của chúng tôi sử dụng cookie để:

• Ghi nhớ tùy chọn và thông tin đăng nhập của bạn.
• Phân tích lưu lượng truy cập thông qua Google Analytics.
• Cung cấp trải nghiệm cá nhân hóa.

Bạn có thể quản lý cookie thông qua cài đặt trình duyệt. Lưu ý rằng việc tắt cookie có thể ảnh hưởng đến trải nghiệm sử dụng website.`,
  },
  {
    title: "7. Thay đổi chính sách",
    content: `LITE Space có quyền cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được đăng tải trên trang này kèm theo ngày cập nhật. Chúng tôi khuyến khích bạn kiểm tra trang này định kỳ để nắm bắt các thay đổi mới nhất.`,
  },
  {
    title: "8. Liên hệ",
    content: `Nếu bạn có bất kỳ câu hỏi hay yêu cầu nào liên quan đến chính sách bảo mật, vui lòng liên hệ:

• **Email:** privacy@litespace.vn
• **Điện thoại:** 028 xxxx xxxx
• **Địa chỉ:** Tầng 8, Tòa nhà ABC Tower, 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh`,
  },
];

export default function PrivacyContent() {
  return (
    <>
      {/* === HERO === */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
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
                shield
              </span>
              Pháp lý
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-6">
              Chính sách bảo mật
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
              LITE Space (&ldquo;chúng tôi&rdquo;) cam kết bảo vệ quyền riêng
              tư và dữ liệu cá nhân của khách hàng. Chính sách bảo mật này giải
              thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông
              tin của bạn khi sử dụng website và dịch vụ của LITE Space.
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
