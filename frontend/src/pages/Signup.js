import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { Mail, Lock, User, Briefcase, Award, Eye, EyeOff, ShieldCheck, RefreshCw, Loader2, ArrowLeft } from "lucide-react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState("client"); // roles: 'client' or 'lawyer'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    city: "",
    phone: "",
    address: "",
    experience: "",
    licenseNumber: "",
    bio: "",
    profileImage: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  
  // OTP Verification States
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [otpExpiry, setOtpExpiry] = useState(300); // 5 minutes in seconds
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const otpInputsRef = useRef([]);

  // Handles Cooldown Timer & Overall Expiry Timer
  useEffect(() => {
    let interval = null;
    if (showOtpScreen) {
      interval = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        setOtpExpiry((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setError("Verification session expired. Please sign up again.");
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpScreen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, JPEG, etc.)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size exceeds the 10MB limit.");
      return;
    }

    setError("");
    setFormData({ ...formData, profileImage: file });
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Step 1: Request Registration & Send OTP
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", role === "client" ? "client" : "lawyer");

      if (role === "lawyer") {
        data.append("specialization", formData.specialization);
        data.append("city", formData.city);
        data.append("phone", formData.phone);
        data.append("address", formData.address);
        data.append("experience", formData.experience);
        data.append("licenseNumber", formData.licenseNumber);
        data.append("bio", formData.bio);
        if (formData.profileImage) {
          data.append("profileImage", formData.profileImage);
        }
      }

      const response = await API.post("/auth/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(response.data.message || "OTP Sent successfully!");
      setShowOtpScreen(true);
      setResendCooldown(60);
      setOtpExpiry(300); // reset 5 minutes timer
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        if (otpInputsRef.current[0]) otpInputsRef.current[0].focus();
      }, 100);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Register user
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter the full 6-digit verification code");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await API.post("/auth/verify-otp", {
        email: formData.email,
        otp: otpCode
      });

      // Save token and user info
      login(response.data.token, response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      // Redirect based on role
      if (response.data.role === "client") {
        navigate("/user-dashboard");
      } else {
        navigate("/lawyer-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Please check the code.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await API.post("/auth/resend-otp", {
        email: formData.email
      });
      setSuccess(response.data.message || "A new code has been sent!");
      setResendCooldown(60);
      setOtpExpiry(300); // Reset overall expiry to 5m
      setOtp(["", "", "", "", "", ""]);
      if (otpInputsRef.current[0]) otpInputsRef.current[0].focus();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handling 6-digit OTP input boxes
  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input box
    if (value && index < 5) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      otpInputsRef.current[5].focus();
    }
  };

  // Formatting seconds to MM:SS
  const formatTime = (timeInSeconds) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <PageTransition>
      <PageHeader 
        title={showOtpScreen ? "Verify Your Account" : "Start Your Journey"} 
        subtitle={showOtpScreen ? "Enter the secure 6-digit code sent to your email." : "Join LawBridge today and connect with legal experts instantly."} 
      />

      <div className="max-w-xl mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl p-6 md:p-12 border border-slate-100 -mt-16 md:-mt-24">
          
          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-center font-bold border border-red-100">{error}</div>}
          {success && <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-center font-bold border border-emerald-100">{success}</div>}

          {!showOtpScreen ? (
            // SIGNUP SCREEN
            <>
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

              <form className="space-y-5" onSubmit={handleSignupSubmit}>
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
                  <>
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
                    {/* Additional Lawyer Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                        />
                      </div>
                      <div className="relative group">
                        <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                        />
                      </div>
                      <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="number"
                          name="experience"
                          placeholder="Years of Experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                        />
                      </div>
                      <div className="relative group">
                        <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          name="licenseNumber"
                          placeholder="License ID / Bar Council Number"
                          value={formData.licenseNumber}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                        />
                      </div>
                      <div className="relative group col-span-2">
                        <textarea
                          name="bio"
                          placeholder="Bio / About Lawyer"
                          rows={3}
                          value={formData.bio}
                          onChange={handleChange}
                          className="w-full pl-4 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium resize-none"
                        />
                      </div>
                      <div className="relative group col-span-2">
                        <label className="block text-xs font-black uppercase text-slate-500 tracking-wider mb-2">Profile Picture Upload</label>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 border-dashed">
                          {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm" />
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
                              <User size={24} />
                            </div>
                          )}
                          <div className="flex-1">
                            <input
                              type="file"
                              accept="image/*"
                              id="profileImageUpload"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                            <label
                              htmlFor="profileImageUpload"
                              className="cursor-pointer inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-emerald-700 transition-all"
                            >
                              Choose Image
                            </label>
                            <p className="text-[10px] text-slate-400 mt-1 font-medium">JPEG, PNG, or GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="relative group flex items-center">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer flex items-center"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                    role === 'lawyer' ? 'bg-[#032b21] text-white hover:bg-emerald-950 shadow-emerald-900/20' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20'
                  } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Sending Verification Code...
                      </>
                    ) : role === 'client' ? 'Join LawBridge' : 'Apply as Professional'}
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
            </>
          ) : (
            // OTP VERIFICATION SCREEN
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <button 
                onClick={() => { setShowOtpScreen(false); setError(""); setSuccess(""); }}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold mb-8 transition-colors group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back to Sign Up
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-inner">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-3xl font-black text-slate-800 font-poppins">Enter Verification Code</h2>
                <p className="text-slate-400 font-semibold mt-2 text-sm">
                  We've sent a 6-digit OTP code to <strong className="text-slate-700">{formData.email}</strong>.
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-8">
                {/* 6 OTP Input fields */}
                <div className="flex justify-between gap-2 max-w-sm mx-auto" onPaste={handleOtpPaste}>
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      ref={(el) => (otpInputsRef.current[index] = el)}
                      value={data}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      className="w-12 h-14 text-center text-2xl font-extrabold text-emerald-900 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-600 focus:bg-emerald-50/20 focus:outline-none transition-all"
                    />
                  ))}
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm font-bold text-slate-500">
                    Code expires in: <span className="text-red-500 font-extrabold">{formatTime(otpExpiry)}</span>
                  </p>
                  
                  {resendCooldown > 0 ? (
                    <p className="text-xs text-slate-400 font-semibold">
                      Resend code in <strong className="text-slate-500">{resendCooldown}s</strong>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-emerald-600 hover:text-emerald-700 font-extrabold text-sm flex items-center gap-1.5 mx-auto active:scale-95 transition-all hover:underline"
                    >
                      <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                      Resend Verification Code
                    </button>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || otpExpiry === 0}
                    className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                      role === 'lawyer' ? 'bg-[#032b21] text-white hover:bg-emerald-950 shadow-emerald-900/20' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20'
                    } ${(loading || otpExpiry === 0) ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Verifying Code...
                      </>
                    ) : (
                      "Verify & Create Account"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
}

export default Signup;