"use client";

import { useState } from "react";
import Link from "next/link";

export default function AffiliateGuidePage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const adTemplates = [
    {
      platform: "واتساب - لأصحاب المغاسل 👔",
      badgeClass: "badge-special",
      title: "عرض نظام إدارة المغاسل السحابي (LaundryOS)",
      text: "السلام عليكم يا غالي 👋،\nهل تدير مغسلة ملابس وحاب تنظم الفواتير، استلام وتسليم الملابس، رسائل الواتساب التلقائية للعملاء، وحسابات الكاشير والشفتات من جوالك بكل سهولة وبدون لخبطة؟\n\nنظامنا السحابي لإدارة المغاسل (LaundryOS) مصمم خصيصاً ليطور شغلك ويريحك من الدفاتر الورقية.\nتفضل بالاطلاع على التفاصيل والنسخة التجريبية: https://laundry-os-website.vercel.app/\n\nإذا حاب، مستعد أرتب لك تجربة مجانية واستشارة فورية مع الفريق التقني 🚀",
    },
    {
      platform: "واتساب - أصحاب المتاجر والمشاريع",
      badgeClass: "badge-green",
      title: "رسالة لأصحاب المتاجر والمشاريع الناشئة",
      text: "مرحباً يا غالي 👋، شفت مشروعك وما شاء الله تبارك الله عمل مميز.\nحبيت أفيدك إذا ناوي تسوي موقع أو متجر ويب احترافي يعرض خدماتك ويزيد مبيعاتك بالدفع الإلكتروني، أعرف مطور برمجيات خبير ومعتمد يقدم استشارة مجانية وعروض ممتازة.\nإذا حاب أرتب لك تواصل واستشارة مجانية معه؟",
    },
    {
      platform: "واتساب / إيميل - شركات ومنشآت",
      badgeClass: "badge-blue",
      title: "رسالة للمنشآت والشركات والأنشطة الخدمية",
      text: "السلام عليكم ورحمة الله،\nهل تبحثون عن أتمتة لأعمالكم أو نظام ويب إداري مخصص (لوحة تحكم لإدارة العمليات، تنظيم المواعيد، متابعة العملاء) يناسب احتياج عملكم بالضبط؟\n\nمستعد أرتب لكم جلسة استشارية مع مهندس برمجيات متخصص يدرس متطلباتكم ويقدم الحل الرقمي الأمثل.",
    },
    {
      platform: "منصة X (تويتر) / لينكد إن",
      badgeClass: "badge-sky",
      title: "منشور استهداف رواد الأعمال والمشاريع",
      text: "عندك فكرة مشروع تقني، متجر إلكتروني، أو نظام ويب إداري متكامل لمنشأتك ينظم شغلك ويسهل متابعة أعمالك؟ 💻🚀\n\nنقدم حلولاً تقنية وبرمجية متكاملة:\n🔹 نظام إدارة المغاسل المتكامل (LaundryOS)\n🔹 تصميم وتطوير المواقع والمتاجر الإلكترونية\n🔹 بناء الأنظمة الإدارية ولوحات التحكم السحابية\n🔹 حجز النطاقات وإعداد السيرفرات السحابية\n\nتواصل معي على الخاص لتفاصيل الخدمة والحصول على استشارة مجانية 📩",
    },
  ];

  const services = [
    {
      icon: "🌐",
      title: "المواقع والمتاجر الإلكترونية",
      desc: "صفحات هبوط تعريفية، مواقع شركات، ومتاجر متكاملة مع بوابات الدفع الإلكتروني.",
      price: "1,500 – 7,500 ر.ق (عمولة 10% - 20%)",
    },
    {
      icon: "⚙️",
      title: "الأنظمة ولوحات التحكم (Web Apps)",
      desc: "أنظمة إدارية سحابية مخصصة لإدارة العمليات، المواعيد، المخازن، والموظفين.",
      price: "6,000 – 15,000+ ر.ق (عمولة 10% - 20%)",
    },
    {
      icon: "📱",
      title: "تطبيقات الويب والحلول المتقدمة",
      desc: "تطبيقات سريعة ومتجاوبة مع أحدث قواعد البيانات السحابية وواجهات المستخدم الحديثة.",
      price: "8,000 – 20,000+ ر.ق (عمولة 10% - 20%)",
    },
    {
      icon: "🚀",
      title: "البنية التحتية والسيرفرات والدومينات",
      desc: "حجز النطاقات، إعداد السيرفرات السحابية، وربط البيئات البرمجية بكفاءة عالية.",
      price: "500 – 2,000 ر.ق (عمولة 10% - 20%)",
    },
    {
      icon: "💡",
      title: "الاستشارات التقنية والحلول الرقمية",
      desc: "دراسة متطلبات المشاريع، التخطيط المعماري للأنظمة، وتقديم الحلول البرمجية المثالية.",
      price: "تحدد بحسب متطلبات العميل",
    },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="guide-wrapper" dir="rtl" suppressHydrationWarning>
      <style jsx>{`
        .guide-wrapper {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 20px 80px 20px;
          color: #f1f5f9;
          font-family: inherit;
        }

        /* Hero */
        .hero {
          text-align: center;
          margin-bottom: 50px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 700;
          background: rgba(37, 99, 235, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.4);
          color: #60a5fa;
          margin-bottom: 20px;
        }
        .hero-title {
          font-size: clamp(26px, 5vw, 44px);
          font-weight: 900;
          line-height: 1.3;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #60a5fa 0%, #a5b4fc 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-desc {
          font-size: clamp(14px, 2vw, 16px);
          color: #94a3b8;
          max-width: 700px;
          margin: 0 auto 24px auto;
          line-height: 1.8;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 14px;
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hero-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.5);
        }

        /* Section Headings */
        .section-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .section-title {
          font-size: clamp(20px, 3.5vw, 28px);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .section-subtitle {
          font-size: 14px;
          color: #94a3b8;
        }

        /* Grid Layouts */
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 50px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
        }

        /* Card Styles */
        .glass-card {
          background: #0d1322;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          transition: border-color 0.2s, transform 0.2s;
        }
        .glass-card:hover {
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-2px);
        }

        /* Step Card */
        .step-num {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 900;
          margin-bottom: 16px;
        }
        .step-title {
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 10px;
        }
        .step-desc {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.7;
        }

        /* Tiers Section */
        .tiers-box {
          background: #090e1a;
          border: 1px solid rgba(59, 130, 246, 0.25);
          border-radius: 24px;
          padding: 32px 24px;
          margin-bottom: 30px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
        }
        .tier-card {
          background: #111827;
          border-radius: 18px;
          padding: 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .tier-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 14px;
        }
        .tier-percent {
          font-size: 38px;
          font-weight: 900;
          margin-bottom: 6px;
        }

        /* Fixed Commission Spotlight Box (Laundry) */
        .fixed-reward-spotlight {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.3) 100%);
          border: 2px solid #10b981;
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.2);
        }
        @media (min-width: 768px) {
          .fixed-reward-spotlight {
            flex-direction: row;
          }
        }

        /* Warning Box */
        .warning-banner {
          background: rgba(180, 83, 9, 0.15);
          border: 2px solid rgba(245, 158, 11, 0.5);
          border-radius: 18px;
          padding: 20px;
          margin-bottom: 24px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .warning-title {
          font-size: 16px;
          font-weight: 800;
          color: #fbbf24;
          margin-bottom: 6px;
        }
        .warning-text {
          font-size: 14px;
          color: #fef3c7;
          line-height: 1.7;
        }

        /* Ad Template Card */
        .ad-card {
          background: #0d1322;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
        }
        .ad-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .badge-special { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid #10b981; }
        .badge-green { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
        .badge-blue { background: rgba(37, 99, 235, 0.15); color: #60a5fa; border: 1px solid rgba(37, 99, 235, 0.3); }
        .badge-sky { background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3); }
        .badge-purple { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }
        
        .ad-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
        }
        .ad-text-box {
          background: #060911;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 14px;
          font-size: 13px;
          color: #cbd5e1;
          line-height: 1.8;
          white-space: pre-line;
          user-select: all;
        }
        .copy-btn {
          width: 100%;
          padding: 11px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .btn-copy-default {
          background: rgba(37, 99, 235, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.4);
          color: #93c5fd;
        }
        .btn-copy-default:hover {
          background: rgba(37, 99, 235, 0.35);
        }
        .btn-copy-success {
          background: rgba(16, 185, 129, 0.25);
          border: 1px solid rgba(16, 185, 129, 0.5);
          color: #6ee7b7;
        }

        /* FAQ & Tips */
        .faq-item {
          background: #0d1322;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 18px 20px;
          margin-bottom: 12px;
        }
        .faq-q {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .faq-a {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.7;
        }

        /* Bottom Box */
        .bottom-cta {
          text-align: center;
          padding: 40px 20px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(79, 70, 229, 0.15) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
      `}</style>

      {/* 1. Header Hero */}
      <div className="hero">
        <div className="hero-badge">
          <span>✨</span>
          <span>الدليل الإرشادي الرسمي للمسوقين المعتمدين</span>
        </div>
        <h1 className="hero-title">
          دليل المسوق الشامل | مريدي أفلييت
        </h1>
        <p className="hero-desc">
          تعرف على خطوات العمل، نظام عمولات المشاريع، والبرامج الجاهزة ذات العمولات المباشرة، وانسخ النماذج الإعلانية الجاهزة للبدء فوراً.
        </p>
        <div>
          <Link
  href="/dashboard"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px 28px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "15px",
    textDecoration: "none",
    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
  }}
