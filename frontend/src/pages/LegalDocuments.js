import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { FileText, Edit3, Search } from "lucide-react";
import API from "../services/api";

function LegalDocuments() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const categories = ["All", "Affidavits", "Agreements", "Contracts", "Corporate", "Property"];

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await API.get("/templates");
        setTemplates(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching templates:", err);
        setError("Failed to load legal templates. Please try again later.");
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const getTemplateIcon = (code) => {
    switch (code) {
      case "affidavit_of_income":
        return <FileText className="text-emerald-500" />;
      case "rental_agreement":
        return <Edit3 className="text-blue-500" />;
      case "employment_contract":
        return <FileText className="text-purple-500" />;
      case "power_of_attorney":
        return <ShieldCheck className="text-orange-500" />;
      case "demand_letter":
        return <FileText className="text-red-500" />;
      case "will_template":
        return <FileText className="text-teal-500" />;
      case "sale_deed":
        return <Edit3 className="text-emerald-500" />;
      case "service_agreement":
        return <FileText className="text-blue-400" />;
      default:
        return <FileText className="text-slate-500" />;
    }
  };

  const filteredDocs = templates.filter((doc) => {
    const matchesCategory = activeCategory === "All" || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all"
              />
           </div>
        </div>

        {/* Loading / Error state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 text-center max-w-lg mx-auto">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Document Grid */}
        {!loading && !error && (
          <>
            {filteredDocs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 font-medium">No templates found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {filteredDocs.map((doc) => (
                   <div key={doc._id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group flex flex-col justify-between items-center text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
                           {React.cloneElement(getTemplateIcon(doc.code), { size: 36 })}
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2 font-poppins">{doc.title}</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">{doc.category}</p>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-3">{doc.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 w-full">
                        <button 
                          onClick={() => navigate(`/legal-documents/generate/${doc.code}`)}
                          className="flex items-center justify-center gap-2 bg-[#032b21] text-white py-3 rounded-xl text-xs font-bold hover:bg-emerald-950 transition-colors col-span-2"
                        >
                          <Edit3 size={14} /> Generate & Download
                        </button>
                      </div>
                   </div>
                 ))}
              </div>
            )}
          </>
        )}

        {/* Info Banner */}
        <div className="mt-20 bg-emerald-950 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
               <h2 className="text-2xl font-bold mb-2 font-poppins text-[#f1edd3]">Need a Custom Document?</h2>
               <p className="text-emerald-100/60 max-w-lg">Our expert lawyers can draft custom legal agreements tailored to your specific needs.</p>
            </div>
            <button 
              onClick={() => navigate("/lawyers")}
              className="relative z-10 bg-[#f1edd3] text-[#032b21] px-10 py-4 rounded-2xl font-bold hover:bg-white transition-all shadow-xl active:scale-95"
            >
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