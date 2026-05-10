import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { Users, Shield, Briefcase, Globe, Home, Lock, Landmark, PenTool } from "lucide-react";

const categories = [
  { name: "Family Law", icon: <Users size={32} />, color: "bg-emerald-50 text-emerald-600", path: "/lawyers?category=Family" },
  { name: "Criminal Law", icon: <Shield size={32} />, color: "bg-red-50 text-red-600", path: "/lawyers?category=Criminal" },
  { name: "Business Law", icon: <Briefcase size={32} />, color: "bg-blue-50 text-blue-600", path: "/lawyers?category=Business" },
  { name: "Immigration Law", icon: <Globe size={32} />, color: "bg-purple-50 text-purple-600", path: "/lawyers?category=Immigration" },
  { name: "Property Law", icon: <Home size={32} />, color: "bg-orange-50 text-orange-600", path: "/lawyers?category=Property" },
  { name: "Cyber Crime", icon: <Lock size={32} />, color: "bg-slate-50 text-slate-600", path: "/lawyers?category=Cyber" },
  { name: "Tax Law", icon: <Landmark size={32} />, color: "bg-green-50 text-green-600", path: "/lawyers?category=Tax" },
  { name: "Trademark / IP", icon: <PenTool size={32} />, color: "bg-indigo-50 text-indigo-600", path: "/lawyers?category=IP" },
];

function Categories() {
  return (
    <PageTransition>
      <PageHeader 
        title="Legal Categories" 
        subtitle="Explore our comprehensive range of legal specializations and find the right expert for your case." 
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <Link to={cat.path} key={i}>
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all group flex flex-col items-center text-center">
                <div className={`w-20 h-20 ${cat.color} rounded-3xl flex items-center justify-center mb-6 border border-current/10 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 font-poppins">{cat.name}</h3>
                <p className="text-sm text-slate-500 mb-6">Find certified local experts specializing in {cat.name.toLowerCase()}.</p>
                <span className="text-emerald-600 font-bold text-sm group-hover:underline">View Lawyers →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 p-12 bg-[#032b21] rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl border border-emerald-900">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
           <h2 className="text-3xl font-bold mb-6 font-poppins text-[#f1edd3]">Not sure which category your case falls into?</h2>
           <p className="text-emerald-100/60 max-w-2xl mx-auto mb-10 text-lg">Use our AI Legal Assistant to describe your situation, and we'll automatically match you with the right specialization.</p>
           <Link to="/chat">
             <button className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-xl active:scale-95 text-lg">
                Ask AI Assistant Now
             </button>
           </Link>
        </div>
      </div>
    </PageTransition>
  );
}

export default Categories;
