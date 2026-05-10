import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { Calendar, Clock, User, Mail, MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import API from "../services/api";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    summary: ""
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await API.get(`/lawyers/${id}`);
        setLawyer(response.data);
      } catch (err) {
        console.error("Failed to fetch lawyer", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyer();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post("/appointments", {
        lawyerId: id,
        date: formData.date,
        time: formData.time,
        summary: formData.summary
      });
      alert("Appointment Booked Successfully!");
      navigate("/user-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to book appointment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin text-emerald-600" size={48} />
    </div>
  );

  return (
    <PageTransition>
      <PageHeader 
        title="Secure Booking" 
        subtitle="Schedule a consultation with your preferred legal expert." 
      />

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row -mt-32 relative z-10">
          
          {/* Left Info Column */}
          <div className="md:w-1/3 bg-emerald-900 p-12 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-poppins">Booking Details</h2>
              <p className="text-emerald-100/60 leading-relaxed mb-10">
                Please fill in your details and select a preferred slot. Our team will verify and confirm via email within 2 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center">
                    <CheckCircle className="text-emerald-400" size={20} />
                  </div>
                  <span className="font-medium">Verified Lawyers</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center">
                    <CheckCircle className="text-emerald-400" size={20} />
                  </div>
                  <span className="font-medium">Safe Payments</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-emerald-950/50 rounded-2xl border border-emerald-700 mt-10 text-center">
               <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Selected expert</p>
               <p className="text-xl font-bold">{lawyer?.name || "Lawyer"}</p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="md:w-2/3 p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <User size={16} className="text-emerald-600" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={userInfo.name || ""}
                    disabled
                    className="w-full px-6 py-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 font-medium cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Mail size={16} className="text-emerald-600" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={userInfo.email || ""}
                    disabled
                    className="w-full px-6 py-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 font-medium cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Calendar size={16} className="text-emerald-600" /> Select Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Clock size={16} className="text-emerald-600" /> Select Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare size={16} className="text-emerald-600" /> Case Summary
                </label>
                <textarea
                  name="summary"
                  placeholder="Tell us a bit about your legal situation..."
                  required
                  rows="4"
                  value={formData.summary}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/30 active:scale-95 mt-4 disabled:opacity-50"
              >
                {submitting ? "Booking..." : "Confirm Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default BookAppointment;