import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import FadeInScroll from "../components/animations/FadeInScroll";
import PageHeader from "../components/PageHeader";
import { Star, ShieldCheck, MapPin, Briefcase, Heart } from "lucide-react";

const familyLawyers = [
  { name: "Sarah Khan", specialty: "Family Law Specialist", exp: "8 Years", rating: 4.9, img: "1589829545856-d10d557cf95f" },
  { name: "Ayesha Malik", specialty: "Divorce & Custody", exp: "12 Years", rating: 5.0, img: "1603415526960-f7e0328f1f0b" },
  { name: "Zainab Ahmed", specialty: "Child Support Expert", exp: "5 Years", rating: 4.8, img: "1544723795-3fb6469f5b39" },
  { name: "Farah Sheikh", specialty: "Matrimonial Law", exp: "7 Years", rating: 4.7, img: "1556157382-97eda2f9e2bf" },
];

function FamilyLawyers() {
  return (
    <PageTransition>
      <PageHeader 
        title="Family Law Experts" 
        subtitle="Compassionate and experienced lawyers to guide you through family matters." 
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Category Header */}
        <div className="flex items-center gap-4 mb-12 bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
              <Heart size={32} />
           </div>
           <div>
              <h2 className="text-2xl font-bold text-slate-800">Family Law</h2>
              <p className="text-slate-500 font-medium">4 Verified Experts Available</p>
           </div>
        </div>

        {/* Lawyer List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {familyLawyers.map((lawyer, i) => (
            <FadeInScroll key={i} delay={i * 0.1}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all group">
                <div className="relative h-64">
                   <img
                    src={`https://images.unsplash.com/photo-${lawyer.img}?auto=format&fit=crop&q=80`}
                    alt={lawyer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-slate-700">{lawyer.rating}</span>
                  </div>
                </div>

                <div className="p-8 text-center sm:text-left">
                  <div className="flex items-center gap-2 mb-3 justify-center sm:justify-start">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-600 uppercase">Verified Expert</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-slate-800">{lawyer.name}</h3>
                  <p className="text-emerald-600 font-bold text-sm mb-4">{lawyer.specialty}</p>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-4 text-slate-500 mb-6 text-sm">
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4"/> {lawyer.exp}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> Lahore</span>
                  </div>
                  
                  <Link to="/profile">
                    <button className="w-full py-4 rounded-xl border-2 border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-600 hover:text-white transition-all duration-300">
                      View Full Profile
                    </button>
                  </Link>
                </div>
              </div>
            </FadeInScroll>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

export default FamilyLawyers;