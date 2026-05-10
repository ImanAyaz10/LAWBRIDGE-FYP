import React, { useState } from "react";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { Search, MapPin, Landmark, Phone, Globe } from "lucide-react";

function ContactFinder() {
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 1000);
  };

  return (
    <PageTransition>
      <PageHeader 
        title="Jurisdiction Finder" 
        subtitle="Find the appropriate legal contact and court details for your location." 
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Search Form */}
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl">
             <h2 className="text-2xl font-bold text-slate-800 mb-8 font-poppins">Select Location Details</h2>
             <div className="space-y-6">
                <div>
                   <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Select Country</label>
                   <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium">
                      <option>Pakistan</option>
                   </select>
                </div>
                <div>
                   <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Select City</label>
                   <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium">
                      <option>Lahore</option>
                      <option>Karachi</option>
                      <option>Islamabad</option>
                   </select>
                </div>
                <div>
                   <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Case Type</label>
                   <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium">
                      <option>Family Law</option>
                      <option>Criminal Law</option>
                      <option>Corporate Law</option>
                   </select>
                </div>
                <button 
                  onClick={handleSearch}
                  className="w-full bg-[#032b21] text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-950 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 mt-4"
                >
                  {loading ? "Searching..." : <><Search size={20} /> Find Jurisdiction Details</>}
                </button>
             </div>
          </div>

          {/* Result Card */}
          <div className="relative">
             {!showResult ? (
                <div className="bg-emerald-50 rounded-[3rem] p-20 border-2 border-dashed border-emerald-200 flex flex-col items-center text-center">
                   <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
                      <MapPin size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-emerald-800 mb-2 font-poppins">No details selected</h3>
                   <p className="text-emerald-600 font-medium">Fill the form to find your local legal authority details.</p>
                </div>
             ) : (
                <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom-10 duration-500">
                   {/* Mock Map Background */}
                   <div className="h-60 bg-emerald-50 relative">
                     <img 
                      src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80" 
                      alt="Map Placeholder" 
                      className="w-full h-full object-cover opacity-50 contrast-125"
                     />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-[#032b21] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 scale-110">
                           <Landmark size={24} className="text-emerald-400" />
                           <span className="font-bold">District Courts, Lahore</span>
                        </div>
                     </div>
                   </div>

                   <div className="p-10">
                      <h3 className="text-2xl font-bold text-slate-800 mb-6 font-poppins">Jurisdiction Details</h3>
                      
                      <div className="space-y-6">
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                               <MapPin size={20} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Address</p>
                               <p className="text-slate-700 font-bold leading-relaxed">District Courts Complex, Lahore, Punjab 54000, Pakistan</p>
                            </div>
                         </div>

                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                               <Phone size={20} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                               <p className="text-slate-700 font-bold">+92 42 99212345</p>
                            </div>
                         </div>

                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                               <Globe size={20} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Website</p>
                               <p className="text-emerald-600 font-black">lhc.gov.pk</p>
                            </div>
                         </div>
                      </div>

                      <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                         <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                         <p className="text-sm font-bold text-slate-600 italic">This is the appropriate jurisdiction for your case.</p>
                      </div>
                   </div>
                </div>
             )}
          </div>

        </div>
      </div>
    </PageTransition>
  );
}

export default ContactFinder;