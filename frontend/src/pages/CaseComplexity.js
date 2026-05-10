import React, { useState } from "react";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { BrainCircuit, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import API from "../services/api";

function CaseComplexity() {
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const checkComplexity = async () => {
    if (details.length < 20) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await API.post('/case/analyze', { description: details });
      const data = response.data;
      
      setResult({
        status: data.complexity,
        color: data.complexity === 'High' || data.complexity === 'Complex' ? 'text-red-500' : 'text-emerald-500',
        score: `${data.score}/100`,
        desc: data.suggestion
      });
    } catch (err) {
      console.error(err);
      setError("Failed to analyze case. Please make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <PageHeader 
        title="AI Case Complexity Checker" 
        subtitle="Our AI model analyzes your case description to estimate legal difficulty and required resources." 
      />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <BrainCircuit size={200} />
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-8 font-poppins relative z-10">Describe Your Case</h3>
          <p className="text-slate-400 mb-6 font-medium text-sm">Please provide as much detail as possible for accurate AI analysis.</p>

          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">{error}</div>}

          <textarea
            className="w-full h-64 p-8 rounded-[2rem] bg-slate-50 border-2 border-slate-100 outline-none focus:border-emerald-500 transition-all font-medium text-slate-700 mb-8"
            placeholder="Type your case facts, evidence available, and current status..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <button 
            onClick={checkComplexity}
            disabled={loading || details.length < 20}
            className="w-full bg-[#032b21] text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-950 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? <><Loader2 className="animate-spin" /> Analyzing Facts...</> : "Start AI Analysis"}
          </button>

          {loading && (
             <div className="mt-12 p-8 bg-slate-50 rounded-3xl animate-pulse flex items-center gap-6">
                <div className="w-4 h-4 bg-emerald-500 rounded-full" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Cross-referencing with precedent database...</p>
             </div>
          )}

          {result && !loading && (
            <div className={`mt-12 p-10 rounded-[2.5rem] border-4 animate-in zoom-in duration-500 ${result.status === 'High' ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
               <div className="flex justify-between items-start mb-6">
                  <div>
                     <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Complexity Level</p>
                     <h4 className={`text-4xl font-black font-poppins ${result.color}`}>{result.status}</h4>
                  </div>
                  <div className="text-right">
                     <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Difficulty Score</p>
                     <h4 className="text-4xl font-black font-poppins text-slate-800">{result.score}</h4>
                  </div>
               </div>
               
               <div className="flex items-start gap-4 p-6 bg-white/50 rounded-2xl border border-white mb-8">
                  <AlertCircle className={result.color} />
                  <p className="text-slate-700 font-bold leading-relaxed">{result.desc}</p>
               </div>

               <button className="w-full py-4 bg-white rounded-xl border border-slate-200 text-slate-800 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-md">
                  <ShieldCheck className="text-emerald-500" /> Save Analysis to Dashboard
               </button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default CaseComplexity;