"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts, type BlogPost } from "@/data/blogData";

// Định dạng ngày tháng
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// Render nội dung markdown đơn giản
function renderContent(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Heading ##
    if (line.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="font-headline text-xl md:text-2xl font-extrabold text-on-surface mt-10 mb-4"
        >
          {line.replace("## ", "")}
        </h2>
      );
    }
    // Danh sách có đánh số
    if (/^\d+\.\s/.test(line)) {
      const content = line.replace(/^\d+\.\s/, "");
      return (
        <li key={i} className="ml-6 mb-2 list-decimal text-on-surface-variant leading-relaxed">
          {renderInlineFormatting(content)}
        </li>
      );
    }
    // Danh sách bullet
    if (line.startsWith("- ")) {
      const content = line.replace("- ", "");
      return (
        <li key={i} className="ml-6 mb-2 list-disc text-on-surface-variant leading-relaxed">
          {renderInlineFormatting(content)}
        </li>
      );
    }
    // Dòng trống
    if (line.trim() === "") {
      return <div key={i} className="h-3" />;
    }
    // Đoạn văn thường
    return (
      <p key={i} className="text-on-surface-variant leading-relaxed mb-3">
        {renderInlineFormatting(line)}
      </p>
    );
  });
}

// Render bold text inline
function renderInlineFormatting(text: string) {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-on-surface font-bold">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function BlogDetailContent({ post }: { post: BlogPost }) {
  // Lấy bài viết liên quan (cùng category, khác bài hiện tại)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      {/* === HERO === */}
      <section className="relative pt-40 pb-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-8">
              <Link href="/" className="hover:text-primary transition-colors">
                Trang chủ
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-primary font-bold">{post.category}</span>
            </nav>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${post.categoryColor}`}
              >
                {post.category}
              </span>
              <span className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {post.readTime} đọc
              </span>
              <span className="text-xs text-on-surface-variant">
                {formatDate(post.date)}
              </span>
            </div>

            {/* Tiêu đề */}
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight mb-8">
              {post.title}
            </h1>

            {/* Tác giả */}
            <div className="flex items-center gap-3 pb-8 border-b border-outline-variant/10">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  person
                </span>
              </div>
              <div>
                <p className="font-bold text-sm">{post.author.name}</p>
                <p className="text-xs text-on-surface-variant">{post.author.role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === NỘI DUNG BÀI VIẾT === */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="prose-custom"
          >
            {post.content.map((block, index) => (
              <div key={index}>{renderContent(block)}</div>
            ))}
          </motion.article>

          {/* Thanh chia sẻ */}
          <div className="mt-12 pt-8 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-on-surface-variant font-medium">
                Chia sẻ bài viết:
              </span>
              <div className="flex gap-2">
                {["Facebook", "Zalo", "LinkedIn"].map((platform) => (
                  <button
                    key={platform}
                    className="px-4 py-2 bg-surface rounded-full text-xs font-bold text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
            <Link
              href="/blog"
              className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Quay lại Blog
            </Link>
          </div>
        </div>
      </section>

      {/* === BÀI VIẾT LIÊN QUAN === */}
      <section className="py-20 bg-sky-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-center mb-12">
            Bài viết khác
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relPost, index) => (
              <motion.div
                key={relPost.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link
                  href={`/blog/${relPost.slug}`}
                  className="group block bg-white rounded-3xl shadow-md border border-outline-variant/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="bg-gradient-to-br from-primary/8 to-primary/3 p-8 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary text-[48px] group-hover:scale-110 transition-transform"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {relPost.coverIcon}
                    </span>
                  </div>
                  <div className="p-5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${relPost.categoryColor}`}
                    >
                      {relPost.category}
                    </span>
                    <h3 className="font-bold text-on-surface mt-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {relPost.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-2">
                      {relPost.readTime} đọc • {formatDate(relPost.date)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline text-2xl md:text-3xl font-extrabold mb-4">
              Bắt đầu với LITE Space ngay hôm nay
            </h2>
            <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
              Đăng ký văn phòng ảo chỉ từ 590.000đ/tháng. Kích hoạt trong 24 giờ.
            </p>
            <Link
              href="/register"
              className="inline-block bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-primary/25 hover:scale-[1.02] transition-transform"
            >
              Đăng ký ngay
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
