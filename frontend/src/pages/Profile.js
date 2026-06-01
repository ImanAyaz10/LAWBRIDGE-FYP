import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { User, Mail, Lock, Award, MapPin, CheckCircle, AlertCircle, Loader2, Camera, Briefcase, Phone } from "lucide-react";

function Profile() {
  const { user, setUser } = useAuth();
  
  // Tabs: 'details' or 'security'
  const [activeTab, setActiveTab] = useState("details");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    city: "",
    phone: "",
    address: "",
    experience: "",
    licenseNumber: "",
    bio: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Populate data when user object is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        specialization: user.specialization || "",
        city: user.city || "",
        phone: user.phone || "",
        address: user.address || "",
        experience: user.experience || "",
        licenseNumber: user.licenseNumber || "",
        bio: user.bio || "",
        password: "",
        confirmPassword: ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Password validation for Security Tab
    if (activeTab === "security") {
      if (!formData.password) {
        setErrorMsg("Please enter a new password");
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setErrorMsg("Password must be at least 6 characters long");
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg("Passwords do not match");
        setLoading(false);
        return;
      }
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email
      };

      if (user.role === "lawyer") {
        payload.specialization = formData.specialization;
        payload.city = formData.city;
        payload.phone = formData.phone;
        payload.address = formData.address;
        payload.experience = formData.experience;
        payload.licenseNumber = formData.licenseNumber;
        payload.bio = formData.bio;
      }

      if (activeTab === "security" && formData.password) {
        payload.password = formData.password;
      }

      const response = await API.put("/users/profile", payload);

      // Update global context state
      setUser({
        ...user,
        ...response.data
      });

      // Update local storage
      localStorage.setItem("userInfo", JSON.stringify({
        ...user,
        ...response.data
      }));

      setSuccessMsg(activeTab === "security" ? "Password updated successfully!" : "Profile updated successfully!");
      
      // Clear password fields on security update success
      if (activeTab === "security") {
        setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formDataObj = new FormData();
    formDataObj.append("image", file);

    try {
      const response = await API.post("/users/upload-image", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update global context state
      setUser({
        ...user,
        ...response.data
      });

      // Update local storage
      localStorage.setItem("userInfo", JSON.stringify({
        ...user,
        ...response.data
      }));

      setSuccessMsg("Profile image updated successfully!");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Profile picture fallback initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  };

  const dashboardRoleName = user?.role === "lawyer" ? "Lawyer" : "Client";

  return (
    <DashboardLayout role={dashboardRoleName} user={user?.name || "User"}>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Banner Card */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
          
          <div className="relative group/img flex-shrink-0">
            <div className="w-28 h-28 rounded-3xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/20 flex items-center justify-center shadow-inner overflow-hidden">
              {user?.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-extrabold text-[#f1edd3]">{getInitials(user?.name)}</span>
              )}
            </div>
            <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover/img:opacity-100 rounded-3xl cursor-pointer transition-opacity text-white text-[10px] font-bold gap-1 border border-emerald-400/20">
              <Camera size={20} />
              <span>{user?.profileImage ? "Change" : "Upload"}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          <div className="text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h2 className="text-3xl font-black font-poppins">{user?.name}</h2>
              <span className="self-center md:self-start px-4 py-1.5 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-black tracking-widest uppercase border border-emerald-400/20">
                {user?.role}
              </span>
            </div>
            <p className="text-emerald-100/70 font-medium text-sm flex items-center justify-center md:justify-start gap-2">
              <Mail size={16} /> {user?.email}
            </p>
            {user?.role === "lawyer" && user?.city && (
              <p className="text-emerald-100/70 font-medium text-sm flex items-center justify-center md:justify-start gap-2">
                <MapPin size={16} /> {user?.city}
              </p>
            )}
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column Navigation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider px-3 mb-2">Profile Settings</h3>
            
            <button
              onClick={() => { setActiveTab("details"); setErrorMsg(""); setSuccessMsg(""); }}
              className={`w-full text-left px-5 py-4 rounded-2xl font-bold flex items-center gap-4 transition-all ${
                activeTab === "details"
                  ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <User size={18} />
              Personal Info
            </button>

            <button
              onClick={() => { setActiveTab("security"); setErrorMsg(""); setSuccessMsg(""); }}
              className={`w-full text-left px-5 py-4 rounded-2xl font-bold flex items-center gap-4 transition-all ${
                activeTab === "security"
                  ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Lock size={18} />
              Security Settings
            </button>
          </div>

          {/* Right Column Edit Form */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-10 border border-slate-100 shadow-md">
            
            {/* Notifications */}
            {successMsg && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 font-bold flex items-center gap-3">
                <CheckCircle className="text-emerald-500 flex-shrink-0" size={20} />
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold flex items-center gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              
              {activeTab === "details" ? (
                // Personal Details tab
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Edit Personal Information</h3>
                    <p className="text-slate-400 text-xs mt-1">Keep your profile info updated so others can reach you.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-100 border border-slate-200 font-medium text-slate-500 cursor-not-allowed"
                          disabled
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium pl-1">Email address cannot be changed</p>
                    </div>

                    {/* Lawyer-Specific Fields */}
                    {user?.role === "lawyer" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase text-slate-500 tracking-wider">City / Location</label>
                          <div className="relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="e.g. Lahore"
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Specialization</label>
                          <div className="relative group">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                            <select
                              name="specialization"
                              value={formData.specialization}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800 appearance-none"
                            >
                              <option value="">Select Specialization</option>
                              <option value="Family Law">Family Law</option>
                              <option value="Criminal Law">Criminal Law</option>
                              <option value="Corporate Law">Corporate Law</option>
                              <option value="Property Law">Property Law</option>
                              <option value="Tax Law">Tax Law</option>
                              <option value="Immigration Law">Immigration Law</option>
                              <option value="Constitutional Law">Constitutional Law</option>
                              <option value="Cyber Law">Cyber Law</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Phone Number</label>
                          <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="e.g. 03001234567"
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Address</label>
                          <div className="relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              placeholder="Full office address"
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Years of Experience</label>
                          <div className="relative group">
                            <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                            <input
                              type="number"
                              name="experience"
                              value={formData.experience}
                              onChange={handleChange}
                              placeholder="e.g. 5"
                              min="0"
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase text-slate-500 tracking-wider">License / Bar Council ID</label>
                          <div className="relative group">
                            <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                            <input
                              type="text"
                              name="licenseNumber"
                              value={formData.licenseNumber}
                              onChange={handleChange}
                              placeholder="Unique Bar Council Registration #"
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Bio - full width, outside the grid */}
                  {user?.role === "lawyer" && (
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Bio / About</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Write a short bio about yourself, your practice areas, and experience..."
                        rows={4}
                        className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800 resize-none"
                      />
                    </div>
                  )}
                </div>
              ) : (
                // Change Password tab
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Security Settings</h3>
                    <p className="text-slate-400 text-xs mt-1">Change your password periodically to keep your account safe.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">New Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                        <input
                          type="password"
                          name="password"
                          placeholder="At least 6 characters"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Confirm New Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Re-type new password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-emerald-600/10 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile;
