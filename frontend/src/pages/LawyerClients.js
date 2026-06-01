import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { User, Mail, AlertCircle } from "lucide-react";
import API from "../services/api";

function LawyerClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await API.get("/appointments/my");
        // Extract unique clients from appointments
        const seen = new Set();
        const uniqueClients = [];
        response.data.forEach((app) => {
          const clientId = app.userId?._id;
          if (clientId && !seen.has(clientId)) {
            seen.add(clientId);
            uniqueClients.push({
              _id: clientId,
              name: app.userId?.name || "Client",
              email: app.userId?.email || "N/A",
              status: app.status,
              date: app.date,
            });
          }
        });
        setClients(uniqueClients);
      } catch (err) {
        setError("Failed to load client data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  return (
    <DashboardLayout role="Lawyer" user={userInfo.name || "Lawyer"}>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
         {/* Banner Card */}
         <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
           <div className="text-left space-y-2">
              <h2 className="text-3xl font-black font-poppins">My Clients</h2>
              <p className="text-emerald-100/70 font-medium text-sm">View all clients who have booked consultations with you.</p>
           </div>
         </div>

         {error && (
           <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-2 border border-red-100">
             <AlertCircle size={18} />
             <span className="font-bold">{error}</span>
           </div>
         )}

         {loading ? (
           <div className="flex items-center justify-center h-48">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clients.length > 0 ? (
                clients.map((client, i) => (
                 <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 flex items-center gap-5 transition-all hover:shadow-xl">
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 font-black text-xl flex-shrink-0">
                      {client.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="font-bold text-slate-800 text-lg truncate">{client.name}</h4>
                       <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mt-1">
                         <Mail size={12} />
                         <span className="truncate">{client.email}</span>
                       </div>
                       <div className="flex items-center gap-2 mt-2">
                         <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase ${
                           client.status === 'Accepted' ? "text-emerald-600 bg-emerald-50 border border-emerald-100" :
                           client.status === 'Pending' ? "text-yellow-600 bg-yellow-50 border border-yellow-100" :
                           "text-slate-500 bg-slate-50 border border-slate-100"
                         }`}>
                           {client.status}
                         </span>
                         <span className="text-[10px] text-slate-400 font-bold">
                           Since {new Date(client.date).toLocaleDateString()}
                         </span>
                       </div>
                    </div>
                 </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-slate-400 font-bold bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <User className="mx-auto mb-4 text-slate-300" size={48} />
                  No clients found yet. Clients will appear here once they book appointments.
                </div>
              )}
           </div>
         )}
      </div>
    </DashboardLayout>
  );
}

export default LawyerClients;
