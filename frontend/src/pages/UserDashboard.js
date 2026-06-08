import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Clock, MessageSquare, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import API from "../services/api";

function UserDashboard() {
  const [data, setData] = useState({
    appointments: [],
    cases: [],
    reminders: [],
    notifications: [],
    stats: { totalCases: 0, totalAppointments: 0 }
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
        setError("Failed to load dashboard data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const recentChats = [
    { name: "AI Legal Assistant", sub: "Universal laws of Pakistan...", time: "2m ago", img: "bot" },
  ];

  const documents = [
    { name: "Affidavit.pdf", date: "Uploaded on 12 May" },
  ];

  if (loading) return (
    <DashboardLayout role="Client" user={userInfo.name || "User"}>
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout role="Client" user={userInfo.name || "User"}>
      {/* Reminders Banner */}
      {data.reminders && data.reminders.length > 0 && (
        <div className="mb-8 space-y-4">
          {data.reminders.map((reminder, idx) => (
            <div key={idx} className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-3xl p-6 shadow-lg flex items-center justify-between gap-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
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
              <div key={idx} className={`p-5 rounded-2xl border flex items-start gap-4 shadow-sm ${
                notif.type === 'confirmed' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
                notif.type === 'rejected' ? 'bg-red-50 border-red-100 text-red-800' :
                'bg-slate-50 border-slate-100 text-slate-700'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  notif.type === 'confirmed' ? 'bg-emerald-500 text-white' :
                  notif.type === 'rejected' ? 'bg-red-500 text-white' :
                  'bg-slate-400 text-white'
                }`}>
                  <CheckCircle2 size={20} />
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
        
        {/* Left Column: Appointments & Chats */}
        <div className="lg:col-span-2 space-y-8">
           {/* Appointments Section */}
           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-bold text-slate-800 font-poppins">My Appointments</h2>
                 <button onClick={() => navigate("/client-appointments")} className="text-emerald-600 font-bold text-sm hover:underline">View All</button>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                 {data.appointments.length > 0 ? (
                   data.appointments.map((app, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-md group">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-lg">
                            {app.lawyerId?.name?.charAt(0) || "L"}
                          </div>
                          <div>
                             <h4 className="font-bold text-slate-800">{app.lawyerId?.name || "Lawyer"}</h4>
                             <p className="text-xs text-slate-400 font-medium">{app.lawyerId?.specialization || "Legal Expert"}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-10">
                          <div className="flex items-center gap-2 text-slate-500">
                             <Clock size={16} />
                             <span className="text-sm font-medium">
                               {new Date(app.date).toLocaleDateString()} - {app.time}
                             </span>
                          </div>
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                            app.status === 'Confirmed' || app.status === 'Accepted' ? "text-emerald-600 bg-emerald-50 border border-emerald-100" : 
                            app.status === 'Pending' ? "text-yellow-600 bg-yellow-50 border border-yellow-100" : 
                            app.status === 'Rejected' ? "text-red-600 bg-red-50 border border-red-100" :
                            "text-slate-600 bg-slate-50 border border-slate-100"
                          }`}>
                             {app.status}
                          </span>
                          {(app.status === 'Confirmed' || app.status === 'Accepted') && app.consultationType === 'Video' && (
                            <button 
                              onClick={() => navigate(`/consultation/${app._id}`)}
                              className="ml-2 px-3 py-1.5 bg-[#0f4c3a] text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                            >
                              Join Call
                            </button>
                          )}
                       </div>
                    </div>
                   ))
                 ) : (
                   <div className="text-center py-10 text-slate-400 font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                     No appointments found. Start by booking one!
                   </div>
                 )}
              </div>
           </div>

           {/* Recent Chats Section */}
           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-bold text-slate-800 font-poppins">Recent Chats</h2>
                 <button className="text-emerald-600 font-bold text-sm hover:underline">View All</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {recentChats.map((chat, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 transition-all hover:bg-emerald-50/30">
                      {chat.img === "bot" ? (
                        <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                           <MessageSquare size={24} />
                        </div>
                      ) : (
                        <div className="w-14 h-14 bg-slate-200 rounded-xl" />
                      )}
                      <div className="flex-1">
                         <div className="flex justify-between">
                            <h4 className="font-bold text-slate-800">{chat.name}</h4>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">{chat.time}</span>
                         </div>
                         <p className="text-xs text-slate-400 truncate w-40">{chat.sub}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Column: Documents & Stats */}
        <div className="space-y-8">
           {/* Documents Section */}
           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm h-full">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-bold text-slate-800 font-poppins">Documents</h2>
                 <button className="text-emerald-600 font-bold text-sm hover:underline">View All</button>
              </div>

              <div className="space-y-4">
                 {documents.map((doc, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-50 transition-all hover:bg-[#032b21] group cursor-pointer">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                         <FileText size={20} />
                      </div>
                      <div>
                         <h4 className="text-sm font-bold text-slate-800 group-hover:text-white transition-colors">{doc.name}</h4>
                         <p className="text-[10px] text-slate-400 font-bold group-hover:text-emerald-200 transition-colors uppercase tracking-widest">{doc.date}</p>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Quick Case Scorecard Widget */}
              <div className="mt-10 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                 <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="text-emerald-600 w-5 h-5" />
                    <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Active Cases</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <div>
                       <span className="text-4xl font-black text-slate-800 font-poppins">{data.stats.totalCases}</span>
                       <span className="text-slate-400 font-bold ml-1">Total</span>
                    </div>
                 </div>
                 <p className="text-[10px] text-slate-400 font-bold mt-4">Keep tracking your legal progress.</p>
              </div>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default UserDashboard;