>
  الانتقال إلى لوحة المسوقين 🚀
</Link>
        </div>
      </div>

      {/* 2. Three Steps */}
      <div className="section-header">
        <h2 className="section-title">كيف يعمل النظام؟</h2>
        <p className="section-subtitle">3 خطوات سهلة وسريعة تبدأ بها مسارك التسويقي</p>
      </div>

      <div className="grid-3">
        <div className="glass-card">
          <div className="step-num" style={{ background: "rgba(37, 99, 235, 0.2)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" }}>
            01
          </div>
          <h3 className="step-title">تواصل مع العميل المهتم</h3>
          <p className="step-desc">
            ابحث عن أصحاب المشاريع، المتاجر، المغاسل، أو الشركات التي تحتاج إلى حلول تقنية أو أنظمة ويب لأعمالها.
          </p>
        </div>

        <div className="glass-card">
          <div className="step-num" style={{ background: "rgba(99, 102, 241, 0.2)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}>
            02
          </div>
          <h3 className="step-title">سجّل بيانات العميل في اللوحة</h3>
          <p className="step-desc">
            ادخل لوحتك وسجل اسمه ورقم جواله عبر نموذج <strong>"إرسال بيانات عميل جديد"</strong>. دورك ينتهي هنا تماماً!
          </p>
        </div>

        <div className="glass-card">
          <div className="step-num" style={{ background: "rgba(16, 185, 129, 0.2)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }}>
            03
          </div>
          <h3 className="step-title">استلم عمولتك بالريال القطري</h3>
          <p className="step-desc">
            نتولى نحن الاجتماع والاتفاق والتنفيذ، وبمجرد اعتماد الصفقة ينزل رصيدك في لوحة التحكم للسحب البنكي المباشر.
          </p>
        </div>
      </div>

      {/* 3. Tiers Box (For Custom Projects) */}
      <div className="tiers-box">
        <div className="section-header">
          <h2 className="section-title">💰 نظام العمولات للمشاريع البرمجية المخصصة</h2>
          <p className="section-subtitle">للمواقع والمتاجر والتطبيقات والأنظمة الخاصة (عمولات تصاعدية بنسب مئوية)</p>
        </div>

        <div className="grid-3" style={{ marginBottom: 0 }}>
          <div className="tier-card" style={{ border: "1px solid rgba(217, 119, 6, 0.4)" }}>
            <div>
              <span className="tier-badge" style={{ background: "rgba(217, 119, 6, 0.2)", color: "#fbbf24" }}>
                المستوى البرونزي | BRONZE
              </span>
              <div className="tier-percent" style={{ color: "#ffffff" }}>10%</div>
              <p style={{ fontSize: "13px", color: "#94a3b8" }}>للعميل الأول والثاني</p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px", marginTop: "20px", fontSize: "13px" }}>
              متوسط العمولة: <strong style={{ color: "#34d399" }}>300 – 800 ر.ق</strong>
            </div>
          </div>

          <div className="tier-card" style={{ border: "1px solid rgba(148, 163, 184, 0.4)" }}>
            <div>
              <span className="tier-badge" style={{ background: "rgba(148, 163, 184, 0.2)", color: "#e2e8f0" }}>
                المستوى الفضي | SILVER
              </span>
              <div className="tier-percent" style={{ color: "#ffffff" }}>15%</div>
              <p style={{ fontSize: "13px", color: "#94a3b8" }}>من العميل 3 إلى 5</p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px", marginTop: "20px", fontSize: "13px" }}>
              متوسط العمولة: <strong style={{ color: "#34d399" }}>750 – 1,500 ر.ق</strong>
            </div>
          </div>

          <div className="tier-card" style={{ border: "1px solid rgba(234, 179, 8, 0.6)" }}>
            <div>
              <span className="tier-badge" style={{ background: "rgba(234, 179, 8, 0.2)", color: "#facc15" }}>
                المستوى الذهبي | GOLD
              </span>
              <div className="tier-percent" style={{ color: "#facc15" }}>20%</div>
              <p style={{ fontSize: "13px", color: "#94a3b8" }}>من العميل 6 فما فوق</p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px", marginTop: "20px", fontSize: "13px" }}>
              متوسط العمولة: <strong style={{ color: "#34d399" }}>1,200 – 3,000+ ر.ق</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Special Spotlight (Laundry Program) placed directly below Tiers */}
      <div className="fixed-reward-spotlight">
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "11px", fontWeight: "800", background: "#10b981", color: "#064e3b", padding: "3px 10px", borderRadius: "6px" }}>
            برنامج جاهز - عمولة ثابتة 👔
          </span>
          <h3 style={{ fontSize: "20px", fontWeight: "900", color: "#ffffff", marginTop: "8px", marginBottom: "4px" }}>
            نظام إدارة المغاسل السحابي (LaundryOS)
          </h3>
          <p style={{ fontSize: "13px", color: "#d1fae5", maxWidth: "600px", lineHeight: "1.7" }}>
            برنامج إداري متكامل ومخصص للمغاسل. هذا النظام له <strong>عمولة ثابتة ومباشرة 500 ر.ق</strong> لكل مغسلة تشترك وتتعاقد معنا (مبلغ ثابت وفوري بدون انتظار نسب).
          </p>
        </div>
        <div style={{ textAlign: "center", minWidth: "180px" }}>
          <div style={{ fontSize: "32px", fontWeight: "900", color: "#34d399" }}>500 ر.ق</div>
          <div style={{ fontSize: "11px", color: "#a7f3d0", marginBottom: "10px" }}>عمولة ثابتة لكل مغسلة</div>
          <a
            href="https://laundry-os-website.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            معاينة موقع البرنامج ↗
          </a>
        </div>
      </div>

      {/* 5. Services & Estimates */}
      <div className="section-header">
        <h2 className="section-title">💻 الخدمات والحلول البرمجية الأخرى</h2>
        <p className="section-subtitle">دليلك لمعرفة مجالات العمل والأنظمة وتكاليفها التقديرية</p>
      </div>

      {/* Warning Alert Banner */}
      <div className="warning-banner">
        <span style={{ fontSize: "24px" }}>⚠️</span>
        <div>
          <h4 className="warning-title">تنبيه هام جداً للمسوقين والعملاء:</h4>
          <p className="warning-text">
            الأسعار الموضحة أدناه هي أسعار استرشادية تبدأ من الحدود المذكورة، ولكن <strong>التكلفة النهائية للمشروع تتحدد بدقة بناءً على الميزات والمتطلبات الخاصة بكل عميل بعد جلسة الاستشارة الفنية.</strong>
          </p>
        </div>
      </div>

      <div className="grid-3">
        {services.map((srv, idx) => (
          <div key={idx} className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "28px", display: "block", marginBottom: "12px" }}>{srv.icon}</span>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#ffffff", marginBottom: "8px" }}>{srv.title}</h3>
              <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.7", marginBottom: "16px" }}>{srv.desc}</p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "#64748b" }}>النطاق التقديري:</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#60a5fa" }}>{srv.price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Marketing Templates */}
      <div className="section-header">
        <h2 className="section-title">📢 قوالب ورسائل تسويقية جاهزة للنسخ</h2>
        <p className="section-subtitle">انسخ النص المناسب بضغطة زر وشاركه فوراً مع العملاء وأصحاب المغاسل</p>
      </div>

      <div className="grid-2">
        {adTemplates.map((tpl, i) => (
          <div key={i} className="ad-card">
            <div>
              <div className="ad-meta">
                <span className={`ad-badge ${tpl.badgeClass}`}>{tpl.platform}</span>
                <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "monospace" }}>قالب #{i + 1}</span>
              </div>
              <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff", marginBottom: "10px" }}>{tpl.title}</h4>
              <div className="ad-text-box">{tpl.text}</div>
            </div>

            <button
              onClick={() => handleCopy(tpl.text, i)}
              className={`copy-btn ${copiedIndex === i ? "btn-copy-success" : "btn-copy-default"}`}
            >
              {copiedIndex === i ? "تم نسخ النص إلى الحافظة! ✓" : "نسخ النص التسويقي 📋"}
            </button>
          </div>
        ))}
      </div>

      {/* 7. Where to find clients */}
      <div className="glass-card" style={{ marginBottom: "60px", padding: "28px" }}>
        <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#ffffff", marginBottom: "18px" }}>
          🎯 أين تجد عملاءك بسهولة؟ (أفكار لجلب عملاء اليوم)
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          <div style={{ background: "#060911", padding: "16px", borderRadius: "14px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
            <strong style={{ color: "#34d399", display: "block", marginBottom: "6px", fontSize: "14px" }}>👔 مغاسل الملابس والدراي كلين:</strong>
            <span style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.6" }}>
              قم بزيارة أو مراسلة مغاسل منطقتك واعرض عليهم نظام <strong>LaundryOS</strong>؛ وعمولتك <strong>500 ر.ق ثابتة</strong> لكل مغسلة تشترك!
            </span>
          </div>
          <div style={{ background: "#060911", padding: "16px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <strong style={{ color: "#e2e8f0", display: "block", marginBottom: "6px", fontSize: "14px" }}>المتاجر على إنستغرام وتيك توك:</strong>
            <span style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.6" }}>المشاريع التي تبيع بالخاص وتحتاج لمتجر إلكتروني وبوابات دفع إلكترونية.</span>
          </div>
          <div style={{ background: "#060911", padding: "16px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <strong style={{ color: "#e2e8f0", display: "block", marginBottom: "6px", fontSize: "14px" }}>العيادات والصالونات والأنشطة الخدمية:</strong>
            <span style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.6" }}>الأنشطة التي تحتاج لنظام حجز مواعيد وإدارة فروع وموظفين.</span>
          </div>
          <div style={{ background: "#060911", padding: "16px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <strong style={{ color: "#e2e8f0", display: "block", marginBottom: "6px", fontSize: "14px" }}>رواد الأعمال وأصحاب الشركات:</strong>
            <span style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.6" }}>من يملكون فكرة ويب أو تطبيق أو يحتاجون موقعاً تعريفياً لشركاتهم.</span>
          </div>
        </div>
      </div>

      {/* 8. FAQ */}
      <div style={{ maxWidth: "750px", margin: "0 auto 60px auto" }}>
        <div className="section-header">
          <h2 className="section-title">الأسئلة الشائعة</h2>
        </div>
        <div className="faq-item">
          <p className="faq-q">كم عمولتي على اشتراك نظام المغاسل (LaundryOS)؟</p>
          <p className="faq-a">عمولتك ثابتة وقدرها <strong>500 ر.ق مباشرة</strong> لكل مغسلة تشترك في النظام عبر بياناتك.</p>
        </div>
        <div className="faq-item">
          <p className="faq-q">هل أحتاج لمعرفة تقنية أو برمجية للشرح للعميل؟</p>
          <p className="faq-a">لا، دورك فقط إرسال رقم العميل المهتم في لوحتك (أو مشاركة الرابط التعريفي معه)، ونحن نتكفل بالشرح الفني وتقديم العرض وتوقيع العقد بالكامل.</p>
        </div>
        <div className="faq-item">
          <p className="faq-q">متى تنزل عمولتي وكيف أستلمها؟</p>
          <p className="faq-a">تنزل في رصيدك المتاح فور اعتماد العقد ودفع العميل، وتسحبها بطلب سحب مباشر لحسابك البنكي داخل قطر بالريال القطري.</p>
        </div>
      </div>

      {/* 9. Bottom CTA */}
      <div className="bottom-cta">
        <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff", marginBottom: "8px" }}>جاهز لجلب أول عميل اليوم؟</h3>
        <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "20px" }}>ادخل لوحة تحكم المسوق وسجل أول عميل أو مغسلة لتبدأ جني الأرباح فوراً.</p>
        <Link
  href="/dashboard"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px 28px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "15px",
    textDecoration: "none",
    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
  }}
>
  الدخول للوحة التحكم 🚀
</Link>
      </div>

    </div>
  );
}