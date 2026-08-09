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
  title: "مريدي أفلييت | Maridi Affiliate ",
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
        {/* اللوجو العائم - تم تعديل التموضع لعدم التداخل مع النصوص */}
        {/* ========================================= */}
        <div className="fixed top-4 left-4 md:top-6 md:left-6 z-10 opacity-80 hover:opacity-100 transition-opacity">
          <Link href="/">
            <Image
              src={logo}
              alt="شعار مريدي أفلييت"
              width={80}
              height={80}
              // تم تحريك موقعه لليسار بدلاً من اليمين لتفادي التداخل مع عناوين الترحيب المكتوبة باليمين
              className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* محتوى الصفحات المتغير (الفورم، الداشبورد، الأدمن) */}
        {children}
      </body>
    </html>
  );
}