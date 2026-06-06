import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Loader2, AlertCircle, FileText, Calendar, Users, Briefcase, Printer, Search } from "lucide-react";
import API from "../services/api";

function AdminReports() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClients: 0,
    totalLawyers: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    acceptedAppointments: 0,
  });
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        setLoading(true);
        // Fetch all users and appointments
        const [usersRes, appointmentsRes] = await Promise.all([
          API.get("/admin/users"),
          API.get("/admin/appointments")
        ]);

        const usersList = usersRes.data;
        const apptsList = appointmentsRes.data;

        const clientsCount = usersList.filter(u => u.role === "client" || u.role === "user").length;
        const lawyersCount = usersList.filter(u => u.role === "lawyer").length;

        setStats({
          totalUsers: usersList.length,
          totalClients: clientsCount,
          totalLawyers: lawyersCount,
          totalAppointments: apptsList.length,
          pendingAppointments: apptsList.filter(a => a.status === "Pending").length,
          acceptedAppointments: apptsList.filter(a => a.status === "Accepted").length,
        });

        setAppointments(apptsList);
      } catch (err) {
        console.error("Failed to load reports data:", err);
        setError("Failed to load system reports and analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportsData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const filteredAppointments = appointments.filter(appt => 
    appt.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.lawyerId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="Admin" user="Admin">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 print:bg-white print:p-0">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div>
            <h2 className="text-3xl font-black text-slate-800 font-poppins">System Reports & Analytics</h2>
            <p className="text-slate-400 font-medium text-sm mt-1">Real-time overview of users, lawyers, and scheduled appointments.</p>
          </div>

          <button
            onClick={handlePrint}
            className="bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 active:scale-95 transition-all text-sm self-start md:self-auto"
          >
            <Printer size={18} />
            Print Global Report
          </button>
        </div>

        {/* Print-only Header */}
        <div className="hidden print:block border-b-2 border-slate-800 pb-4 mb-8">
          <h1 className="text-3xl font-bold text-slate-900">LawBridge Platform Global Report</h1>
          <p className="text-slate-500 mt-1">Generated on: {new Date().toLocaleString()}</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold flex items-center gap-3 print:hidden">
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2 print:hidden">
            <Loader2 className="animate-spin text-emerald-600" size={40} />
            <p className="text-sm font-bold">Calculating platform statistics...</p>
          </div>
        ) : (
          <>
            {/* System Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Users Summary Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 relative overflow-hidden">
                <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Platform Users</p>
                  <h3 className="text-2xl font-black text-slate-800 font-poppins mt-1">{stats.totalUsers} Total</h3>
                  <p className="text-slate-400 text-xs mt-1 font-medium">{stats.totalClients} Clients | {stats.totalLawyers} Lawyers</p>
                </div>
              </div>

              {/* Lawyers Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 relative overflow-hidden">
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
                  <Briefcase size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Registered Lawyers</p>
                  <h3 className="text-2xl font-black text-slate-800 font-poppins mt-1">{stats.totalLawyers} Active</h3>
                  <p className="text-slate-400 text-xs mt-1 font-medium">100% Verified bar credentials</p>
                </div>
              </div>

              {/* Appointments Summary Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 relative overflow-hidden">
                <div className="p-4 rounded-2xl bg-purple-50 text-purple-600 shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Appointments</p>
                  <h3 className="text-2xl font-black text-slate-800 font-poppins mt-1">{stats.totalAppointments} Created</h3>
                  <p className="text-slate-400 text-xs mt-1 font-medium">{stats.acceptedAppointments} Accepted | {stats.pendingAppointments} Pending</p>
                </div>
              </div>

            </div>

            {/* Platform Appointments Details Section */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 print:hidden">
                <h3 className="text-xl font-bold text-slate-800 font-poppins flex items-center gap-2">
                  <FileText size={20} className="text-emerald-600" />
                  Appointments Directory
                </h3>

                {/* Filter input */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Filter by name, status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium"
                  />
                </div>
              </div>

              {/* Print-only Section Header */}
              <h3 className="hidden print:block text-lg font-bold mb-4">Scheduled Platform Appointments</h3>

              {filteredAppointments.length === 0 ? (
                <p className="text-slate-500 font-medium text-center py-12">No scheduled appointments found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[750px]">
                    <thead>
                      <tr className="text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-100">
                        <th className="pb-4 px-4 font-black">Client Name</th>
                        <th className="pb-4 px-4 font-black">Assigned Lawyer</th>
                        <th className="pb-4 px-4 font-black">Specialization</th>
                        <th className="pb-4 px-4 font-black">Scheduled Date</th>
                        <th className="pb-4 px-4 font-black">Scheduled Time</th>
                        <th className="pb-4 px-4 font-black text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appt, i) => (
                        <tr key={appt._id || i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                          <td className="py-4 px-4 font-bold text-slate-700">{appt.userId?.name || "Deleted User"}</td>
                          <td className="py-4 px-4 text-slate-700 font-medium">{appt.lawyerId?.name || "Deleted Lawyer"}</td>
                          <td className="py-4 px-4 text-slate-500 text-xs">
                            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 font-bold rounded-md uppercase">
                              {appt.lawyerId?.specialization || "General"}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-500 text-sm font-semibold">
                            {new Date(appt.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            })}
                          </td>
                          <td className="py-4 px-4 text-slate-400 text-sm font-bold">{appt.time}</td>
                          <td className="py-4 px-4 text-right">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              appt.status === "Accepted" 
                                ? "bg-emerald-100 text-emerald-700" 
                                : appt.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {appt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}

export default AdminReports;
