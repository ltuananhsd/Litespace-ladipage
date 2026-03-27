import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 w-full py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Phần trên: Logo + Liên kết */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
          {/* Cột trái: Logo + Mô tả */}
          <div className="space-y-4">
            <div className="text-2xl font-black text-white font-headline">
              LITE Space
            </div>
            <p className="text-sm max-w-xs leading-relaxed">
              Giải pháp văn phòng ảo chuyên nghiệp — Tiết kiệm chi phí, vận
              hành linh hoạt, địa chỉ uy tín.
            </p>
          </div>

          {/* Cột giữa: Dịch vụ */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">
              Dịch vụ
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                className="text-sm hover:text-white transition-colors"
                href="/#pricing-carousel"
              >
                Bảng giá
              </Link>
              <Link
                className="text-sm hover:text-white transition-colors"
                href="/blog"
              >
                Blog
              </Link>
              <Link
                className="text-sm hover:text-white transition-colors"
                href="/about"
              >
                Giới thiệu
              </Link>
              <Link
                className="text-sm hover:text-white transition-colors"
                href="/faq"
              >
                FAQ
              </Link>
              <Link
                className="text-sm hover:text-white transition-colors"
                href="/contact"
              >
                Liên hệ
              </Link>
            </div>
          </div>

          {/* Cột phải: Pháp lý */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">
              Pháp lý
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                className="text-sm hover:text-white transition-colors"
                href="/privacy"
              >
                Chính sách bảo mật
              </Link>
              <Link
                className="text-sm hover:text-white transition-colors"
                href="/terms"
              >
                Điều khoản dịch vụ
              </Link>
            </div>
          </div>
        </div>

        {/* Đường kẻ phân cách */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">
              © 2026 LITE Space. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex gap-6">
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                Zalo
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
