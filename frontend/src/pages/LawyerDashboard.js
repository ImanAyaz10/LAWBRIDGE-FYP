import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { MessageSquare, UserCheck, TrendingUp, AlertCircle, Clock } from "lucide-react";
import API from "../services/api";

function LawyerDashboard() {
  const [data, setData] = useState({
    appointments: [],
    stats: { pending: 0, accepted: 0, total: 0 },
    reminders: [],
    notifications: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await API.get("/dashboard");
        setData(response.data);
      } catch (err) {
        setError("Failed to load dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleAction = async (id, action) => {
    try {
      let payload = { status: action };
      if (action === 'Rejected') {
        const reason = window.prompt("Please enter a reason for rejecting this appointment (optional):");
        if (reason === null) return; // user cancelled
        payload.rejectionReason = reason;
      }
      await API.put(`/appointments/${id}`, payload);
      // Refresh data
      const response = await API.get("/dashboard");
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <DashboardLayout role="Lawyer" user={userInfo.name || "Lawyer"}>
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout role="Lawyer" user={userInfo.name || "Lawyer"}>
      {/* Reminders Banner */}
      {data.reminders && data.reminders.length > 0 && (
        <div className="mb-8 space-y-4">
          {data.reminders.map((reminder, idx) => (
            <div key={idx} className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-3xl p-6 shadow-lg flex items-center justify-between gap-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{reminder.title}</h4>
                  <p className="text-sm text-white/90">{reminder.message}</p>
                </div>
              </div>
              {reminder.consultationType === "Video" && (
                <button
                  onClick={() => navigate(`/consultation/${reminder.id}`)}
                  className="bg-white text-orange-600 font-bold px-6 py-2.5 rounded-xl hover:bg-orange-50 transition-all active:scale-95 text-xs shadow-md whitespace-nowrap"
                >
                  Join Consultation Room
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Notifications Alerts */}
      {data.notifications && data.notifications.length > 0 && (
        <div className="mb-8 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Updates & Notifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.notifications.slice(0, 4).map((notif, idx) => (
              <div key={idx} className="p-5 rounded-2xl border flex items-start gap-4 shadow-sm bg-yellow-50 border-yellow-100 text-yellow-800">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-yellow-500 text-white">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{notif.title}</h4>
                  <p className="text-xs opacity-90 mt-1">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Appointment Requests */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-bold text-slate-800 font-poppins">Appointment Requests</h2>
                 <button onClick={() => navigate("/lawyer-appointments")} className="text-emerald-600 font-bold text-sm hover:underline">View All</button>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                 {data.appointments.length > 0 ? (
                   data.appointments.map((req, i) => (
                    <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-md group space-y-4">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-lg shrink-0">
                               {req.userId?.name?.charAt(0) || "C"}
                             </div>
                             <div>
                                <h4 className="font-bold text-slate-800">{req.userId?.name || "Client"}</h4>
                                <p className="text-xs text-slate-400 font-medium">
                                  {new Date(req.date).toLocaleDateString()} • {req.time}
                                </p>
                             </div>
                          </div>
                          <div className="flex items-center gap-3">
                             {req.status === 'Pending' ? (
                               <>
                                 <button 
                                   onClick={() => handleAction(req._id, 'Accepted')}
                                   className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
                                    Accept
                                 </button>
                                 <button 
                                   onClick={() => handleAction(req._id, 'Rejected')}
                                   className="bg-red-50 text-red-600 px-6 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-all active:scale-95">
                                    Reject
                                 </button>
                               </>
                             ) : (
                               <div className="flex items-center gap-2">
                                 <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                                   req.status === 'Confirmed' || req.status === 'Accepted' ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
                                 }`}>
                                    {req.status}
                                 </span>
                                 {(req.status === 'Confirmed' || req.status === 'Accepted') && req.consultationType === 'Video' && (
                                   <button 
                                     onClick={() => navigate(`/consultation/${req._id}`)}
                                     className="bg-emerald-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-md">
                                      Join Call
                                   </button>
                                 )}
                               </div>
                             )}
                          </div>
                       </div>

                       {/* Appointment Details Section */}
                       <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                             <span className="text-xs font-bold text-slate-700 font-poppins">Subject: {req.subject || "General Consultation"}</span>
                             <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                               req.consultationType === 'Video' ? 'bg-blue-50 text-blue-600' :
                               req.consultationType === 'Audio' ? 'bg-purple-50 text-purple-600' :
                               'bg-teal-50 text-teal-600'
                             }`}>
                                {req.consultationType}
                             </span>
                          </div>
                          {req.notes && (
                             <p className="text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-100">
                                <span className="font-semibold text-slate-700">Notes:</span> {req.notes}
                             </p>
                          )}
                          {req.status === 'Rejected' && req.rejectionReason && (
                             <p className="text-xs text-red-600 bg-red-50/50 p-3 rounded-xl border border-red-100">
                                <span className="font-bold">Rejection Reason:</span> {req.rejectionReason}
                             </p>
                          )}
                       </div>
                    </div>
                   ))
                 ) : (
                   <div className="text-center py-10 text-slate-400 font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                     No appointment requests yet.
                   </div>
                 )}
              </div>
           </div>

           {/* Recent Messages */}
           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-bold text-slate-800 font-poppins">Recent Messages</h2>
                 <button className="text-emerald-600 font-bold text-sm hover:underline">View All</button>
              </div>

              <div className="flex items-center gap-4 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                 <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                    <MessageSquare size={20} />
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-slate-800">Ayesha Khan</h4>
                    <p className="text-xs text-slate-500">Please review the documents I uploaded today.</p>
                 </div>
                 <button className="text-emerald-600 text-sm font-bold uppercase tracking-widest">Reply</button>
              </div>
           </div>
        </div>

        {/* Right Column: Stats & Profile */}
        <div className="space-y-8">
           <div className="bg-[#032b21] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10">
                 <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">Pending Requests</p>
                 <h3 className="text-3xl font-bold mb-6 font-poppins">{data.stats.pending}</h3>
                 <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-8">
                    <TrendingUp size={16} /> {data.stats.total} Total Appointments
                 </div>
                 <button onClick={() => navigate("/lawyer-appointments")} className="w-full bg-emerald-600 py-4 rounded-xl font-bold hover:bg-emerald-500 transition-all shadow-lg">
                    Manage Schedule
                 </button>
              </div>
           </div>

           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 font-poppins mb-6">Expert Rating</h2>
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-1 text-yellow-500">
                    {[1,2,3,4,5].map(i => <UserCheck key={i} size={18} fill="currentColor" />)}
                 </div>
                 <span className="text-2xl font-black text-slate-800">4.9/5</span>
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mb-2">Accepted Rate</p>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="w-[98%] h-full bg-emerald-500 rounded-full" />
              </div>
              <p className="text-[10px] text-slate-400 font-bold mt-4">Top 5% of legal professionals this month.</p>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default LawyerDashboard;