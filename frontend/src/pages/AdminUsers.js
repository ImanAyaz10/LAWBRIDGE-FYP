import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Search, Trash2, Loader2, AlertCircle, CheckCircle, Users } from "lucide-react";
import API from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await API.get("/admin/users");
      // Filter out clients/general users (exclude admin and lawyers)
      const allClients = response.data.filter(u => u.role === "client" || u.role === "user");
      setUsers(allClients);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to fetch users list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user account? This will permanently delete their data.")) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");
      await API.delete(`/admin/users/${id}`);
      setSuccess("User deleted successfully!");
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError(err.response?.data?.message || "Failed to delete user.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="Admin" user="Admin">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-800 font-poppins">Registered Clients</h2>
            <p className="text-slate-400 font-medium text-sm mt-1">Manage and view all registered users and clients on the platform.</p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Feedback Messages */}
        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 font-bold flex items-center gap-3">
            <CheckCircle className="text-emerald-500 flex-shrink-0" size={20} />
            {success}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold flex items-center gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
            {error}
          </div>
        )}

        {/* Directory Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
              <Loader2 className="animate-spin text-emerald-600" size={40} />
              <p className="text-sm font-bold">Fetching clients directory...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
              <Users size={48} className="text-slate-300" />
              <p className="text-sm font-bold">No clients registered on the platform.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-100">
                    <th className="pb-4 px-4 font-black">Name</th>
                    <th className="pb-4 px-4 font-black">Email</th>
                    <th className="pb-4 px-4 font-black">Role</th>
                    <th className="pb-4 px-4 font-black">Registered On</th>
                    <th className="pb-4 px-4 font-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, i) => (
                    <tr key={user._id || i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                      <td className="py-5 px-4 font-bold text-slate-700">{user.name}</td>
                      <td className="py-5 px-4 text-slate-600 text-sm font-medium">{user.email}</td>
                      <td className="py-5 px-4 text-slate-500 text-sm">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg text-xs capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-5 px-4 text-slate-400 text-sm font-bold">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </td>
                      <td className="py-5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(user._id)}
                          disabled={deletingId === user._id}
                          className="p-2.5 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all inline-flex items-center active:scale-95 disabled:opacity-50"
                          title="Delete Client"
                        >
                          {deletingId === user._id ? (
                            <Loader2 className="animate-spin" size={18} />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}

export default AdminUsers;
