import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { UserPlus, Mail, Lock, User, Briefcase, Award } from "lucide-react";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("client"); // roles: 'client' or 'lawyer'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    city: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/signup", {
        ...formData,
        role: role === "client" ? "user" : "lawyer"
      });

      // Save token and user info
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      // Redirect based on role
      if (role === "client") {
        navigate("/user-dashboard");
      } else {
        navigate("/lawyer-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <PageHeader 
        title="Start Your Journey" 
        subtitle="Join LawBridge today and connect with legal experts instantly." 
      />

      <div className="max-w-xl mx-auto px-6 py-20 relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl p-12 border border-slate-100 -mt-32">
          
          {/* Role Selection */}
          <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-12">
            <button 
              type="button"
              onClick={() => setRole("client")}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all ${role === "client" ? "bg-white text-emerald-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
              <User size={18} /> Join as Client
            </button>
            <button 
              type="button"
              onClick={() => setRole("lawyer")}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all ${role === "lawyer" ? "bg-emerald-600 text-white shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Briefcase size={18} /> Join as Lawyer
            </button>
          </div>

          <h2 className="text-4xl font-black text-center text-slate-800 mb-2 font-poppins">Create Account</h2>
          <p className="text-center text-slate-400 font-medium mb-10">Register as a {role === "client" ? "Client looking for help" : "Legal Professional"}</p>

          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-center font-medium border border-red-100">{error}</div>}

          <form className="space-y-5" onSubmit={handleSignup}>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
              />
            </div>

            {/* Lawyer Specific Fields */}
            {role === "lawyer" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="relative group">
                  <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                  <input
                    type="text"
                    name="city"
                    placeholder="City / Location"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                  />
                </div>
                <div className="relative group">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                  <select 
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium appearance-none"
                  >
                     <option value="">Specialization</option>
                     <option value="Family Law">Family Law</option>
                     <option value="Criminal Law">Criminal Law</option>
                     <option value="Corporate Law">Corporate Law</option>
                     <option value="Property Law">Property Law</option>
                  </select>
                </div>
              </div>
            )}

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl active:scale-[0.98] transition-all ${
                role === 'lawyer' ? 'bg-[#032b21] text-white hover:bg-emerald-950 shadow-emerald-900/20' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20'
              } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
                {loading ? "Creating Account..." : role === 'client' ? 'Join LawBridge' : 'Apply as Professional'}
              </button>
            </div>
          </form>

          <p className="text-center mt-10 text-slate-500 font-medium">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-emerald-600 font-black hover:underline decoration-2 underline-offset-4 decoration-emerald-300"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </PageTransition>
  );
}

export default Signup;