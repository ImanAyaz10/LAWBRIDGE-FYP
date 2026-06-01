import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import FadeInScroll from "../components/animations/FadeInScroll";
import PageHeader from "../components/PageHeader";
import { Star, ShieldCheck, MapPin, Briefcase, Search, Loader2, Award } from "lucide-react";
import API from "../services/api";

function FindLawyer() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const typeParam = category !== "All Categories" ? category : "";
      const response = await API.get(`/lawyers?type=${typeParam}&search=${search}`);
      setLawyers(response.data);
    } catch (err) {
      console.error("Failed to fetch lawyers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLawyers();
  };

  return (
    <PageTransition>
      <PageHeader 
        title="Find an Expert Lawyer" 
        subtitle="Connect with verified legal professionals in your area." 
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Search Section */}
        <form onSubmit={handleSearch} className="bg-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 mb-20 -mt-24 relative z-20 border border-slate-100">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-6 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
          >
            <option>All Categories</option>
            <option value="Family Law">Family Law</option>
            <option value="Criminal Law">Criminal Law</option>
            <option value="Property Law">Property Law</option>
            <option value="Corporate Law">Corporate Law</option>
          </select>
          <button type="submit" className="bg-emerald-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
            Search
          </button>
        </form>

        {/* Lawyer List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-emerald-600" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {lawyers.length > 0 ? (
              lawyers.map((lawyer, i) => (
                <FadeInScroll key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all group">
                    <div className="relative h-60 bg-slate-200 flex items-center justify-center">
                      {lawyer.profileImage ? (
                        <img
                          src={lawyer.profileImage}
                          alt={lawyer.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                      <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-600 uppercase">Verified Professional</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{lawyer.name}</h3>
                      <div className="flex items-center gap-4 text-slate-500 mb-6 text-sm flex-wrap">
                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4"/> {lawyer.specialization}</span>
                        <span className="flex items-center gap-1"><Award className="w-4 h-4"/> {lawyer.experience || "0"}+ Years</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {lawyer.city || "Pakistan"}</span>
                      </div>
                      <Link to={`/lawyer/${lawyer._id}`}>
                        <button className="w-full py-4 rounded-xl border-2 border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-600 hover:text-white transition-all duration-300">
                          View Full Profile
                        </button>
                      </Link>
                    </div>
                  </div>
                </FadeInScroll>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <h3 className="text-2xl font-bold text-slate-400">No lawyers found matching your criteria.</h3>
                <p className="text-slate-400 mt-2">Try adjusting your search filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default FindLawyer;