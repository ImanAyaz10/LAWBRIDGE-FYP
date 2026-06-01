import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { Star, ShieldCheck, MapPin, Mail, Award, Clock, CheckCircle2, Loader2 } from "lucide-react";
import API from "../services/api";

function LawyerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await API.get(`/lawyers/${id}`);
        setLawyer(response.data);
      } catch (err) {
        console.error("Failed to fetch lawyer profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyer();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin text-emerald-600" size={48} />
    </div>
  );

  if (!lawyer) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-slate-800">Lawyer not found.</h2>
      <button onClick={() => navigate("/lawyers")} className="mt-4 text-emerald-600 font-bold underline">Go back to search</button>
    </div>
  );
  
  return (
    <PageTransition>
      <PageHeader 
        title="Lawyer Profile" 
        subtitle="Detailed information and legal expertise of our verified partner." 
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row -mt-12 md:-mt-24 relative z-10">
          
          {/* Left Side: Photo & Quick Stats */}
          <div className="md:w-1/3 bg-slate-50 p-6 md:p-10 border-r border-slate-100 flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-48 h-48 rounded-2xl bg-slate-200 flex items-center justify-center border-4 border-white shadow-2xl overflow-hidden">
                {lawyer.profileImage ? (
                  <img src={lawyer.profileImage} alt={lawyer.name} className="w-full h-full object-cover" />
                ) : (
                  <Award size={64} className="text-slate-400" />
                )}
              </div>
              <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white p-2 rounded-lg shadow-lg">
                <CheckCircle2 size={24} />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-1">{lawyer.name}</h2>
            <p className="text-emerald-600 font-bold uppercase text-xs tracking-widest mb-6">Expert {lawyer.specialization}</p>
            
            <div className="grid grid-cols-2 gap-4 w-full text-center">
               <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <p className="text-2xl font-bold text-slate-800">{lawyer.rating || "5.0"}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Rating</p>
               </div>
               <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <p className="text-2xl font-bold text-slate-800">{lawyer.experience || "5+"}yr</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Experience</p>
               </div>
            </div>

            <button
              className="w-full mt-8 bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition-all active:scale-95"
              onClick={() => navigate(`/book-appointment/${id}`)}
            >
              Book Consultation
            </button>
          </div>

          {/* Right Side: Detailed Bio & Info */}
          <div className="md:w-2/3 p-6 md:p-12">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Award className="text-emerald-600" /> Professional Background
            </h3>
            <p className="text-slate-600 leading-relaxed mb-10">
              {lawyer.bio || `${lawyer.name} is a distinguished legal professional with a deep focus on ${lawyer.specialization}. Based in ${lawyer.city || "Pakistan"}, they have built a reputation for excellence and strategic legal thinking.`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Location</p>
                  <p className="text-slate-800 font-semibold">{lawyer.city || "Pakistan"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                  <p className="text-slate-800 font-semibold">{lawyer.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Availability</p>
                  <p className="text-slate-800 font-semibold">Mon - Sat (9am - 6pm)</p>
                </div>
              </div>

              {lawyer.licenseNumber && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">License ID</p>
                    <p className="text-slate-800 font-semibold">{lawyer.licenseNumber}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-8">
              <h4 className="font-bold text-slate-800 mb-4">Core Specializations</h4>
              <div className="flex flex-wrap gap-3">
                {[lawyer.specialization, "Legal Advice", "Consultation"].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default LawyerProfile;