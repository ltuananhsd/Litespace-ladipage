"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts, categories } from "@/data/blogData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Định dạng ngày tháng
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogListContent() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filteredPosts =
    activeCategory === "Tất cả"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* === HERO === */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
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
                article
              </span>
              Blog
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-6">
              Kiến thức & Xu hướng
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              Chia sẻ kiến thức về văn phòng ảo, khởi nghiệp, pháp lý doanh
              nghiệp và xu hướng mới nhất.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === BỘ LỌC DANH MỤC === */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-surface text-on-surface-variant hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* === DANH SÁCH BÀI VIẾT === */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Bài viết nổi bật (bài đầu tiên) */}
          {filteredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Link
                href={`/blog/${filteredPosts[0].slug}`}
                className="group block bg-white rounded-[2rem] shadow-xl border border-outline-variant/10 overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="grid md:grid-cols-2">
                  {/* Ảnh bìa */}
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-12 md:p-16 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary text-[100px] group-hover:scale-110 transition-transform"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {filteredPosts[0].coverIcon}
                    </span>
                  </div>

                  {/* Nội dung */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${filteredPosts[0].categoryColor}`}
                      >
                        {filteredPosts[0].category}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        {filteredPosts[0].readTime} đọc
                      </span>
                    </div>
                    <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface mb-3 group-hover:text-primary transition-colors leading-tight">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          person
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold">
                          {filteredPosts[0].author.name}
                        </p>
                        <p className="text-[10px] text-on-surface-variant">
                          {formatDate(filteredPosts[0].date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid bài viết còn lại */}
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.slice(1).map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-3xl shadow-lg border border-outline-variant/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  {/* Ảnh bìa nhỏ */}
                  <div className="bg-gradient-to-br from-primary/8 to-primary/3 p-8 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary text-[56px] group-hover:scale-110 transition-transform"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {post.coverIcon}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${post.categoryColor}`}
                      >
                        {post.category}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">
                        {post.readTime} đọc
                      </span>
                    </div>
                    <h3 className="font-bold text-on-surface mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 pt-4 border-t border-outline-variant/10">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                          person
                        </span>
                      </div>
                      <span className="text-xs font-medium">{post.author.name}</span>
                      <span className="text-[10px] text-on-surface-variant ml-auto">
                        {formatDate(post.date)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Thông báo nếu không có bài viết */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-on-surface-variant/30 text-6xl mb-4">
                search_off
              </span>
              <p className="text-on-surface-variant">
                Chưa có bài viết nào trong danh mục này.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
