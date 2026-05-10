import React from "react";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { Check, Clock, Calendar, Scale, Gavel } from "lucide-react";

const timelineData = [
  { 
    title: "Initial Consultation", 
    date: "12 May, 2024", 
    desc: "Met with Lawyer Sarah Khan and discussed your legal case details.", 
    status: "completed",
    icon: <Check size={16} />
  },
  { 
    title: "Documentation", 
    date: "14 May, 2024", 
    desc: "Preparation and submission of required legal documents and evidence.", 
    status: "completed",
    icon: <Check size={16} />
  },
  { 
    title: "Legal Filing", 
    date: "18 May, 2024", 
    desc: "Your case has been successfully filed in the relevant district court.", 
    status: "current",
    icon: <Clock size={16} />
  },
  { 
    title: "First Hearing", 
    date: "Scheduled: 25 June", 
    desc: "Initial court hearings and follow-up proceedings.", 
    status: "upcoming",
    icon: <Calendar size={16} />
  },
  { 
    title: "Final Judgment", 
    date: "TBD", 
    desc: "The court will announce the final decision based on hearings.", 
    status: "upcoming",
    icon: <Gavel size={16} />
  },
];

function CaseTimeline() {
  return (
    <PageTransition>
      <PageHeader 
        title="Your Case Journey" 
        subtitle="Stay updated with the real-time progress of your legal proceedings." 
      />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-100 rounded-full" />
          
          <div className="space-y-12">
            {timelineData.map((step, i) => (
              <div key={i} className="relative flex items-start group">
                {/* Icon Node */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 border-4 border-white shadow-xl transition-all ${
                  step.status === "completed" ? "bg-emerald-600 text-white" : 
                  step.status === "current" ? "bg-emerald-100 text-emerald-600 animate-pulse" : 
                  "bg-slate-100 text-slate-400"
                }`}>
                  {step.icon}
                </div>

                {/* Content Card */}
                <div className="ml-10 flex-1">
                   <div className={`p-8 rounded-[2rem] border transition-all ${
                     step.status === "current" ? "bg-white border-emerald-200 shadow-2xl scale-105" : 
                     "bg-white border-slate-50 shadow-lg hover:shadow-xl"
                   }`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className={`text-xl font-bold font-poppins ${
                          step.status === "upcoming" ? "text-slate-400" : "text-slate-800"
                        }`}>
                          {step.title}
                        </h3>
                        <span className={`text-xs font-black uppercase tracking-widest ${
                          step.status === "completed" ? "text-emerald-600" : 
                          step.status === "current" ? "text-emerald-500" : 
                          "text-slate-300"
                        }`}>
                          {step.date}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${
                         step.status === "upcoming" ? "text-slate-300" : "text-slate-500"
                      }`}>
                        {step.desc}
                      </p>
                      
                      {step.status === "current" && (
                         <div className="mt-6 flex items-center gap-2 text-emerald-600">
                            <Scale size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest">Case in Progress</span>
                         </div>
                      )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-20 text-center">
           <p className="text-slate-400 font-medium italic">Timeline is updated automatically by your assigned legal team.</p>
        </div>
      </div>
    </PageTransition>
  );
}

export default CaseTimeline;