import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut, 
  Briefcase, 
  User, 
  Bell,
  Menu,
  X
} from "lucide-react";
import PageTransition from "./animations/PageTransition";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({ children, role = "Client", user = "Ayesha" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user: authUser } = useAuth();

  const menuItems = {
    Client: [
      { name: "Overview", icon: <LayoutDashboard size={20} />, path: "/user-dashboard" },
      { name: "Appointments", icon: <Calendar size={20} />, path: "/client-appointments" },
      { name: "Chat History", icon: <MessageSquare size={20} />, path: "/chat" },
      { name: "Documents", icon: <FileText size={20} />, path: "/documents" },
      { name: "Legal Templates", icon: <FileText size={20} />, path: "/legal-documents" },
      { name: "Case Score", icon: <Briefcase size={20} />, path: "/case-visibility" },
      { name: "Profile", icon: <User size={20} />, path: "/profile" },
    ],
    Lawyer: [
      { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/lawyer-dashboard" },
      { name: "Appointments", icon: <Calendar size={20} />, path: "/lawyer-appointments" },
      { name: "Messages", icon: <MessageSquare size={20} />, path: "/lawyer-messages" },
      { name: "My Clients", icon: <User size={20} />, path: "/lawyer-clients" },
      { name: "Earnings", icon: <Briefcase size={20} />, path: "/lawyer-earnings" },
      { name: "Legal Templates", icon: <FileText size={20} />, path: "/legal-documents" },
      { name: "Profile", icon: <User size={20} />, path: "/profile" },
    ],
    Admin: [
      { name: "Overview", icon: <LayoutDashboard size={20} />, path: "/admin" },
      { name: "Lawyers", icon: <User size={20} />, path: "/admin-lawyers" },
      { name: "Users", icon: <Users size={20} />, path: "/admin-users" },
      { name: "Reports", icon: <FileText size={20} />, path: "/admin-reports" },
    ]
  };

  const currentMenu = menuItems[role] || menuItems.Client;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F0F4F2] overflow-hidden relative">
      {/* Sidebar Backdrop overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar */}
      <aside className={`w-72 bg-[#032b21] text-white flex flex-col shadow-2xl fixed md:relative h-screen z-40 transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-8 border-b border-emerald-900/50 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
               <Briefcase size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold font-poppins tracking-tight">LawBridge</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 text-emerald-100 hover:text-white md:hidden border border-emerald-800 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {currentMenu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                location.pathname === item.path 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                : "text-emerald-100/50 hover:bg-emerald-900/50 hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-900/50 space-y-2">
          <button 
            onClick={() => { setSidebarOpen(false); navigate("/profile"); }}
            className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-emerald-100/50 hover:bg-red-500/10 hover:text-red-400 w-full transition-all"
          >
            <Settings size={20} />
            Profile Settings
          </button>
          <button 
            onClick={() => { setSidebarOpen(false); logout(); navigate("/"); }}
            className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-emerald-100/50 hover:bg-red-500/10 hover:text-red-400 w-full transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-24 bg-white border-b border-slate-100 px-6 md:px-10 flex items-center justify-between relative z-20">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-3 bg-slate-50 text-slate-600 rounded-xl md:hidden hover:text-emerald-600 transition-colors"
              >
                <Menu size={20} />
              </button>
              <div>
                 <h1 className="text-xl md:text-2xl font-bold text-slate-800 font-poppins">{role} Dashboard</h1>
                 <p className="text-slate-400 text-xs md:text-sm font-medium">Welcome back, {user} 👋</p>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-600 transition-colors relative">
                 <Bell size={20} />
                 <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center gap-4 p-1.5 bg-slate-50 rounded-2xl pr-4 md:pr-6 border border-slate-100">
                 <img 
                  src={authUser?.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-xl object-cover shadow-md"
                 />
                 <div className="hidden sm:block">
                    <p className="text-sm font-bold text-slate-800">{user}</p>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-black">{role}</p>
                 </div>
              </div>
           </div>
        </header>

        {/* Content Overflow Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#F8FAF9]">
           <PageTransition>
              {children}
           </PageTransition>
        </div>
      </main>
    </div>
  );
};

// Internal Users helper for Admin Layout
const Users = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M17 7a4 4 0 0 1 0 7.75"/>
  </svg>
);

export default DashboardLayout;
