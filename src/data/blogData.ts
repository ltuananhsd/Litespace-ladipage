// Dữ liệu bài viết blog mẫu
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  coverIcon: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "van-phong-ao-la-gi",
    title: "Văn phòng ảo là gì? Tất tần tật kiến thức bạn cần biết năm 2026",
    excerpt:
      "Tìm hiểu khái niệm văn phòng ảo, lợi ích vượt trội so với văn phòng truyền thống, đối tượng phù hợp và cách lựa chọn dịch vụ tốt nhất.",
    category: "Kiến thức",
    categoryColor: "bg-blue-500/10 text-blue-600",
    readTime: "8 phút",
    date: "2026-03-25",
    author: { name: "LITE Space Team", role: "Đội ngũ biên tập" },
    coverIcon: "apartment",
    content: [
      "Văn phòng ảo (Virtual Office) là dịch vụ cung cấp địa chỉ kinh doanh hợp pháp cùng các tiện ích liên quan mà không yêu cầu doanh nghiệp thuê mặt bằng vật lý. Đây là giải pháp được hàng triệu doanh nghiệp trên thế giới tin dùng.",
      "## Văn phòng ảo bao gồm những gì?\n\nMột gói văn phòng ảo tiêu chuẩn thường bao gồm:\n\n- **Địa chỉ kinh doanh uy tín:** Sử dụng để đăng ký giấy phép kinh doanh, in trên danh thiếp, hóa đơn và hợp đồng.\n- **Dịch vụ lễ tân:** Tiếp đón khách, trả lời điện thoại nhân danh công ty.\n- **Xử lý thư tín:** Tiếp nhận, thông báo và chuyển tiếp thư từ, bưu phẩm.\n- **Hỗ trợ pháp lý:** Đăng ký kinh doanh, mở tài khoản ngân hàng doanh nghiệp.",
      "## Ai nên sử dụng văn phòng ảo?\n\n1. **Startup mới thành lập:** Tiết kiệm chi phí ban đầu, tập trung nguồn lực vào sản phẩm.\n2. **Freelancer:** Cần địa chỉ kinh doanh chuyên nghiệp nhưng làm việc tại nhà.\n3. **Doanh nghiệp remote:** Đội ngũ phân tán, không cần văn phòng cố định.\n4. **Chi nhánh đại diện:** Cần hiện diện tại TP.HCM mà không đầu tư lớn.",
      "## So sánh chi phí: Văn phòng ảo vs. Văn phòng truyền thống\n\nVăn phòng truyền thống tại Quận 1, TP.HCM có chi phí trung bình từ 15-30 triệu đồng/tháng (chưa bao gồm nội thất, điện nước, internet). Trong khi đó, văn phòng ảo chỉ từ 590.000đ/tháng đã bao gồm đầy đủ dịch vụ. Bạn tiết kiệm đến 80% chi phí!",
      "## Kết luận\n\nVăn phòng ảo là giải pháp thông minh, tiết kiệm và hợp pháp cho doanh nghiệp hiện đại. Với LITE Space, bạn sở hữu địa chỉ uy tín, dịch vụ chuyên nghiệp và đội ngũ hỗ trợ tận tâm chỉ với chi phí nhỏ. Liên hệ ngay để được tư vấn miễn phí!",
    ],
  },
  {
    slug: "huong-dan-dang-ky-kinh-doanh-2026",
    title: "Hướng dẫn đăng ký giấy phép kinh doanh năm 2026 — Từ A đến Z",
    excerpt:
      "Quy trình đăng ký giấy phép kinh doanh mới nhất: hồ sơ cần thiết, các bước thực hiện, thời gian xử lý và chi phí chi tiết.",
    category: "Hướng dẫn",
    categoryColor: "bg-green-500/10 text-green-600",
    readTime: "12 phút",
    date: "2026-03-20",
    author: { name: "Trần Minh Khoa", role: "Tư vấn pháp lý" },
    coverIcon: "description",
    content: [
      "Đăng ký giấy phép kinh doanh (GPKD) là bước đầu tiên và quan trọng nhất khi thành lập doanh nghiệp tại Việt Nam. Bài viết này sẽ hướng dẫn bạn chi tiết quy trình đăng ký GPKD năm 2026.",
      "## Hồ sơ cần chuẩn bị\n\nTùy thuộc loại hình doanh nghiệp, bạn cần chuẩn bị các giấy tờ sau:\n\n- **Giấy đề nghị đăng ký doanh nghiệp** (theo mẫu)\n- **Điều lệ công ty** (đối với công ty TNHH, cổ phần)\n- **Danh sách thành viên/cổ đông sáng lập**\n- **Bản sao CMND/CCCD** của người đại diện theo pháp luật\n- **Giấy chứng nhận đăng ký đầu tư** (nếu có vốn nước ngoài)",
      "## Quy trình thực hiện\n\n1. **Bước 1:** Chọn tên doanh nghiệp và kiểm tra tính hợp lệ tại Cổng thông tin quốc gia.\n2. **Bước 2:** Chuẩn bị hồ sơ đầy đủ theo yêu cầu.\n3. **Bước 3:** Nộp hồ sơ tại Phòng Đăng ký kinh doanh hoặc qua hệ thống trực tuyến.\n4. **Bước 4:** Nhận kết quả trong 3-5 ngày làm việc.\n5. **Bước 5:** Khắc dấu, đăng bố cáo và đăng ký thuế.",
      "## LITE Space hỗ trợ thế nào?\n\nVới gói Upgrade và Premium, LITE Space hỗ trợ toàn bộ quy trình đăng ký GPKD:\n\n- Tư vấn chọn loại hình doanh nghiệp phù hợp\n- Chuẩn bị và soạn thảo hồ sơ hoàn chỉnh\n- Nộp hồ sơ và theo dõi tiến trình\n- Nhận kết quả và bàn giao GPKD\n\nBạn chỉ cần cung cấp CMND/CCCD, mọi thủ tục còn lại để LITE Space lo!",
    ],
  },
  {
    slug: "5-sai-lam-chon-dia-chi-kinh-doanh",
    title: "5 sai lầm phổ biến khi chọn địa chỉ kinh doanh mà startup hay mắc phải",
    excerpt:
      "Địa chỉ kinh doanh ảnh hưởng lớn đến uy tín doanh nghiệp. Tránh 5 sai lầm này để không gặp rắc rối về sau.",
    category: "Góc nhìn",
    categoryColor: "bg-amber-500/10 text-amber-600",
    readTime: "6 phút",
    date: "2026-03-15",
    author: { name: "Nguyễn Thu Hà", role: "Quản lý dịch vụ" },
    coverIcon: "warning",
    content: [
      "Khi mới khởi nghiệp, nhiều doanh nghiệp thường chọn địa chỉ kinh doanh một cách hấp tấp mà không cân nhắc kỹ. Dưới đây là 5 sai lầm phổ biến nhất.",
      "## 1. Dùng địa chỉ nhà riêng để đăng ký kinh doanh\n\nNhiều startup dùng địa chỉ nhà riêng để tiết kiệm chi phí. Tuy nhiên, điều này gây ảnh hưởng đến hình ảnh chuyên nghiệp, khó mở tài khoản ngân hàng doanh nghiệp, và có thể gặp rắc rối khi cơ quan thuế đến kiểm tra.",
      "## 2. Chọn địa chỉ quá xa trung tâm\n\nĐịa chỉ ở vùng ngoại ô có thể gây mất niềm tin với khách hàng và đối tác. Một địa chỉ tại trung tâm thành phố luôn tạo ấn tượng tốt hơn.",
      "## 3. Không kiểm tra tính hợp pháp\n\nKhông phải mọi địa chỉ đều được phép đăng ký kinh doanh. Hãy đảm bảo địa chỉ bạn chọn đáp ứng các quy định của Sở KH-ĐT địa phương.",
      "## 4. Bỏ qua dịch vụ đi kèm\n\nĐịa chỉ kinh doanh không chỉ là một dòng chữ trên giấy phép. Hãy chọn dịch vụ bao gồm cả: lễ tân, xử lý thư tín và hỗ trợ pháp lý.",
      "## 5. Không cân nhắc khả năng mở rộng\n\nKhi doanh nghiệp phát triển, bạn có thể cần thay đổi hoặc nâng cấp dịch vụ. Chọn nhà cung cấp linh hoạt như LITE Space để dễ dàng nâng cấp khi cần.",
    ],
  },
  {
    slug: "so-sanh-van-phong-ao-va-co-working",
    title: "Văn phòng ảo vs. Co-working space: Nên chọn cái nào cho doanh nghiệp nhỏ?",
    excerpt:
      "So sánh chi tiết giữa văn phòng ảo và không gian làm việc chung về chi phí, tiện ích, sự linh hoạt và tính pháp lý.",
    category: "So sánh",
    categoryColor: "bg-purple-500/10 text-purple-600",
    readTime: "10 phút",
    date: "2026-03-10",
    author: { name: "LITE Space Team", role: "Đội ngũ biên tập" },
    coverIcon: "compare_arrows",
    content: [
      "Cả văn phòng ảo và co-working space đều là giải pháp phổ biến cho doanh nghiệp nhỏ. Nhưng chúng phục vụ nhu cầu rất khác nhau. Hãy cùng so sánh chi tiết!",
      "## Chi phí\n\n- **Văn phòng ảo:** Từ 590.000đ/tháng — chỉ trả cho dịch vụ bạn cần.\n- **Co-working:** Từ 2-5 triệu đồng/tháng cho một chỗ ngồi cố định.\n\n→ Văn phòng ảo tiết kiệm hơn 3-8 lần nếu bạn không cần không gian vật lý hàng ngày.",
      "## Tính pháp lý\n\n- **Văn phòng ảo:** Địa chỉ hợp pháp để đăng ký GPKD, mở tài khoản ngân hàng.\n- **Co-working:** Không phải tất cả co-working đều cho phép đăng ký GPKD.\n\n→ Nếu bạn cần địa chỉ pháp lý, văn phòng ảo là lựa chọn an toàn hơn.",
      "## Sự linh hoạt\n\n- **Văn phòng ảo:** Làm việc ở bất kỳ đâu, không bị ràng buộc.\n- **Co-working:** Cần đến không gian làm việc, tuân thủ giờ vận hành.\n\n→ Nếu đội ngũ của bạn remote hoặc thường xuyên gặp khách bên ngoài, văn phòng ảo linh hoạt hơn.",
      "## Kết luận\n\nNếu bạn cần không gian làm việc hàng ngày → chọn co-working. Nếu bạn cần địa chỉ pháp lý + dịch vụ chuyên nghiệp mà không cần ngồi cố định → văn phòng ảo là lựa chọn tối ưu.",
    ],
  },
  {
    slug: "loi-ich-ke-toan-thue-cho-startup",
    title: "Tại sao startup nên thuê dịch vụ kế toán thuế ngay từ đầu?",
    excerpt:
      "Kế toán thuế không chỉ là nghĩa vụ pháp lý. Tìm hiểu lý do startup nên đầu tư vào dịch vụ kế toán ngay giai đoạn đầu khởi nghiệp.",
    category: "Kiến thức",
    categoryColor: "bg-blue-500/10 text-blue-600",
    readTime: "7 phút",
    date: "2026-03-05",
    author: { name: "Lê Thị Phương", role: "Kế toán trưởng" },
    coverIcon: "calculate",
    content: [
      "Nhiều startup bỏ qua việc thuê kế toán trong những tháng đầu hoạt động vì cho rằng doanh thu chưa nhiều. Đây là sai lầm có thể dẫn đến hậu quả nghiêm trọng.",
      "## Nghĩa vụ thuế bắt đầu ngay khi có GPKD\n\nDù chưa phát sinh doanh thu, doanh nghiệp vẫn phải nộp báo cáo thuế hàng quý và báo cáo tài chính hàng năm. Nếu bỏ qua, bạn sẽ bị phạt từ 2-5 triệu đồng cho mỗi lần vi phạm.",
      "## Lợi ích của dịch vụ kế toán thuế\n\n1. **Tuân thủ pháp luật:** Nộp báo cáo đúng hạn, tránh phạt.\n2. **Tối ưu thuế:** Áp dụng đúng các ưu đãi và giảm trừ thuế.\n3. **Minh bạch tài chính:** Nắm rõ dòng tiền, chi phí, lợi nhuận.\n4. **Hỗ trợ gọi vốn:** Số liệu tài chính rõ ràng khi tìm nhà đầu tư.",
      "## LITE Space cung cấp dịch vụ kế toán\n\nVới gói Upgrade và Premium, LITE Space cung cấp 3 tháng kế toán thuế miễn phí — giúp bạn yên tâm tập trung vào sản phẩm và kinh doanh.",
    ],
  },
  {
    slug: "xu-huong-lam-viec-tu-xa-2026",
    title: "Xu hướng làm việc từ xa năm 2026: Cơ hội và thách thức cho doanh nghiệp Việt",
    excerpt:
      "Khám phá xu hướng remote work mới nhất và cách doanh nghiệp Việt thích nghi hiệu quả với mô hình làm việc linh hoạt.",
    category: "Xu hướng",
    categoryColor: "bg-pink-500/10 text-pink-600",
    readTime: "9 phút",
    date: "2026-02-28",
    author: { name: "LITE Space Team", role: "Đội ngũ biên tập" },
    coverIcon: "home_work",
    content: [
      "Năm 2026, làm việc từ xa không còn là xu hướng mà đã trở thành tiêu chuẩn mới. Theo khảo sát mới nhất, 67% doanh nghiệp Việt cho phép nhân viên làm việc hybrid hoặc remote toàn phần.",
      "## Lợi ích của mô hình remote\n\n- Tiết kiệm chi phí mặt bằng 50-80%\n- Tuyển dụng nhân tài không giới hạn địa lý\n- Tăng năng suất nhờ giảm thời gian di chuyển\n- Linh hoạt thời gian, cải thiện work-life balance",
      "## Thách thức cần vượt qua\n\n- Quản lý đội ngũ phân tán\n- Duy trì văn hóa doanh nghiệp\n- Đảm bảo bảo mật thông tin\n- Giải quyết vấn đề pháp lý (đăng ký kinh doanh, nhận thư từ)",
      "## Văn phòng ảo: Giải pháp cho doanh nghiệp remote\n\nVăn phòng ảo giải quyết triệt để những thách thức pháp lý khi làm việc từ xa. Bạn có địa chỉ kinh doanh uy tín, dịch vụ lễ tân chuyên nghiệp và hỗ trợ pháp lý — mà không cần thuê văn phòng truyền thống.",
    ],
  },
];

// Lấy danh sách danh mục duy nhất
export const categories = [
  "Tất cả",
  ...Array.from(new Set(blogPosts.map((p) => p.category))),
];
