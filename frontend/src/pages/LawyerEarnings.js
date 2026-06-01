import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { DollarSign, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import API from "../services/api";

function LawyerEarnings() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await API.get("/appointments/my");
        // Only count accepted/completed appointments
        const relevant = response.data.filter(
          (a) => a.status === "Accepted" || a.status === "Completed"
        );
        setAppointments(relevant);
      } catch (err) {
        setError("Failed to load earnings data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  const totalEarnings = appointments.length * 2000; // Rs. 2000 per consultation
  const thisMonth = appointments.filter((a) => {
    const d = new Date(a.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthlyEarnings = thisMonth.length * 2000;

  return (
    <DashboardLayout role="Lawyer" user={userInfo.name || "Lawyer"}>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
         {/* Banner Card */}
         <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
           <div className="space-y-2">
              <h2 className="text-3xl font-black font-poppins">My Earnings</h2>
              <p className="text-emerald-100/70 font-medium text-sm">Track your consultation earnings and financial overview.</p>
           </div>
         </div>

         {error && (
           <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-2 border border-red-100">
             <AlertCircle size={18} />
             <span className="font-bold">{error}</span>
           </div>
         )}

         {loading ? (
           <div className="flex items-center justify-center h-48">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
           </div>
         ) : (
           <>
             {/* Summary Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-8 text-center transition-all hover:shadow-xl">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="text-emerald-600" size={28} />
                  </div>
                  <div className="text-3xl font-black text-emerald-700">Rs. {totalEarnings.toLocaleString()}</div>
                  <div className="text-xs text-slate-400 font-bold mt-2 tracking-wider uppercase">Total Earnings</div>
                </div>
                <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-8 text-center transition-all hover:shadow-xl">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="text-blue-600" size={28} />
                  </div>
                  <div className="text-3xl font-black text-blue-700">Rs. {monthlyEarnings.toLocaleString()}</div>
                  <div className="text-xs text-slate-400 font-bold mt-2 tracking-wider uppercase">This Month</div>
                </div>
                <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-8 text-center transition-all hover:shadow-xl">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="text-amber-600" size={28} />
                  </div>
                  <div className="text-3xl font-black text-amber-700">{appointments.length}</div>
                  <div className="text-xs text-slate-400 font-bold mt-2 tracking-wider uppercase">Consultations</div>
                </div>
             </div>

             {/* Transactions Table */}
             <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-black text-slate-800">Recent Consultations</h3>
                </div>
                {appointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                         <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider">
                           <th className="px-6 py-4">Client</th>
                           <th className="px-6 py-4">Date</th>
                           <th className="px-6 py-4">Status</th>
                           <th className="px-6 py-4 text-right">Amount</th>
                         </tr>
                       </thead>
                       <tbody>
                         {appointments.map((app, i) => (
                           <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                             <td className="px-6 py-4">
                               <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-black text-xs">
                                   {(app.userId?.name || "C").charAt(0)}
                                 </div>
                                 <span className="font-bold text-sm text-slate-700">{app.userId?.name || "Client"}</span>
                               </div>
                             </td>
                             <td className="px-6 py-4 text-sm text-slate-500 font-medium">{new Date(app.date).toLocaleDateString()}</td>
                             <td className="px-6 py-4">
                               <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase ${
                                 app.status === 'Accepted' ? "text-emerald-600 bg-emerald-50 border border-emerald-100" :
                                 "text-blue-600 bg-blue-50 border border-blue-100"
                               }`}>{app.status}</span>
                             </td>
                             <td className="px-6 py-4 text-right font-black text-slate-700 text-sm">Rs. 2,000</td>
                           </tr>
                         ))}
                       </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-400 font-bold">
                    <DollarSign className="mx-auto mb-4 text-slate-300" size={48} />
                    No earnings yet. Complete consultations to start earning.
                  </div>
                )}
             </div>
           </>
         )}
      </div>
    </DashboardLayout>
  );
}

export default LawyerEarnings;
