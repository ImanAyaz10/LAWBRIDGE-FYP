import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Clock, AlertCircle } from "lucide-react";
import API from "../services/api";

function LawyerAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const fetchAppointments = async () => {
    try {
      const response = await API.get("/appointments/my");
      setAppointments(response.data);
    } catch (err) {
      setError("Failed to fetch your appointments.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await API.put(`/appointments/${id}`, { status: action });
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout role="Lawyer" user={userInfo.name || "Lawyer"}>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
         {/* Banner Card */}
         <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
           <div className="text-left space-y-2">
              <h2 className="text-3xl font-black font-poppins">Manage Schedule</h2>
              <p className="text-emerald-100/70 font-medium text-sm">Review, accept, or reject client consultation requests.</p>
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
           <div className="space-y-4">
              {appointments.length > 0 ? (
                appointments.map((app, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-md transition-all hover:shadow-xl">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 font-black text-xl">
                         {app.userId?.name?.charAt(0) || "C"}
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-800 text-lg">{app.userId?.name || "Client"}</h4>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{app.userId?.email || "No Email"}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2 text-slate-500 font-medium">
                          <Clock size={16} />
                          <span className="text-sm">
                            {new Date(app.date).toLocaleDateString()} - {app.time}
                          </span>
                       </div>
                       <div className="flex items-center gap-3">
                          {app.status === 'Pending' ? (
                            <>
                              <button 
                                onClick={() => handleAction(app._id, 'Accepted')}
                                className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-md active:scale-95"
                              >
                                Accept
                              </button>
                              <button 
                                onClick={() => handleAction(app._id, 'Rejected')}
                                className="bg-red-50 text-red-600 px-5 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-all active:scale-95"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase ${
                              app.status === 'Accepted' ? "text-emerald-600 bg-emerald-50 border border-emerald-100" : "text-red-600 bg-red-50 border border-red-100"
                            }`}>
                               {app.status}
                            </span>
                          )}
                       </div>
                    </div>
                 </div>
                ))
              ) : (
                <div className="text-center py-20 text-slate-400 font-bold bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  No appointment requests yet.
                </div>
              )}
           </div>
         )}
      </div>
    </DashboardLayout>
  );
}

export default LawyerAppointments;
