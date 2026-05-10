import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { Star, ShieldCheck, CheckCircle2, Award, Zap } from "lucide-react";

const topMatch = {
  name: "Dr. Ayasha Malik",
  specialty: "Senior Corporate Lawyer",
  exp: "15+ Years",
  rating: 5.0,
  img: "1544723795-3fb6469f5b39",
  match: "98% Match",
  description: "Highly recommended for business litigation and contract disputes. Has a proven track record in Lahore High Court."
};

const others = [
  { name: "Usman Malik", specialty: "Property Law", rating: 4.8, img: "1603415526960-f7e0328f1f0b" },
  { name: "Sarah Khan", specialty: "Family Law", rating: 4.9, img: "1589829545856-d10d557cf95f" },
  { name: "Ali Raza", specialty: "Criminal Defense", rating: 4.7, img: "1556157382-97eda2f9e2bf" },
];

function RecommendedLawyers() {
  return (
    <PageTransition>
      <PageHeader 
        title="Your Top Matches" 
        subtitle="Based on your profile and case details, we've identified the best experts for you." 
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Featured Recommendation */}
        <div className="mb-20">
           <div className="flex items-center gap-3 mb-6">
              <Zap className="text-emerald-500 fill-emerald-500 w-6 h-6" />
              <h2 className="text-2xl font-bold text-slate-800 font-poppins text-center">Our Top Recommendation</h2>
           </div>

           <div className="bg-white rounded-[3rem] shadow-2xl border-4 border-emerald-50 overflow-hidden flex flex-col lg:flex-row shadow-emerald-600/10 active:scale-[0.99] transition-transform">
              <div className="lg:w-1/3 relative h-80 lg:h-auto">
                 <img 
                    src={`https://images.unsplash.com/photo-${topMatch.img}?auto=format&fit=crop&q=80`} 
                    alt={topMatch.name}
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute top-6 left-6 bg-emerald-600 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                    <Award size={18} /> {topMatch.match}
                 </div>
              </div>

              <div className="lg:w-2/3 p-12 flex flex-col justify-center">
                 <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="text-emerald-600 w-6 h-6" />
                    <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Premium Partner</span>
                 </div>
                 
                 <h3 className="text-4xl font-bold text-slate-800 mb-2 font-poppins">{topMatch.name}</h3>
                 <p className="text-emerald-600 font-bold text-xl mb-6">{topMatch.specialty} • {topMatch.exp}</p>
                 
                 <div className="flex items-center gap-2 mb-8">
                    {[1,2,3,4,5].map(s => <Star key={s} size={20} className="fill-yellow-400 text-yellow-400" />)}
                    <span className="ml-2 font-bold text-slate-700">5.0 (250+ Reviews)</span>
                 </div>

                 <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-2xl">{topMatch.description}</p>

                 <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/profile" className="flex-1">
                      <button className="w-full bg-[#032b21] text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-950 transition-all shadow-xl">
                        View Detailed Profile
                      </button>
                    </Link>
                    <Link to="/book-appointment" className="flex-1">
                      <button className="w-full bg-emerald-100 text-emerald-700 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-200 transition-all">
                        Quick Booking
                      </button>
                    </Link>
                 </div>
              </div>
           </div>
        </div>

        {/* Other Recommendations */}
        <div>
           <h2 className="text-2xl font-bold text-slate-800 mb-10 font-poppins px-4 border-l-4 border-emerald-500">Other Excellent Matches</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {others.map((lawyer, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
                   <div className="flex items-center gap-6 mb-6">
                      <img 
                        src={`https://images.unsplash.com/photo-${lawyer.img}?auto=format&fit=crop&q=80`} 
                        alt={lawyer.name}
                        className="w-20 h-20 rounded-2xl object-cover shadow-md"
                      />
                      <div>
                         <h4 className="font-bold text-slate-800 text-lg">{lawyer.name}</h4>
                         <p className="text-emerald-600 font-bold text-sm">{lawyer.specialty}</p>
                         <div className="flex items-center gap-1 mt-1 text-yellow-500">
                           <Star size={14} className="fill-current" />
                           <span className="text-xs font-bold text-slate-500">{lawyer.rating}</span>
                         </div>
                      </div>
                   </div>

                   <ul className="space-y-3 mb-8 text-sm text-slate-500">
                      <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500 w-4 h-4" /> Verified Academic Records</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500 w-4 h-4" /> Near your location</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500 w-4 h-4" /> Experienced in your legal issue</li>
                   </ul>

                   <Link to="/profile">
                     <button className="w-full py-3 rounded-xl border border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-600 hover:text-white transition-all">
                        Review Highlights
                     </button>
                   </Link>
                </div>
              ))}
           </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default RecommendedLawyers;