import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { Cpu, CheckCircle } from "lucide-react";

function LegalRoadmap() {
  const [caseType, setCaseType] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState([]);

  const generateRoadmap = () => {
    if (!caseType) return;
    setLoading(true);
    setSteps([]);

    // Simulating AI Processing
    setTimeout(() => {
      let roadmap = [];
      if (caseType === "Criminal") {
        roadmap = ["FIR Lodging", "Investigation", "Bail Application", "Chargesheet", "Trial Hearings", "Final Verdict"];
      } else if (caseType === "Family") {
        roadmap = ["Consultation", "Plaint Filing", "Summons", "Issues Framing", "Evidence Recording", "Final Arguments/Decree"];
      } else {
        roadmap = ["Legal Notice", "Plaint Preparation", "Written Statement", "Interim Orders", "Final Trial", "Execution of Decree"];
      }
      setSteps(roadmap);
      setLoading(false);
    }, 2000);
  };

  return (
    <PageTransition>
      <PageHeader 
        title="AI Legal Roadmap" 
        subtitle="Our AI analyzes Pakistan's legal procedures to generate a custom step-by-step path for you." 
      />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-6 items-end mb-12">
            <div className="flex-1">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 block">Select Your Case Category</label>
              <select
                className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-700"
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
              >
                <option value="">-- Choose Category --</option>
                <option value="Criminal">Criminal Offense</option>
                <option value="Family">Family / Matrimonial</option>
                <option value="Property">Property / Civil Dispute</option>
              </select>
            </div>
            <button 
              onClick={generateRoadmap}
              disabled={loading}
              className="bg-[#032b21] text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-emerald-950 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {loading ? "AI Processing..." : <><Cpu size={20} /> Generate AI Roadmap</>}
            </button>
          </div>

          {loading && (
            <div className="py-20 flex flex-col items-center">
               <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6" />
               <p className="text-emerald-800 font-bold animate-pulse uppercase tracking-widest text-sm text-center">
                 Accessing Pakistan Penal Code...<br/>Generating Procedural Steps
               </p>
            </div>
          )}

          {steps.length > 0 && !loading && (
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
               <h3 className="text-2xl font-bold text-slate-800 mb-10 font-poppins text-center border-b border-slate-50 pb-8">Your Legal Journey</h3>
               <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-1 bg-emerald-50" />
                  <div className="space-y-8">
                    {steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-8 group">
                         <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold relative z-10 shadow-lg group-hover:scale-110 transition-transform">
                            {i + 1}
                         </div>
                         <div className="flex-1 p-6 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-white group-hover:shadow-xl transition-all">
                            <div className="flex justify-between items-center">
                               <p className="font-bold text-slate-800 text-lg uppercase tracking-tight">{step}</p>
                               <CheckCircle size={18} className="text-emerald-200 group-hover:text-emerald-500 transition-colors" />
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="mt-12 p-8 bg-emerald-50 rounded-3xl border border-emerald-100 text-center">
                  <p className="text-emerald-800 font-medium mb-6">Need a lawyer to help with Step 1?</p>
                  <Link to="/lawyers">
                    <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg active:scale-95">
                       Find Expert for this Journey
                    </button>
                  </Link>
               </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default LegalRoadmap;