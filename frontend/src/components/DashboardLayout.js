import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut, 
  Briefcase, 
  User, 
  Bell 
} from "lucide-react";
import PageTransition from "./animations/PageTransition";

const DashboardLayout = ({ children, role = "Client", user = "Ayesha" }) => {
  const location = useLocation();

  const menuItems = {
    Client: [
      { name: "Overview", icon: <LayoutDashboard size={20} />, path: "/user-dashboard" },
      { name: "Appointments", icon: <Calendar size={20} />, path: "/book-appointment" },
      { name: "Chat History", icon: <MessageSquare size={20} />, path: "/chat" },
      { name: "Documents", icon: <FileText size={20} />, path: "/documents" },
      { name: "Case Score", icon: <Briefcase size={20} />, path: "/case-visibility" },
    ],
    Lawyer: [
      { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/lawyer-dashboard" },
      { name: "Appointments", icon: <Calendar size={20} />, path: "/lawyer-appointments" },
      { name: "Messages", icon: <MessageSquare size={20} />, path: "/lawyer-messages" },
      { name: "My Clients", icon: <User size={20} />, path: "/lawyer-clients" },
      { name: "Earnings", icon: <Briefcase size={20} />, path: "/lawyer-earnings" },
    ],
    Admin: [
      { name: "Overview", icon: <LayoutDashboard size={20} />, path: "/admin" },
      { name: "Lawyers", icon: <User size={20} />, path: "/admin-lawyers" },
      { name: "Users", icon: <Users size={20} />, path: "/admin-users" },
      { name: "Reports", icon: <FileText size={20} />, path: "/admin-reports" },
    ]
  };

  const currentMenu = menuItems[role] || menuItems.Client;

  return (
    <div className="flex h-screen bg-[#F0F4F2] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-[#032b21] text-white flex flex-col shadow-2xl relative z-30">
        <div className="p-8 border-b border-emerald-900/50">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
               <Briefcase size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold font-poppins tracking-tight">LawBridge</span>
          </Link>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2">
          {currentMenu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
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
          <button className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-emerald-100/50 hover:bg-red-500/10 hover:text-red-400 w-full transition-all">
            <Settings size={20} />
            Settings
          </button>
          <button className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-emerald-100/50 hover:bg-red-500/10 hover:text-red-400 w-full transition-all">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-24 bg-white border-b border-slate-100 px-10 flex items-center justify-between relative z-20">
           <div>
              <h1 className="text-2xl font-bold text-slate-800 font-poppins">{role} Dashboard</h1>
              <p className="text-slate-400 text-sm font-medium">Welcome back, {user} 👋</p>
           </div>
           
           <div className="flex items-center gap-6">
              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-600 transition-colors relative">
                 <Bell size={20} />
                 <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center gap-4 p-1.5 bg-slate-50 rounded-2xl pr-6 border border-slate-100">
                 <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-xl object-cover shadow-md"
                 />
                 <div>
                    <p className="text-sm font-bold text-slate-800">{user}</p>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-black">{role}</p>
                 </div>
              </div>
           </div>
        </header>

        {/* Content Overflow Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#F8FAF9]">
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
