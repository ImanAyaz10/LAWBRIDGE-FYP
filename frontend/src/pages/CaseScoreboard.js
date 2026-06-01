import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Info, CheckCircle2 } from "lucide-react";

function CaseScoreboard() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const breakdown = [
    { label: "Evidence Strength", score: 85, color: "bg-emerald-500" },
    { label: "Documentation", score: 70, color: "bg-blue-500" },
    { label: "Legal Precedents", score: 75, color: "bg-purple-500" },
    { label: "Witness Support", score: 60, color: "bg-orange-500" },
    { label: "Jurisdiction Fit", score: 90, color: "bg-emerald-600" },
  ];

  return (
    <DashboardLayout role="Client" user={userInfo.name || "User"}>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
         {/* Banner Card */}
         <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
           <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl font-black font-poppins">Case Visibility Scoreboard</h2>
              <p className="text-emerald-100/70 font-medium text-sm">Track and improve the visibility and strength of your legal case.</p>
           </div>
         </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-10">
          
          {/* Main Score Meter */}
          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
             <h2 className="text-xl font-bold text-slate-800 mb-10 font-poppins uppercase tracking-widest">Overall Score</h2>
             
             <div className="relative w-72 h-72 flex items-center justify-center mb-10">
                <svg className="w-full h-full transform -rotate-90">
                   <circle
                      cx="144" cy="144" r="130"
                      stroke="currentColor" strokeWidth="20" fill="transparent"
                      className="text-slate-100"
                   />
                   <circle
                      cx="144" cy="144" r="130"
                      stroke="currentColor" strokeWidth="20" fill="transparent"
                      strokeDasharray={2 * Math.PI * 130}
                      strokeDashoffset={(1 - 0.78) * 2 * Math.PI * 130}
                      className="text-emerald-600 shadow-lg"
                      strokeLinecap="round"
                   />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-7xl font-black text-slate-800 font-poppins">78</span>
                   <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">Good</span>
                </div>
             </div>

             <p className="text-slate-500 leading-relaxed max-w-sm mb-10 font-semibold">
                Your case visibility is currently in the "Good" range. Strengthening your documentation could yield a higher score.
             </p>

             <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-left">
                   <CheckCircle2 className="text-emerald-600 flex-shrink-0" />
                   <p className="text-sm font-bold text-emerald-800">Add more supporting documents to documentation section.</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 text-left">
                   <Info className="text-blue-600 flex-shrink-0" />
                   <p className="text-sm font-bold text-blue-800">Include more relevant precedents for legal fit.</p>
                </div>
             </div>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-8 mt-4 lg:mt-0">
             <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl">
                <div className="flex items-center gap-3 mb-10">
                   <span className="text-emerald-600 font-bold text-lg">📊</span>
                   <h3 className="text-2xl font-bold text-slate-800 font-poppins">Score Breakdown</h3>
                </div>

                <div className="space-y-8">
                   {breakdown.map((item, i) => (
                     <div key={i}>
                        <div className="flex justify-between items-center mb-3 text-sm font-bold uppercase tracking-widest text-slate-500">
                           <span>{item.label}</span>
                           <span className="text-slate-800">{item.score}/100</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                           <div 
                            className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                            style={{ width: `${item.score}%` }}
                           />
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* Help Widget */}
             <div className="bg-[#032b21] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -mr-16 -mb-16 group-hover:scale-150 transition-transform duration-700" />
                <h4 className="text-xl font-bold mb-4 font-poppins text-[#f1edd3]">Want to reach 100?</h4>
                <p className="text-emerald-100/60 mb-8 text-sm leading-relaxed">Book a consultation with a premium attorney who can audit your case and provide expert documentation support.</p>
                <button className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-all shadow-xl active:scale-95">
                   Hire Expert Audit
                </button>
             </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default CaseScoreboard;