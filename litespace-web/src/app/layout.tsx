import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LITE Space - Văn phòng ảo chuyên nghiệp",
  description: "Tiết kiệm chi phí – Vận hành linh hoạt – Địa chỉ uy tín. Khởi tạo sự nghiệp vững chắc cùng LITE Space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${manrope.variable} bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
