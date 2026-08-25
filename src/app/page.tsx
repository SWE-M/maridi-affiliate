"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [myId, setMyId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const generatedId = `M-${randomNum}`;

      const { error } = await supabase
        .from('marketers')
        .insert([
          { 
            marketing_id: generatedId,
            name: name, 
            phone_number: phone,
            tier_level: 'Pending' 
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          alert("رقم الجوال هذا مسجل لدينا مسبقاً!");
        } else {
          alert(`خطأ في السيرفر: ${error.message}`);
        }
      } else {
        // نثبت الكود المتولد لنعرضه له بشاشة النجاح
        setMyId(generatedId);
        // ننتقل لـ شاشة النجاح الأنيميشن بدلاً من الـ alert
        setIsSuccess(true);
        setName("");
        setPhone("");
      }
    } catch (err: any) {
      alert(`حدث خطأ غير متوقع: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      
      {/* شبكة نيون عصرية بالخلفية */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* هالات ضوئية متحركة خافته */}
      <div className="absolute w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[160px] -top-40 -left-40 animate-pulse pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] -bottom-40 -right-40 animate-pulse pointer-events-none duration-1000"></div>

      {/* الهيدر الرئيسي - يختفي بسلاسة إذا نجح الطلب ليعطي مساحة للإنجاز */}
      <div className={`mb-12 text-center relative z-10 transition-all duration-700 ${isSuccess ? "opacity-0 scale-95 max-h-0 mb-0 overflow-hidden" : "opacity-100 scale-100"}`}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-950/40 text-sky-300 text-sm mb-4 backdrop-blur-md shadow-lg shadow-sky-950/40 font-medium">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
          بوابة الانضمام المباشرة
        </div>
        <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-slate-100 to-blue-500 tracking-tight">
          مريدي أفلييت
        </h1>
        <p className="text-slate-400 text-lg max-w-lg font-medium mb-6">
          ابدأ رحلتك التسويقية معنا اليوم وسوّق لأقوى المشاريع التقنية الرقمية بعمولات فورية ومجزية.
        </p>

        {/* أزرار التنقل السريع */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/guide"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-sky-300 hover:text-sky-200 text-sm font-bold border border-sky-500/30 transition-all duration-200 shadow-lg shadow-black/40 hover:border-sky-500/60"
          >
            <span>📘</span>
            <span>دليل المسوق والأرباح</span>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-bold border border-slate-700 hover:border-slate-500 transition-all duration-200 shadow-lg shadow-black/40"
          >
            <span>🚀</span>
            <span>لوحة تحكم المسوقين</span>
          </Link>
        </div>
      </div>

      {/* الكرت الرئيسي للموقع (Glassmorphic Card) */}
      <div className="bg-slate-900/80 backdrop-blur-2xl p-8 md:p-10 rounded-[32px] shadow-2xl shadow-black/80 max-w-md w-full border border-slate-800/80 relative z-10 transition-all duration-500 overflow-hidden min-h-[420px] flex flex-col justify-center">
        
        {!isSuccess ? (
          /* واجهة الفورم الأساسية */
          <div className="transition-all duration-500 opacity-100 scale-100">
            <div className="text-right mb-8 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-sky-400 to-blue-600 rounded-full shadow-lg shadow-sky-500/50"></div>
              <h2 className="text-2xl font-black text-white tracking-wide">طلب انضمام جديد</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2.5 mr-1">الاسم الكريم</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-950/60 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-slate-950 outline-none transition-all duration-300 shadow-inner"
                  placeholder="مثال: محمد المريدي"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2.5 mr-1">رقم الجوال (مع رمز الدولة)</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    pattern="[\+0-9\s\-]{8,20}"
                    title="يرجى إدخال رقم الجوال مع الرمز الدولي (مثال: +97455123456)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-950/60 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-slate-950 outline-none transition-all duration-300 shadow-inner tracking-wide font-mono"
                    placeholder="+974 55XX XXXX"
                    dir="ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white font-black py-4.5 px-4 rounded-2xl transition-all duration-300 transform relative overflow-hidden group flex items-center justify-center gap-3 text-base ${
                  isSubmitting 
                  ? "bg-slate-800 cursor-not-allowed text-slate-500 border border-slate-700" 
                  : "bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 hover:from-sky-500 hover:via-blue-500 hover:to-sky-600 shadow-xl shadow-sky-500/10 hover:shadow-sky-500/20 hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                {isSubmitting ? (
                  <>
                    {/* لودر الدوران المضيء المتناسق */}
                    <div className="w-5 h-5 border-3 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>جاري تأمين وإرسال طلبك...</span>
                  </>
                ) : (
                  <>
                    <span>إرسال طلب الانضمام</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7 7l-7-7 7-7" />
                    </svg>
                  </>
                )}
             </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <Link href="/guide" className="text-sky-400 hover:text-sky-300 font-bold transition">
                📘 كيف يعمل النظام ونسب العمولات؟
              </Link>
              <Link href="/dashboard" className="text-slate-400 hover:text-white font-medium transition">
                مسجل مسبقاً؟ <span className="underline">دخول اللوحة</span>
              </Link>
            </div>
          </div>
        ) : (
          /* واجهة النجاح المبتكرة والسينمائية */
          <div className="text-center p-2 animate-fadeIn transition-all duration-700">
            
            {/* أنيميشن الدوائر وعلامة الصح النيون المتداخلة */}
            <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full blur-md opacity-40 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-slate-950 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <svg className="w-10 h-10 text-emerald-400 animate-scaleIn" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-black text-white mb-3 tracking-tight">تم الإرسال بنجاح!</h2>
            <p className="text-slate-400 text-sm max-w-xs mx-auto mb-6 leading-relaxed">
              تم تسجيل طلبك بنجاح في قاعدة البيانات الحية، وقام النظام بتخصيص رمز فريد لك:
            </p>

            {/* بوكس الكود التسويقي الرقمي */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl mb-8 relative group overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">كود التسويق المبدئي</span>
              <span className="text-2xl font-black font-mono text-sky-400 tracking-wider bg-clip-text">{myId}</span>
            </div>

            <p className="text-amber-400 text-xs font-medium bg-amber-950/40 border border-amber-900/50 py-2.5 px-4 rounded-xl mb-6">
              📢 سيتم مراجعة طلبك وتفعيله من قِبل المهندس محمد مريدي فوراً.
            </p>

            <div className="space-y-3">
              <Link
                href="/guide"
                className="block w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm transition shadow-lg shadow-sky-500/20 text-center"
              >
                قراءة دليل التسويق والنماذج الجاهزة 📘
              </Link>
              
              <Link
                href="/dashboard"
                className="block w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs transition text-center"
              >
                الانتقال للوحة التحكم 🚀
              </Link>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-16 text-xs text-slate-700 font-mono relative z-10 tracking-widest uppercase">
        Maridi Affiliates • Built for Scale © 2026
      </footer>
    </main>
  );
}