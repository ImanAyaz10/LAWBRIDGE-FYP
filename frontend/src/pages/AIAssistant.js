import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { MessageSquare, BarChart3, Map, Search, ArrowRight } from "lucide-react";

function AIAssistant() {
  const tools = [
    { title: "Ask AI Lawyer", desc: "Get instant legal guidance and consultation from our advanced AI model.", icon: <MessageSquare size={32} />, path: "/chat", color: "bg-emerald-50 text-emerald-600" },
    { title: "Case Complexity", desc: "Analyze the potential difficulty and success rate of your legal case.", icon: <BarChart3 size={32} />, path: "/case-complexity", color: "bg-blue-50 text-blue-600" },
    { title: "Legal Roadmap", desc: "Generate a step-by-step roadmap for your specific legal journey.", icon: <Map size={32} />, path: "/legal-roadmap", color: "bg-purple-50 text-purple-600" },
    { title: "Contact Finder", desc: "Find the appropriate jurisdictions and nearby court details.", icon: <Search size={32} />, path: "/contact-finder", color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <PageTransition>
      <PageHeader 
        title="AI Intelligence Hub" 
        subtitle="Harness the power of Artificial Intelligence to simplify your legal journey." 
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {tools.map((tool, i) => (
             <Link to={tool.path} key={i}>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all group flex flex-col items-start h-full">
                   <div className={`w-20 h-20 ${tool.color} rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                      {tool.icon}
                   </div>
                   <h3 className="text-3xl font-bold text-slate-800 mb-4 font-poppins">{tool.title}</h3>
                   <p className="text-slate-500 text-lg mb-10 flex-1">{tool.desc}</p>
                   <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-4 transition-all">
                      Launch Tool <ArrowRight size={20} />
                   </div>
                </div>
             </Link>
           ))}
        </div>

        {/* Info Banner */}
        <div className="mt-20 p-12 bg-[#032b21] rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
           <div className="md:w-2/3">
              <h4 className="text-2xl font-bold mb-4 font-poppins">Continuous AI Training</h4>
              <p className="text-emerald-100/60 leading-relaxed">Our AI models are trained on the latest Pakistani laws and procedures to ensure the highest accuracy in guidance. Note: AI results should be verified by a legal professional.</p>
           </div>
           <Link to="/lawyers">
              <button className="whitespace-nowrap bg-emerald-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-xl">
                 Verify with Lawyer
              </button>
           </Link>
        </div>
      </div>
    </PageTransition>
  );
}

export default AIAssistant;