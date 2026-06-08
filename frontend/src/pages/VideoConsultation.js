import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import { Loader2, ShieldAlert, User, Shield, Calendar, Clock, Video, FileText, ArrowLeft, CheckCircle } from "lucide-react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function VideoConsultation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await API.get(`/appointments/${id}`);
        setAppointment(response.data);
      } catch (err) {
        console.error("Failed to load appointment details:", err);
        setError(err.response?.data?.message || "Access Denied: You are not authorized to view this meeting room.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  const handleComplete = async () => {
    if (!window.confirm("Are you sure you want to mark this consultation as Completed? This will archive it and end the session.")) {
      return;
    }

    setCompleting(true);
    try {
      await API.put(`/appointments/${id}`, { status: "Completed" });
      alert("Consultation Completed and Archived Successfully!");
      navigate(user?.role === "lawyer" ? "/lawyer-dashboard" : "/user-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to mark consultation as completed.");
    } finally {
      setCompleting(false);
    }
  };

  const handleLeave = () => {
    navigate(user?.role === "lawyer" ? "/lawyer-dashboard" : "/user-dashboard");
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
      <p className="text-slate-500 font-medium">Securing Video Room connection...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 px-6">
      <div className="bg-white rounded-3xl p-10 border border-red-100 shadow-2xl text-center max-w-md">
        <ShieldAlert className="text-red-500 mx-auto mb-6" size={64} />
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Unauthorized Access</h2>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">{error}</p>
        <button 
          onClick={() => navigate("/")}
          className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/30"
        >
          Return to Home
        </button>
      </div>
    </div>
  );

  const isLawyer = user?.role === "lawyer";

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F0F4F2] flex flex-col">
        {/* Navigation Header */}
        <header className="h-20 bg-[#032b21] text-white px-6 md:px-10 flex items-center justify-between border-b border-emerald-900 shadow-md">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLeave}
              className="p-2.5 bg-emerald-900/40 hover:bg-emerald-900 rounded-xl transition-all flex items-center justify-center active:scale-95"
              title="Leave Room"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <span className="text-xs text-emerald-400 font-black uppercase tracking-widest leading-none">Secure Call Session</span>
              <h1 className="text-lg md:text-xl font-bold leading-tight font-poppins">{appointment?.subject}</h1>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleLeave}
              className="px-5 py-2.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl hover:bg-slate-700 hover:text-white transition-all shadow-md active:scale-95"
            >
              Leave Room
            </button>
            {appointment?.status !== "Completed" && (
              <button 
                onClick={handleComplete}
                disabled={completing}
                className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-500 transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                {completing ? <Loader2 className="animate-spin" size={14} /> : <CheckCircle size={14} />}
                {isLawyer ? "Complete & Archive" : "End Consultation"}
              </button>
            )}
          </div>
        </header>

        {/* Video Area & Details Sidebar */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          
          {/* Main Video Frame */}
          <div className="flex-grow bg-slate-900 relative min-h-[400px] lg:min-h-0">
            {appointment?.status === "Completed" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
                <CheckCircle className="text-emerald-500 mb-6" size={72} />
                <h3 className="text-3xl font-bold font-poppins mb-2">Consultation Completed</h3>
                <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed">This video consultation has been completed and marked as archived. Thank you for using LawBridge.</p>
                <button 
                  onClick={handleLeave}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-500 font-bold transition-all shadow-lg active:scale-95"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : appointment?.status !== "Confirmed" && appointment?.status !== "Accepted" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
                <ShieldAlert className="text-yellow-500 mb-6" size={72} />
                <h3 className="text-3xl font-bold font-poppins mb-2">Session Not Active</h3>
                <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed">This consultation room is only available for confirmed appointments. Current status: <strong className="text-yellow-400">{appointment?.status}</strong>.</p>
                <button 
                  onClick={handleLeave}
                  className="bg-slate-800 text-white px-8 py-3 rounded-xl hover:bg-slate-700 font-bold transition-all"
                >
                  Back to Dashboard
                </button>
              </div>
            ) : (
              <iframe
                src={`https://meet.jit.si/lawbridge-${appointment._id}#userInfo.displayName="${user?.name || 'Participant'}"`}
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="camera; microphone; fullscreen; display-capture; autoplay"
                title="Video Room"
              />
            )}
          </div>

          {/* Details Sidebar */}
          <aside className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-between overflow-y-auto">
            <div className="p-8 space-y-8">
               <div>
                  <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-4">Consultation Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <Video size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Channel</p>
                        <p className="text-sm text-slate-800 font-bold">{appointment?.consultationType} Call</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Date</p>
                        <p className="text-sm text-slate-800 font-bold">{new Date(appointment?.date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Time Slot</p>
                        <p className="text-sm text-slate-800 font-bold">{appointment?.time}</p>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-4">Participants</h3>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                           <User size={18} />
                        </div>
                        <div>
                           <p className="text-[10px] text-slate-400 font-bold uppercase">Client</p>
                           <p className="text-sm text-slate-800 font-bold">{appointment?.userId?.name}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                           <Shield size={18} />
                        </div>
                        <div>
                           <p className="text-[10px] text-slate-400 font-bold uppercase">Lawyer</p>
                           <p className="text-sm text-slate-800 font-bold">{appointment?.lawyerId?.name}</p>
                        </div>
                     </div>
                  </div>
               </div>

               {appointment?.notes && (
                 <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-2 flex items-center gap-1.5"><FileText size={12}/> Client Notes</h3>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-50 text-slate-600 text-xs leading-relaxed max-h-40 overflow-y-auto">
                       {appointment.notes}
                    </div>
                 </div>
               )}
            </div>

            {/* Quick Security Badge */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 text-center flex items-center justify-center gap-2 text-[10px] text-slate-400 font-black tracking-widest uppercase">
               <Shield size={12} className="text-emerald-600" /> LawBridge Secured WebRTC
            </div>
          </aside>

        </div>
      </div>
    </PageTransition>
  );
}

export default VideoConsultation;
