import React from "react";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { Shield, Target, Users } from "lucide-react";

function About() {
  return (
    <PageTransition>
      <PageHeader 
        title="Our Mission & Story" 
        subtitle="Empowering citizens with smart, accessible, and transparent legal solutions." 
      />

      <div className="max-w-7xl mx-auto px-6 py-20 bg-white">
        {/* Main Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            {/* Green glowing effect instead of blue */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full blur-3xl opacity-30" />
            <img 
              src="/images/about-story.jpg" 
              alt="Our Story - Books and Legal Research" 
              className="rounded-[2.5rem] shadow-2xl relative z-10 border border-emerald-100"
            />
          </div>
          <div>
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">Who We Are</span>
            <h2 className="text-4xl font-bold text-slate-800 mt-4 mb-6 font-poppins">Bridging the Gap Between You and Justice</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              LawBridge is more than just a platform; it's a commitment to making legal services accessible to every citizen. Founded in 2026, we recognized the complexity and fear people feel when dealing with legal issues.
            </p>
            <p className="text-slate-600 leading-relaxed font-medium">
              By combining cutting-edge technology with the most trusted legal minds, we've created a safe haven for legal consultation, document management, and AI-driven guidance.
            </p>
          </div>
        </div>

        {/* Core Values - Ensuring deep emerald theme */}
        <div className="bg-[#032b21] rounded-[3rem] p-16 text-white text-center shadow-2xl border border-emerald-900">
            <h2 className="text-3xl font-bold mb-16 font-poppins text-[#f1edd3]">Our Core Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="space-y-4 group">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                     <Shield size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-[#f1edd3]">Unwavering Trust</h3>
                  <p className="text-emerald-100/60 text-sm leading-relaxed">Every lawyer on our platform undergoes a rigorous verification process to ensure your safety.</p>
               </div>
               <div className="space-y-4 group">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                     <Target size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-[#f1edd3]">Smart Efficiency</h3>
                  <p className="text-emerald-100/60 text-sm leading-relaxed">Our AI-driven roadmap helps you understand the complexity and timeline of your case in minutes.</p>
               </div>
               <div className="space-y-4 group">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                     <Users size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-[#f1edd3]">Human Centric</h3>
                  <p className="text-emerald-100/60 text-sm leading-relaxed">We prioritize empathy and understanding, making sure you never feel alone in your legal journey.</p>
               </div>
            </div>
        </div>

        {/* Stats Section with Green accents */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 text-center">
           {[
             { label: "Verified Lawyers", val: "500+" },
             { label: "Cases Solved", val: "10k+" },
             { label: "Client Satisfaction", val: "99%" },
             { label: "Cities Covered", val: "25+" }
           ].map((stat, i) => (
             <div key={i} className="p-8 border border-emerald-50 rounded-2xl hover:bg-emerald-50 transition-all hover:shadow-lg">
               <p className="text-4xl font-black text-emerald-600 mb-1 font-poppins">{stat.val}</p>
               <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">{stat.label}</p>
             </div>
           ))}
        </div>
      </div>
    </PageTransition>
  );
}

export default About;