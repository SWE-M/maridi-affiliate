"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface MarketerData {
  marketing_id: string;
  name: string;
  phone_number: string;
  tier_level: string;
  current_balance: number;
  total_earned: number;
}

export default function MarketerDashboard() {
  // حالات تسجيل الدخول
  const [inputCode, setInputCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [marketer, setMarketer] = useState<MarketerData | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // حالات فورم إرسال عميل جديد
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientSubmitting, setClientSubmitting] = useState(false);
  const [clientSuccess, setClientSuccess] = useState(false);

  // حالات طلب سحب الأرباح
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawSubmitting, setWithdrawSubmitting] = useState(false);

  // 1. دالة التحقق من كود المسوق ودخول اللوحة
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const { data, error } = await supabase
        .from("marketers")
        .select("*")
        .eq("marketing_id", inputCode.trim())
        .single();

      if (error || !data) {
        alert("❌ رمز التسويق غير صحيح! تأكد من الرمز وحاول مجدداً.");
      } else if (data.tier_level === "Pending") {
        alert("⏳ حسابك قيد المراجعة حالياً من قِبل الإدارة، سيتم تفعيله قريباً!");
      } else {
        setMarketer(data);
        setIsLoggedIn(true);
      }
    } catch (err) {
      alert("حدث خطأ أثناء الاتصال بالسيرفر.");
    } finally {
      setLoginLoading(false);
    }
  };

  // 2. دالة إرسال بيانات عميل جديد لقاعدة البيانات
  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketer) return;
    setClientSubmitting(true);

    try {
      const { error } = await supabase.from("client_requests").insert([
        {
          marketer_id: marketer.marketing_id,
          client_name: clientName,
          client_phone: clientPhone,
          status: "New",
        },
      ]);

      if (error) {
        alert(`❌ فشل إرسال بيانات العميل: ${error.message}`);
      } else {
        setClientSuccess(true);
        setClientName("");
        setClientPhone("");
        setTimeout(() => setClientSuccess(false), 4000); // إخفاء إشعار النجاح بعد 4 ثوانٍ
      }
    } catch (err) {
      alert("حدث خطأ غير متوقع.");
    } finally {
      setClientSubmitting(false);
    }
  };

  // 3. دالة تقديم طلب سحب رصيد
  const handleWithdrawRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketer) return;

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("يرجى إدخال مبلغ صحيح.");
      return;
    }

    if (amount > marketer.current_balance) {
      alert(`❌ الرصيد غير كافٍ! رصيدك المتاح حالياً هو ${marketer.current_balance} ر.ق`);
      return;
    }

    setWithdrawSubmitting(true);

    try {
      const { error } = await supabase.from("withdrawals").insert([
        {
          marketer_id: marketer.marketing_id,
          amount: amount,
          status: "Pending",
        },
      ]);

      if (error) {
        alert(`❌ فشل تقديم الطلب: ${error.message}`);
      } else {
        alert(`🎉 تم تقديم طلب سحب مبلغ ${amount} ر.ق بنجاح وهو قيد المراجعة الآن!`);
        setWithdrawAmount("");
      }
    } catch (err) {
      alert("حدث خطأ أثناء معالجة الطلب.");
    } finally {
      setWithdrawSubmitting(false);
    }
  };

  // --- واجهة تسجيل الدخول ---
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden" dir="rtl">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] top-1/4 left-1/4 pointer-events-none"></div>
        <div className="mb-8 text-center relative z-10">
          <h1 className="text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            لوحة تحكم المسوقين
          </h1>
          <p className="text-slate-400 text-sm">أدخل كود التسويق الخاص بك للوصول إلى حسابك وأرباحك</p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 w-full max-w-md shadow-2xl relative z-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">كود التسويق الخاص بك</label>
              <input
                type="text"
                required
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-slate-800 bg-slate-950/60 text-white font-mono focus:ring-2 focus:ring-sky-500 outline-none text-center tracking-widest uppercase placeholder:font-sans placeholder:text-sm placeholder:tracking-normal placeholder:text-slate-600"
                placeholder="مثال: M-1234"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full text-white font-bold py-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
              ) : (
                "دخول لوحة التحكم 🚀"
              )}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // --- واجهة لوحة التحكم الرئيسية بعد الدخول الفعلي ---
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12" dir="rtl">
      {/* رأس الصفحة والهيدر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-950/50 border border-sky-900 px-3 py-1 rounded-full">
            حساب معتمد | {marketer?.tier_level}
          </span>
          <h1 className="text-3xl font-black text-white mt-2">
            مرحباً بك يا {marketer?.name} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">كود التسويق النشط الخاص بك: <span className="font-mono text-sky-400 font-bold">{marketer?.marketing_id}</span></p>
        </div>
        <button
          onClick={() => { setIsLoggedIn(false); setInputCode(""); }}
          className="px-4 py-2 bg-slate-900 hover:bg-red-950/40 border border-slate-800 hover:border-red-900/30 text-slate-400 hover:text-red-400 rounded-xl text-xs font-bold transition-all"
        >
          تسجيل الخروج ⬅️
        </button>
      </div>

      {/* قسم الإحصائيات المالية المضيئة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
          <span className="text-xs font-bold text-slate-400 block mb-1">الرصيد المتاح حالياً للسحب</span>
          <span className="text-3xl font-black text-emerald-400 font-mono">{marketer?.current_balance} ر.ق</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl"></div>
          <span className="text-xs font-bold text-slate-400 block mb-1">إجمالي الأرباح التاريخية</span>
          <span className="text-3xl font-black text-sky-400 font-mono">{marketer?.total_earned} ر.ق</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* البوكس الأول: نموذج إدخال بيانات عميل جديد */}
        <div className="bg-slate-900/50 border border-slate-800/80 p-6 md:p-8 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-sky-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-white">إرسال بيانات عميل جديد</h2>
          </div>

          <form onSubmit={handleClientSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">اسم العميل بالكامل</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:ring-2 focus:ring-sky-500 outline-none text-sm"
                placeholder="مثال: عبد الله الكواري"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">رقم جوال العميل</label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setPhone(e.target.value)} // ملاحظة تعديل حقل الاتصال
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:ring-2 focus:ring-sky-500 outline-none text-sm text-right"
                placeholder="55XXXXXX"
                dir="ltr"
              />
            </div>

            <button
              type="submit"
              disabled={clientSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {clientSubmitting ? (
                <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
              ) : (
                "تسجيل العميل في النظام 📥"
              )}
            </button>

            {clientSuccess && (
              <div className="p-3 bg-emerald-950/50 border border-emerald-900 text-emerald-400 text-xs font-bold text-center rounded-xl animate-pulse">
                🎉 تم رفع بيانات العميل بنجاح! سيظهر في لوحة الإدارة لمتابعته وضخ عمولتك فور اكتماله.
              </div>
            )}
          </form>
        </div>

        {/* البوكس الثاني: طلب سحب المبالغ المالية */}
        <div className="bg-slate-900/50 border border-slate-800/80 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-white">طلب سحب الأرباح</h2>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              يمكنك تقديم طلب سحب للمبالغ المتوفرة في رصيدك الحالي. سيتم مراجعة الطلب وتحويل المبلغ لحسابك البنكي أو عبر المحفظة الإلكترونية مباشرة.
            </p>

            <form onSubmit={handleWithdrawRequest} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">المبلغ المطلوب سحبه (ر.ق)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">ر.ق</span>
                  <input
                    type="number"
                    required
                    min="1"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-mono font-bold"
                    placeholder="أدخل المبلغ هنا"
                    dir="ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={withdrawSubmitting || !marketer || marketer.current_balance <= 0}
                className={`w-full py-3.5 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                  !marketer || marketer.current_balance <= 0
                  ? "bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-800/50"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg"
                }`}
              >
                {withdrawSubmitting ? (
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "تقديم طلب سحب الرصيد 💰"
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 p-3 bg-slate-950 rounded-xl border border-slate-800/60 text-center text-[11px] text-slate-500 font-medium">
            Maridi Affiliate System v1.0 • 2026
          </div>
        </div>
      </div>
    </main>
  );
}