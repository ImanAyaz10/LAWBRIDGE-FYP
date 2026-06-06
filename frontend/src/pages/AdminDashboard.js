import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Users, UserPlus, Calendar, BarChart3, Clock, Loader2, AlertCircle } from "lucide-react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const stats = [
    { label: "Total Users", value: "3,450", icon: <Users size={24} />, color: "text-blue-600 bg-blue-50" },
    { label: "Verified Lawyers", value: "120", icon: <UserPlus size={24} />, color: "text-emerald-600 bg-emerald-50" },
    { label: "Total Appointments", value: "250", icon: <Calendar size={24} />, color: "text-purple-600 bg-purple-50" },
    { label: "Reports", value: "75", icon: <BarChart3 size={24} />, color: "text-red-600 bg-red-50" },
  ];

  useEffect(() => {
    const fetchRecentLawyers = async () => {
      try {
        const response = await API.get("/admin/users");
        // Filter out lawyers and sort by createdAt descending
        const allLawyers = response.data
          .filter(user => user.role === 'lawyer')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLawyers(allLawyers.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch lawyers for overview", err);
        setError("Could not fetch registered lawyers.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentLawyers();
  }, []);

  return (
    <DashboardLayout role="Admin" user="Admin">
      <div className="space-y-8">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {stats.map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${stat.color}`}>
                   {stat.icon}
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                   <h3 className="text-2xl font-black text-slate-800 font-poppins">{stat.value}</h3>
                </div>
             </div>
           ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Recent Lawyers */}
           <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-bold text-slate-800 font-poppins">Recent Registered Lawyers</h2>
                 <button 
                  onClick={() => navigate("/admin-lawyers")} 
                  className="text-emerald-600 font-bold text-sm hover:underline"
                 >
                   View All
                 </button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-2">
                  <Loader2 className="animate-spin text-emerald-600" size={32} />
                  <p className="text-sm font-bold">Loading lawyers...</p>
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-2xl border border-red-100 text-sm font-bold">
                  <AlertCircle size={18} /> {error}
                </div>
              ) : lawyers.length === 0 ? (
                <p className="text-slate-500 font-medium text-center py-12">No registered lawyers found.</p>
              ) : (
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-50">
                            <th className="pb-4 px-4 font-black">Name</th>
                            <th className="pb-4 px-4 font-black">Specialization</th>
                            <th className="pb-4 px-4 font-black text-center">Exp.</th>
                            <th className="pb-4 px-4 font-black">City</th>
                            <th className="pb-4 px-4 font-black text-right">Email</th>
                         </tr>
                      </thead>
                      <tbody>
                         {lawyers.map((lawyer, i) => (
                           <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                              <td className="py-4 px-4 font-bold text-slate-700">{lawyer.name}</td>
                              <td className="py-4 px-4 text-slate-500 text-sm">{lawyer.specialization || "General"}</td>
                              <td className="py-4 px-4 text-center font-bold text-slate-400">{lawyer.experience ? `${lawyer.experience} Years` : "N/A"}</td>
                              <td className="py-4 px-4 text-slate-500 text-sm">{lawyer.city || "N/A"}</td>
                              <td className="py-4 px-4 text-right text-slate-600 text-sm font-medium">{lawyer.email}</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
              )}
           </div>

           {/* Reports Overview Widgets */}
           <div className="space-y-6">
              <div className="bg-[#032b21] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold font-poppins">Reports Overview</h3>
                    <Clock size={16} className="text-emerald-400" />
                 </div>
                 <div className="space-y-4">
                    {[
                      { label: "Users Growth", val: "+45%", color: "bg-emerald-500" },
                      { label: "Appointments", val: "88%", color: "bg-blue-500" },
                      { label: "Revenue", val: "PKR 450k", color: "bg-yellow-500" },
                      { label: "Documents", val: "2,4k+", color: "bg-purple-500" },
                    ].map((rep, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                         <span className="text-emerald-100/60 text-xs font-bold uppercase tracking-widest">{rep.label}</span>
                         <span className="font-black text-sm">{rep.val}</span>
                      </div>
                    ))}
                 </div>
              </div>
              
              <button 
                onClick={() => navigate("/admin-reports")}
                className="w-full bg-white border border-slate-200 py-4 rounded-2xl font-bold text-slate-800 shadow-sm hover:shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                 <BarChart3 size={20} className="text-emerald-600" />
                 Generate Global Report
              </button>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;