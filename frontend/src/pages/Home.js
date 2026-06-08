import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Home as HomeIcon, Briefcase, Globe, Fingerprint, Star, Sparkles, Loader2 } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import lawVideo from "../assets/law-bg.mp4";
import API from "../services/api";


import PageTransition from "../components/animations/PageTransition";
import FadeInScroll from "../components/animations/FadeInScroll";

const Home = () => {
  const navigate = useNavigate();
  const [lawyers, setLawyers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await API.get('/lawyers');
        setLawyers(response.data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch featured lawyers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyers();
  }, []);
  
  const categories = [
    { title: "Family Law", desc: "Marriage, Divorce, Custody", icon: <HomeIcon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" /> },
    { title: "Criminal Law", desc: "Cases, Bail, Court Matters", icon: <Scale className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" /> },
    { title: "Property Law", desc: "Land, Ownership, Disputes", icon: <Globe className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" /> },
    { title: "Business Law", desc: "Registration, Contracts", icon: <Briefcase className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" /> },
    { title: "Cyber Law", desc: "Online Fraud, Privacy", icon: <Fingerprint className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" /> },
    { title: "Immigration", desc: "Visa, Travel, Issues", icon: <Globe className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" /> },
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/70 z-10" />
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={lawVideo} type="video/mp4" />
          </video>
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 leading-tight mb-6 font-poppins"
          >
            Smart Legal Help, Anytime, Anywhere.
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <button onClick={() => navigate("/lawyers")} className="bg-emerald-600 text-white font-bold px-10 py-4 rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/30">
              Find a Lawyer
            </button>
            <button onClick={() => navigate("/signup")} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-10 py-4 rounded-full border border-white/30 transition-all">
              Join as Client
            </button>
          </motion.div>
        </div>

        {/* Improved Modern AI Chat Button */}
        <motion.div 
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3"
        >
          {/* Subtle Tooltip/Cloud Label */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-xl border border-emerald-100 text-emerald-900 font-bold text-sm"
          >
            Ask AI Assistant ✨
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/chat")}
            className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] shadow-2xl shadow-emerald-500/40 flex items-center justify-center group overflow-hidden border-2 border-white/20"
          >
            {/* Animated Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative text-white flex flex-col items-center">
              <Sparkles className="w-10 h-10 animate-pulse" />
            </div>

            {/* Circular progress highlight around icon */}
            <div className="absolute inset-0 border-2 border-white/10 rounded-[2rem]" />
          </motion.button>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInScroll text-center mb-16>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center font-poppins">Explore Our Categories</h2>
            <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full" />
          </FadeInScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {categories.map((cat, idx) => (
              <FadeInScroll key={idx} delay={idx * 0.1}>
                <Link to="/categories">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-2 transition-all duration-300 group cursor-pointer text-center h-full">
                    <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-white/20 transition-colors duration-300">
                      {cat.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-white transition-colors uppercase tracking-tight">{cat.title}</h3>
                    <p className="text-slate-500 leading-relaxed group-hover:text-emerald-50 transition-colors text-sm">{cat.desc}</p>
                  </div>
                </Link>
              </FadeInScroll>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Link to="/categories">
                <button className="bg-emerald-600 text-white font-bold px-12 py-4 rounded-full hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95">
                   View All 50+ Specialized Categories
                </button>
             </Link>
          </div>
        </div>
      </section>

      {/* Featured Lawyers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInScroll>
            <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center font-poppins tracking-tight">Top Rated Professionals</h2>
          </FadeInScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full flex justify-center py-10">
                <Loader2 className="animate-spin text-emerald-600" size={40} />
              </div>
            ) : lawyers.length > 0 ? (
              lawyers.map((lawyer, idx) => (
                <FadeInScroll key={idx} delay={idx * 0.1}>
                  <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all group">
                    <div className="relative h-64 overflow-hidden bg-slate-100 flex items-center justify-center">
                      {lawyer.profileImage ? (
                        <img 
                          src={lawyer.profileImage} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          alt={lawyer.name} 
                        />
                      ) : (
                        <div className="text-slate-400 flex flex-col items-center">
                          <Briefcase size={48} />
                          <span className="font-bold mt-2">LawBridge Profile</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-slate-700">{lawyer.rating || "5.0"}</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Verified Expert</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1 tracking-tight">{lawyer.name}</h3>
                      <p className="text-slate-500 mb-2 font-medium">{lawyer.specialization || "General Practice"}</p>
                      <p className="text-slate-400 text-xs mb-6 font-medium">{lawyer.experience || "0"}+ Yrs Experience | {lawyer.city || "Pakistan"}</p>
                      <Link to={`/lawyer/${lawyer._id}`}>
                        <button className="w-full py-4 rounded-xl border-2 border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                          View Full Profile
                        </button>
                      </Link>
                    </div>
                  </div>
                </FadeInScroll>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-400 py-10 font-bold">
                No registered lawyers found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-100 rounded-full blur-[100px] opacity-50 -mr-96 -mt-96 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#032b21]/5 rounded-full blur-[80px] -ml-64 -mb-64 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <FadeInScroll>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1 w-12 bg-emerald-600 rounded-full"></div>
                  <span className="text-emerald-600 font-bold tracking-[0.2em] uppercase text-sm">About LawBridge</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 font-poppins leading-tight tracking-tight">
                  Democratizing Legal Access in Pakistan
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
                  Navigating the legal landscape can be intimidating and complex. LawBridge was founded with a singular vision: to bridge the gap between citizens and justice through technology. 
                </p>
                <p className="text-slate-600 text-lg leading-relaxed mb-10">
                  By integrating advanced AI case analysis with a network of Pakistan's most respected legal minds, we empower you to make informed decisions, estimate costs transparently, and find the right representation instantly.
                </p>
                
                <div className="grid grid-cols-2 gap-10 mb-12">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="text-4xl font-black text-[#0f4c3a] font-poppins mb-2">98%</h4>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Client Satisfaction</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="text-4xl font-black text-[#0f4c3a] font-poppins mb-2">24/7</h4>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">AI Legal Support</p>
                  </div>
                </div>
                
                <Link to="/about">
                   <button className="bg-[#0f4c3a] text-white px-10 py-4 rounded-xl font-bold hover:bg-emerald-800 transition-all shadow-xl shadow-[#0f4c3a]/20 active:scale-95 text-lg">
                     Read Our Full Story
                   </button>
                </Link>
              </FadeInScroll>
            </div>
            
            <div className="lg:w-1/2">
              <FadeInScroll delay={0.2}>
                 <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-[#c0a062] rounded-[3rem] transform rotate-3 scale-105 opacity-20 blur-2xl"></div>
                    <img 
                      src="/about-legal.jpg" 
                      alt="Legal Library" 
                      className="relative z-10 w-full h-[650px] object-cover rounded-[3rem] shadow-2xl border-[8px] border-white"
                    />
                    
                    {/* Floating Trust Badge */}
                    <div className="absolute -bottom-8 -left-8 bg-white p-6 pr-8 rounded-3xl shadow-2xl z-20 border border-slate-100 hidden md:flex items-center gap-5">
                       <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                          <ShieldCheck size={32} />
                       </div>
                       <div>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Trusted By</p>
                          <h4 className="text-2xl font-black text-slate-800 font-poppins">500+ Lawyers</h4>
                       </div>
                    </div>
                 </div>
              </FadeInScroll>
            </div>
          </div>
        </div>
      </section>

    </PageTransition>
  );
};

export default Home;