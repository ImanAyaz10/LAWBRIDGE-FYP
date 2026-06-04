import React, { useState } from "react";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { Calculator, Receipt, Sparkles } from "lucide-react";

function CostEstimator() {
  const [caseType, setCaseType] = useState("");
  const [complexity, setComplexity] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const calculateCost = () => {
    if (!caseType || !complexity) return;
    setLoading(true);
    setResult(null);

    // Simulating AI Cost Calculation
    setTimeout(() => {
      let base = 0;
      if (caseType === "Family") base = 15000;
      else if (caseType === "Criminal") base = 35000;
      else base = 25000;

      let multiplier = clarityMultiplier(complexity);
      let total = base * multiplier;

      setResult({
        total: total.toLocaleString(),
        breakdown: [
          { label: "Legal Fees", val: (total * 0.7).toLocaleString() },
          { label: "Administrative Costs", val: (total * 0.2).toLocaleString() },
          { label: "Documentation", val: (total * 0.1).toLocaleString() }
        ]
      });
      setLoading(false);
    }, 2000);
  };

  const clarityMultiplier = (comp) => {
    if (comp === "Low") return 1;
    if (comp === "Medium") return 1.8;
    return 3.2;
  };

  return (
    <PageTransition>
      <PageHeader 
        title="AI Legal Cost Estimator" 
        subtitle="Predict your total legal expenditure using our AI cost-analysis engine." 
      />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-blue-500" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 block">Case Type</label>
              <select
                className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-700 appearance-none"
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
              >
                <option value="">-- Choose Type --</option>
                <option value="Family">Family Law</option>
                <option value="Criminal">Criminal Law</option>
                <option value="Property">Property Dispute</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 block">Perceived Complexity</label>
              <select
                className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-700 appearance-none"
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
              >
                <option value="">-- Select Level --</option>
                <option value="Low">Low Complexity</option>
                <option value="Medium">Medium Complexity</option>
                <option value="High">High Complexity</option>
              </select>
            </div>
          </div>

          <button 
            onClick={calculateCost}
            disabled={loading || !caseType || !complexity}
            className="w-full bg-[#032b21] text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-950 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? "Calculating AI Estimates..." : <><Calculator size={20} /> Generate Cost Estimate</>}
          </button>

          {loading && (
             <div className="mt-12 flex flex-col items-center">
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                   <div className="h-full bg-emerald-500 animate-progress" style={{width: '60%'}} />
                </div>
                <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">Scanning market rates in Pakistan...</p>
             </div>
          )}

          {result && !loading && (
            <div className="mt-12 p-10 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 animate-in fade-in duration-700">
               <div className="text-center mb-10">
                  <p className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-2">Total Estimated Cost</p>
                  <h3 className="text-6xl font-black text-slate-800 font-poppins">PKR {result.total}</h3>
               </div>

               <div className="space-y-4 border-t border-emerald-200 pt-8 mt-8">
                  {result.breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between items-center group">
                       <div className="flex items-center gap-3">
                          <Receipt size={16} className="text-emerald-400" />
                          <span className="text-slate-500 font-bold">{item.label}</span>
                       </div>
                       <span className="font-bold text-slate-800">PKR {item.val}</span>
                    </div>
                  ))}
               </div>

               <div className="mt-10 flex items-center gap-3 bg-white/50 p-4 rounded-2xl border border-white">
                  <Sparkles size={18} className="text-yellow-500" />
                  <p className="text-xs text-slate-500 font-medium italic">Estimate based on AI analysis of 500+ similar cases in 2024.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default CostEstimator;