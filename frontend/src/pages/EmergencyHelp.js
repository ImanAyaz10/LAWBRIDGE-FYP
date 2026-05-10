import React from "react";
import PageTransition from "../components/animations/PageTransition";
import { Siren, Phone, MessageSquare, ShieldAlert, Zap } from "lucide-react";

function EmergencyHelp() {
  const contacts = [
    { name: "Police Emergency", num: "15", desc: "For immediate police intervention." },
    { name: "Women Helpline", num: "1099", desc: "Special assistance for female citizens." },
    { name: "Legal Aid", num: "0800-70606", desc: "Free immediate legal consultation." },
    { name: "Rescue / EMS", num: "1122", desc: "Medical and disaster response." },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-red-600 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
           <div className="absolute bottom-10 right-10 w-96 h-96 bg-black rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl w-full relative z-10">
           <div className="text-center mb-16">
              <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/30 animate-bounce">
                 <Siren size={48} className="text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 font-poppins tracking-tighter">Emergency Legal Help</h1>
              <p className="text-xl md:text-2xl font-bold text-red-100 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Need immediate legal assistance? Connect with an available lawyer right now.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Primary Actions */}
              <button className="bg-white text-red-600 p-10 rounded-[3rem] flex items-center justify-between shadow-2xl transition-all hover:scale-105 group active:scale-95">
                 <div className="text-left">
                    <h3 className="text-2xl font-black mb-1 font-poppins uppercase tracking-tight">Live Chat Support</h3>
                    <p className="font-bold opacity-70">Average response: 30 secs</p>
                 </div>
                 <MessageSquare size={48} className="group-hover:translate-x-2 transition-transform" />
              </button>

              <button className="bg-[#032b21] text-white p-10 rounded-[3rem] flex items-center justify-between shadow-2xl transition-all hover:scale-105 group active:scale-95 border-2 border-emerald-500/50">
                 <div className="text-left">
                    <h3 className="text-2xl font-black mb-1 font-poppins uppercase tracking-tight text-emerald-400">Call Legal Officer</h3>
                    <p className="font-bold opacity-70 italic">+92 300 000 000</p>
                 </div>
                 <Phone size={48} className="group-hover:scale-110 transition-transform" />
              </button>
           </div>

           {/* Secondary Helplines */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contacts.map((c, i) => (
                <div key={i} className="bg-red-700/50 backdrop-blur border border-red-400/30 p-6 rounded-[2rem] text-center hover:bg-white/10 transition-all cursor-pointer">
                   <h4 className="text-sm font-black uppercase tracking-widest mb-1 opacity-60 text-red-200">{c.name}</h4>
                   <p className="text-2xl font-black font-poppins mb-2">{c.num}</p>
                   <p className="text-[10px] font-bold opacity-50 leading-tight">{c.desc}</p>
                </div>
              ))}
           </div>

           {/* Safety Warning */}
           <div className="mt-16 flex items-center justify-center gap-4 bg-black/20 p-6 rounded-3xl border border-white/10">
              <ShieldAlert className="text-white w-8 h-8" />
              <p className="text-sm font-bold text-red-100 flex-1">
                Your safety is our priority. If you are in immediate danger, please contact local law enforcement (15) first.
              </p>
              <Zap className="text-emerald-400 animate-pulse" />
           </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default EmergencyHelp;