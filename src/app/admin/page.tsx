"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Marketer {
  marketing_id: string;
  name: string;
  phone_number: string;
  tier_level: string;
  current_balance: number;
  total_earned: number;
}

interface ClientRequest {
  id: number;
  marketer_id: string;
  client_name: string;
  client_phone: string;
  status: string;
  total_price: number;
  commission: number;
  commission_added: boolean;
  created_at: string;
}

interface Withdrawal {
  id: number;
  marketer_id: string;
  amount: number;
  status: string;
  requested_at: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"marketers" | "projects" | "withdrawals">("marketers");
  const [pendingMarketers, setPendingMarketers] = useState<Marketer[]>([]);
  const [activeMarketers, setActiveMarketers] = useState<Marketer[]>([]);
  const [projects, setProjects] = useState<ClientRequest[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);

  // متغيرات مؤقتة لتحديث قيم المشروع عند إكماله
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [totalPriceInput, setTotalPriceInput] = useState("");
  const [commissionInput, setCommissionInput] = useState("");

  const fetchData = async () => {
    setLoading(true);
    
    // 1. جلب المسوقين
    const { data: pending } = await supabase.from("marketers").select("*").eq("tier_level", "Pending");
    const { data: active } = await supabase.from("marketers").select("*").not("tier_level", "eq", "Pending");
    
    // 2. جلب المشاريع والعملاء
    const { data: projs } = await supabase.from("client_requests").select("*").order("id", { ascending: false });
    
    // 3. جلب طلبات السحب
    const { data: wdraws } = await supabase.from("withdrawals").select("*").order("id", { ascending: false });

    if (pending) setPendingMarketers(pending);
    if (active) setActiveMarketers(active);
    if (projs) setProjects(projs);
    if (wdraws) setWithdrawals(wdraws);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // دالة تفعيل حساب مسوق
  const handleApproveMarketer = async (id: string) => {
    const { error } = await supabase.from("marketers").update({ tier_level: "Bronze" }).eq("marketing_id", id);
    if (!error) { alert("تم تفعيل المسوق!"); fetchData(); }
  };

  // دالة حذف مسوق أو طلب معلق
  const handleDeleteMarketer = async (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف ${name} نهائياً؟`)) {
      const { error } = await supabase.from("marketers").delete().eq("marketing_id", id);
      if (!error) { alert("تم الحذف بنجاح"); fetchData(); }
    }
  };

  // دالة تحديث حالة المشروع إلى "قيد العمل"
  const handleStartProject = async (projectId: number) => {
    const { error } = await supabase.from("client_requests").update({ status: "In_Progress" }).eq("id", projectId);
    if (!error) { alert("تم تحويل المشروع إلى قيد التنفيذ 🛠️"); fetchData(); }
  };

  // دالة إنهاء المشروع وحساب العمولات وضخها في رصيد المسوق تلقائياً
  const handleCompleteProject = async (project: ClientRequest) => {
    const price = parseFloat(totalPriceInput);
    const comm = parseFloat(commissionInput);

    if (isNaN(price) || isNaN(comm) || price <= 0 || comm <= 0) {
      alert("يرجى إدخال مبالغ صحيحة للمشروع والعمولة.");
      return;
    }

    // 1. تحديث بيانات المشروع وإغلاقه
    const { error: projError } = await supabase
      .from("client_requests")
      .update({
        status: "Completed",
        total_price: price,
        commission: comm,
        commission_added: true
      })
      .eq("id", project.id);

    if (projError) {
      alert("حدث خطأ أثناء تحديث المشروع.");
      return;
    }

    // 2. جلب رصيد المسوق الحالي لزيادته
    const { data: marketer } = await supabase
      .from("marketers")
      .select("current_balance, total_earned")
      .eq("marketing_id", project.marketer_id)
      .single();

    if (marketer) {
      const newBalance = Number(marketer.current_balance) + comm;
      const newTotalEarned = Number(marketer.total_earned) + comm;

      // 3. ضخ الأرباح في محفظة المسوق
      await supabase
        .from("marketers")
        .update({ current_balance: newBalance, total_earned: newTotalEarned })
        .eq("marketing_id", project.marketer_id);
    }

    alert(`🎉 تم إغلاق المشروع بنجاح وضخ عمولة بمبلغ ${comm} ر.ق في حساب المسوق!`);
    setEditingProjectId(null);
    setTotalPriceInput("");
    setCommissionInput("");
    fetchData();
  };

  // دالة حذف مشروع (جديدة بالكامل)
  const handleDeleteProject = async (projectId: number, clientName: string) => {
    if (window.confirm(`هل أنت متأكد من حذف مشروع العميل "${clientName}" نهائياً من النظام؟`)) {
      const { error } = await supabase.from("client_requests").delete().eq("id", projectId);
      if (!error) {
        alert("تم حذف المشروع بنجاح 🗑️");
        fetchData();
      } else {
        alert("حدث خطأ أثناء محاولة حذف المشروع.");
      }
    }
  };

  // دالة الموافقة على طلب السحب المالي وخصمه من رصيد المسوق
  const handleApproveWithdrawal = async (withdraw: Withdrawal) => {
    if (!window.confirm(`هل قمت بتحويل مبلغ ${withdraw.amount} ر.ق للمسوق بالفعل وتريد اعتماد الطلب برمجياً؟`)) return;

    // 1. تحديث حالة السحب إلى معتمد
    const { error } = await supabase.from("withdrawals").update({ status: "Approved" }).eq("id", withdraw.id);
    
    if (error) {
      alert("حدث خطأ في تحديث حالة السحب.");
      return;
    }

    // 2. جلب رصيد المسوق الحالي لخصم المبلغ منه
    const { data: marketer } = await supabase
      .from("marketers")
      .select("current_balance")
      .eq("marketing_id", withdraw.marketer_id)
      .single();

    if (marketer) {
      const newBalance = Number(marketer.current_balance) - Number(withdraw.amount);
      
      // 3. تحديث الرصيد بعد الخصم
      await supabase.from("marketers").update({ current_balance: newBalance }).eq("marketing_id", withdraw.marketer_id);
    }

    alert("✅ تم اعتماد السحب وتحديث محفظة المسوق بنجاح!");
    fetchData();
  };

  // دالة حذف طلب سحب مالي (جديدة بالكامل)
  const handleDeleteWithdrawal = async (withdrawId: number, marketerId: string, amount: number) => {
    if (window.confirm(`هل أنت متأكد من حذف طلب السحب التابع للمسوق (${marketerId}) بقيمة ${amount} ر.ق نهائياً؟`)) {
      const { error } = await supabase.from("withdrawals").delete().eq("id", withdrawId);
      if (!error) {
        alert("تم حذف طلب السحب بنجاح 🗑️");
        fetchData();
      } else {
        alert("حدث خطأ أثناء محاولة حذف طلب السحب.");
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12" dir="rtl">
      {/* هيدر اللوحة */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            لوحة الإدارة المتكاملة | مريدي أفلييت
          </h1>
          <p className="text-slate-400 mt-1">التحكم الشامل بالمسوقين، المشاريع، والعمليات المالية بالريال القطري</p>
        </div>
        <button onClick={fetchData} className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-sm font-semibold transition-all">
          تحديث البيانات الحية 🔄
        </button>
      </div>

      {/* أزرار التبويبات العصرية (Tabs) */}
      <div className="flex gap-4 border-b border-slate-900 pb-4 mb-8">
        <button
          onClick={() => setActiveTab("marketers")}
          className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "marketers" ? "bg-sky-600 text-white shadow-lg shadow-sky-950" : "bg-slate-900 text-slate-400 hover:bg-slate-800"}`}
        >
          👤 إدارة المسوقين
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "projects" ? "bg-sky-600 text-white shadow-lg shadow-sky-950" : "bg-slate-900 text-slate-400 hover:bg-slate-800"}`}
        >
          📁 طلبات المشاريع ({projects.filter(p => p.status !== 'Completed').length})
        </button>
        <button
          onClick={() => setActiveTab("withdrawals")}
          className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "withdrawals" ? "bg-sky-600 text-white shadow-lg shadow-sky-950" : "bg-slate-900 text-slate-400 hover:bg-slate-800"}`}
        >
          💰 طلبات السحب المالية ({withdrawals.filter(w => w.status === 'Pending').length})
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* ===================== TAB 1: MARKETERS ===================== */}
          {activeTab === "marketers" && (
            <div className="space-y-8">
              {/* قيد الانتظار */}
              <section>
                <h2 className="text-lg font-bold mb-4 text-amber-400 flex items-center gap-2">⏱️ طلبات انضمام جديدة ({pendingMarketers.length})</h2>
                {pendingMarketers.length === 0 ? (
                  <div className="bg-slate-900/40 p-6 rounded-2xl text-center text-slate-500 border border-slate-900">لا توجد طلبات معلقة.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingMarketers.map(m => (
                      <div key={m.marketing_id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-white mb-2">{m.name}</h3>
                          <p className="text-xs text-slate-400">الجوال: <span className="font-mono text-slate-200">{m.phone_number}</span></p>
                          <p className="text-xs text-slate-400 mt-1">الرمز: <span className="font-mono text-sky-400 font-bold">{m.marketing_id}</span></p>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button onClick={() => handleApproveMarketer(m.marketing_id)} className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 rounded-xl text-xs transition-all">تفعيل الحساب</button>
                          <button onClick={() => handleDeleteMarketer(m.marketing_id, m.name)} className="px-3 py-2 bg-red-950/40 border border-red-900/40 text-red-400 font-bold rounded-xl text-xs transition-all">حذف</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* المعتمدين */}
              <section>
                <h2 className="text-lg font-bold mb-4 text-emerald-400 flex items-center gap-2">✅ المسوقون المعتمدون ({activeMarketers.length})</h2>
                {activeMarketers.length === 0 ? (
                  <div className="bg-slate-900/40 p-6 rounded-2xl text-center text-slate-500 border border-slate-900">لم يتم اعتماد أي مسوق بعد.</div>
                ) : (
                  <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800">
                    <table className="w-full text-right border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400 text-xs">
                          <th className="p-4">كود التسويق</th>
                          <th className="p-4">الاسم</th>
                          <th className="p-4">رقم الجوال</th>
                          <th className="p-4">الرصيد الحالي</th>
                          <th className="p-4">إجمالي الأرباح</th>
                          <th className="p-4 text-center">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40 text-xs">
                        {activeMarketers.map(m => (
                          <tr key={m.marketing_id} className="hover:bg-slate-800/20">
                            <td className="p-4 font-mono font-bold text-sky-400">{m.marketing_id}</td>
                            <td className="p-4 font-bold text-white">{m.name}</td>
                            <td className="p-4 font-mono text-slate-300">{m.phone_number}</td>
                            <td className="p-4 font-bold text-emerald-400">{m.current_balance} ر.ق</td>
                            <td className="p-4 text-slate-300">{m.total_earned} ر.ق</td>
                            <td className="p-4 text-center">
                              <button onClick={() => handleDeleteMarketer(m.marketing_id, m.name)} className="px-2.5 py-1.5 bg-red-950/30 text-red-400 rounded-lg text-[11px] font-bold border border-red-900/30 hover:bg-red-900/30 transition-all">حذف الحساب</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </div>
          )}

          {/* ===================== TAB 2: PROJECTS ===================== */}
          {activeTab === "projects" && (
            <section>
              <h2 className="text-lg font-bold mb-4 text-white">🗂️ إدارة طلبات المشاريع الواردة من المسوقين</h2>
              {projects.length === 0 ? (
                <div className="bg-slate-900/40 p-6 rounded-2xl text-center text-slate-500 border border-slate-900">لا توجد طلبات مشاريع مسجلة حالياً.</div>
              ) : (
                <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400 text-xs">
                        <th className="p-4">المسوق</th>
                        <th className="p-4">اسم العميل</th>
                        <th className="p-4">جوال العميل</th>
                        <th className="p-4">حالة المشروع</th>
                        <th className="p-4">سعر المشروع</th>
                        <th className="p-4">عمولة المسوق</th>
                        <th className="p-4 text-center">الإجراء والتحكم</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-xs">
                      {projects.map(p => (
                        <tr key={p.id} className="hover:bg-slate-800/20">
                          <td className="p-4 font-mono text-sky-400 font-bold">{p.marketer_id}</td>
                          <td className="p-4 font-bold text-white">{p.client_name}</td>
                          <td className="p-4 font-mono text-slate-300">{p.client_phone}</td>
                          <td className="p-4">
                            {p.status === "New" && <span className="px-2 py-0.5 bg-blue-950 text-blue-400 border border-blue-900 rounded text-[11px]">جديد</span>}
                            {p.status === "In_Progress" && <span className="px-2 py-0.5 bg-amber-950 text-amber-400 border border-amber-900 rounded text-[11px] animate-pulse">قيد التنفيذ</span>}
                            {p.status === "Completed" && <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-900 rounded text-[11px]">مكتمل ومغلق</span>}
                          </td>
                          <td className="p-4 font-mono text-slate-300">{p.total_price} ر.ق</td>
                          <td className="p-4 font-mono font-bold text-emerald-400">{p.commission} ر.ق</td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                              {p.status === "New" && (
                                <button onClick={() => handleStartProject(p.id)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition-all">بدء المشروع 🛠️</button>
                              )}
                              {p.status === "In_Progress" && editingProjectId !== p.id && (
                                <button onClick={() => setEditingProjectId(p.id)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-500 transition-all">إغلاق وضخ الأرباح 💰</button>
                              )}
                              
                              {/* واجهة إدخال العمولات الفورية عند الضغط على إغلاق */}
                              {editingProjectId === p.id && (
                                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right space-y-3 inline-block max-w-xs">
                                  <span className="block text-[11px] font-bold text-amber-400">حساب عمولة الإغلاق لـ {p.client_name}:</span>
                                  <input type="number" placeholder="سعر المشروع الكلي" value={totalPriceInput} onChange={(e)=>setTotalPriceInput(e.target.value)} className="w-full px-2 py-1 bg-slate-900 rounded border border-slate-800 text-xs text-white"/>
                                  <input type="number" placeholder="عمولة المسوق الصافية" value={commissionInput} onChange={(e)=>setCommissionInput(e.target.value)} className="w-full px-2 py-1 bg-slate-900 rounded border border-slate-800 text-xs text-white"/>
                                  <div className="flex gap-2">
                                    <button onClick={() => handleCompleteProject(p)} className="flex-1 py-1.5 bg-emerald-600 text-white text-[11px] font-bold rounded">تأكيد وضخ الرصيد</button>
                                    <button onClick={() => setEditingProjectId(null)} className="px-2 py-1.5 bg-slate-800 text-slate-400 text-[11px] rounded">إلغاء</button>
                                  </div>
                                </div>
                              )}

                              {p.status === "Completed" && (
                                <span className="text-slate-500 text-[11px] font-medium">العمولة حُوّلت للساب 💎</span>
                              )}

                              {/* 🗑️ زر حذف المشروع المضاف حديثاً بجميع حالاته */}
                              <button 
                                onClick={() => handleDeleteProject(p.id, p.client_name)} 
                                className="px-2.5 py-1.5 bg-red-950/30 text-red-400 rounded-lg text-[11px] font-bold border border-red-900/30 hover:bg-red-900/30 transition-all"
                              >
                                حذف 🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* ===================== TAB 3: WITHDRAWALS ===================== */}
          {activeTab === "withdrawals" && (
            <section>
              <h2 className="text-lg font-bold mb-4 text-white">💰 إدارة طلبات سحب الأرباح الواردة</h2>
              {withdrawals.length === 0 ? (
                <div className="bg-slate-900/40 p-6 rounded-2xl text-center text-slate-500 border border-slate-900">لا توجد طلبات سحب مالي مسجلة حالياً.</div>
              ) : (
                <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400 text-xs">
                        <th className="p-4">كود المسوق</th>
                        <th className="p-4">المبلغ المطلوب سحبه</th>
                        <th className="p-4">حالة الطلب</th>
                        <th className="p-4 text-center">الإجراء والتحكم</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-xs">
                      {withdrawals.map(w => (
                        <tr key={w.id} className="hover:bg-slate-800/20">
                          <td className="p-4 font-mono font-bold text-sky-400">{w.marketer_id}</td>
                          <td className="p-4 font-bold text-white font-mono">{w.amount} ر.ق</td>
                          <td className="p-4">
                            {w.status === "Pending" && <span className="px-2 py-0.5 bg-amber-950 text-amber-400 border border-amber-900 rounded text-[11px] animate-pulse">قيد الانتظار</span>}
                            {w.status === "Approved" && <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-900 rounded text-[11px]">تم التحويل والاعتماد</span>}
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                              {w.status === "Pending" ? (
                                <button onClick={() => handleApproveWithdrawal(w)} className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-500 transition-all">اعتماد وتحويل الأموال ✅</button>
                              ) : (
                                <span className="text-slate-500 text-[11px]">مكتمل ومغلق 📦</span>
                              )}

                              {/* 🗑️ زر حذف طلب السحب المضاف حديثاً بجميع حالاته */}
                              <button 
                                onClick={() => handleDeleteWithdrawal(w.id, w.marketer_id, w.amount)} 
                                className="px-2.5 py-1.5 bg-red-950/30 text-red-400 rounded-lg text-[11px] font-bold border border-red-900/30 hover:bg-red-900/30 transition-all"
                              >
                                حذف 🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

        </div>
      )}
    </main>
  );
}