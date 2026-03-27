import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import BlogDetailContent from "@/components/blog/BlogDetailContent";
import { blogPosts } from "@/data/blogData";

// Tạo metadata động cho từng bài viết
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Không tìm thấy bài viết - LITE Space" };
  }
  return {
    title: `${post.title} - LITE Space Blog`,
    description: post.excerpt,
  };
}

// Tạo static params cho tất cả bài viết
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <BlogDetailContent post={post} />
      <Footer />
      <Chatbot />
    </main>
  );
}
