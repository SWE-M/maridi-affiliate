import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import logo from "./icon.png"; // استدعاء ملف اللوجو الذي قمنا بتسميته

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "مريدي أفلييت | بوابة الانضمام",
  description: "انضم الآن كمسوق رقمي في منصة مريدي وحقق عمولات مجزية وفورية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // أضفنا اللغة العربية واتجاه اليمين لليسار لضبط المحاذاة
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased relative`}
      >
        {/* ========================================= */}
        {/* اللوجو العائم - يظهر في جميع صفحات الموقع */}
        {/* ========================================= */}
        <div className="absolute top-6 right-6 md:top-8 md:right-10 z-50">
          <Link href="/">
            <Image
              src={logo}
              alt="شعار مريدي أفلييت"
              width={80}
              height={80}
              // تصغير في الجوال (w-12) وتكبير في الكمبيوتر (md:w-16) مع ظل خفيف وتأثير عند مرور الماوس
              className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* محتوى الصفحات المتغير (الفورم، الداشبورد، الأدمن) */}
        {children}
      </body>
    </html>
  );
}