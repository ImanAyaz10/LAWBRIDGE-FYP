import React, { useState } from "react";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { FileText, Download, Edit3, Search, Filter } from "lucide-react";

function LegalDocuments() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Affidavits", "Agreements", "Contracts", "Corporate", "Property"];

  const documents = [
    { name: "Affidavit of Income", category: "Affidavits", icon: <FileText className="text-emerald-500" /> },
    { name: "Rental Agreement", category: "Agreements", icon: <Edit3 className="text-blue-500" /> },
    { name: "Employment Contract", category: "Contracts", icon: <FileText className="text-purple-500" /> },
    { name: "Power of Attorney", category: "Corporate", icon: <ShieldCheck className="text-orange-500" /> },
    { name: "Demand Letter", category: "Corporate", icon: <FileText className="text-red-500" /> },
    { name: "Will Template", category: "Property", icon: <FileText className="text-teal-500" /> },
    { name: "Sale Deed", category: "Property", icon: <Edit3 className="text-emerald-500" /> },
    { name: "Service Agreement", category: "Agreements", icon: <FileText className="text-blue-400" /> },
  ];

  const filteredDocs = activeCategory === "All" 
    ? documents 
    : documents.filter(doc => doc.category === activeCategory);

  return (
    <PageTransition>
      <PageHeader 
        title="Legal Templates" 
        subtitle="Access and generate professional legal documents easily." 
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 pb-8 border-b border-slate-100">
           <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                    activeCategory === cat 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                    : "bg-slate-100 text-slate-600 hover:bg-emerald-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>

           <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search templates..." 
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all"
              />
           </div>
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {filteredDocs.map((doc, i) => (
             <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
                   {/* Fallback to FileText if custom icon not available */}
                   {React.cloneElement(doc.icon, { size: 36 })}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 font-poppins">{doc.name}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">{doc.category}</p>
                
                <div className="grid grid-cols-2 gap-3 w-full">
                  <button className="flex items-center justify-center gap-2 bg-[#032b21] text-white py-3 rounded-xl text-xs font-bold hover:bg-emerald-950 transition-colors">
                    <Edit3 size={14} /> Generate
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-3 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors">
                    <Download size={14} /> Download
                  </button>
                </div>
             </div>
           ))}
        </div>

        {/* Info Banner */}
        <div className="mt-20 bg-emerald-950 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
               <h2 className="text-2xl font-bold mb-2 font-poppins text-[#f1edd3]">Need a Custom Document?</h2>
               <p className="text-emerald-100/60 max-w-lg">Our expert lawyers can draft custom legal agreements tailored to your specific needs.</p>
            </div>
            <button className="relative z-10 bg-[#f1edd3] text-[#032b21] px-10 py-4 rounded-2xl font-bold hover:bg-white transition-all shadow-xl active:scale-95">
               Request Custom Draft
            </button>
        </div>
      </div>
    </PageTransition>
  );
}

// Helper to make sure ShieldCheck is available
const ShieldCheck = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

export default LegalDocuments;