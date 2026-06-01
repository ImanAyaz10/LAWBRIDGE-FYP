import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ClientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get("/appointments/my");
        setAppointments(response.data);
      } catch (err) {
        setError("Failed to fetch your appointments. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <DashboardLayout role="Client" user={userInfo.name || "User"}>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
         {/* Banner Card */}
         <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
           <div className="text-left space-y-2">
              <h2 className="text-3xl font-black font-poppins">My Appointments</h2>
              <p className="text-emerald-100/70 font-medium text-sm">Review your booked consultations and connect with lawyers.</p>
           </div>
           <button 
             onClick={() => navigate("/lawyers")}
             className="bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 text-sm"
           >
             Book Consultation
           </button>
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
           <div className="space-y-4">
              {appointments.length > 0 ? (
                appointments.map((app, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-md transition-all hover:shadow-xl">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 font-black text-xl">
                         {app.lawyerId?.name?.charAt(0) || "L"}
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-800 text-lg">{app.lawyerId?.name || "Lawyer"}</h4>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{app.lawyerId?.specialization || "Legal Expert"}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-10">
                       <div className="flex items-center gap-2 text-slate-500 font-medium">
                          <Clock size={16} />
                          <span className="text-sm">
                            {new Date(app.date).toLocaleDateString()} - {app.time}
                          </span>
                       </div>
                       <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase ${
                         app.status === 'Accepted' ? "text-emerald-600 bg-emerald-50 border border-emerald-100" : 
                         app.status === 'Pending' ? "text-yellow-600 bg-yellow-50 border border-yellow-100" : 
                         "text-slate-600 bg-slate-50 border border-slate-100"
                       }`}>
                          {app.status}
                       </span>
                       {app.status === 'Accepted' && (
                         <button className="px-5 py-2.5 bg-[#0f4c3a] text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg active:scale-95">
                           Join Video Call
                         </button>
                       )}
                    </div>
                 </div>
                ))
              ) : (
                <div className="text-center py-20 text-slate-400 font-bold bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  No appointments found. Book a consultation to get started!
                </div>
              )}
           </div>
         )}
      </div>
    </DashboardLayout>
  );
}

export default ClientAppointments;
