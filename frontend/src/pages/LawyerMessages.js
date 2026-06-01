import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Send, MessageSquare } from "lucide-react";

function LawyerMessages() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const [messages, setMessages] = useState([
    { sender: "client", text: "Hello Sir, I have uploaded the property registry document. Can you look at it?" },
    { sender: "lawyer", text: "Yes, I am reviewing it right now. I will update you by tomorrow morning." },
    { sender: "client", text: "Great, thank you!" }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { sender: "lawyer", text: inputText }]);
    setInputText("");
  };

  return (
    <DashboardLayout role="Lawyer" user={userInfo.name || "Lawyer"}>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
         {/* Banner Card */}
         <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
           <div className="text-left space-y-2">
              <h2 className="text-3xl font-black font-poppins">Client Messages</h2>
              <p className="text-emerald-100/70 font-medium text-sm">Consult and chat with your active clients in real-time.</p>
           </div>
         </div>

         {/* Chat Interface Container */}
         <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col h-[500px]">
           {/* Chat Header */}
           <div className="bg-slate-55 p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
             <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
               <MessageSquare size={20} />
             </div>
             <div>
               <h4 className="font-bold text-slate-800">Ayesha Khan</h4>
               <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Active Consultation</p>
             </div>
           </div>

           {/* Message History */}
           <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
             {messages.map((msg, i) => (
               <div key={i} className={`flex ${msg.sender === "lawyer" ? "justify-end" : "justify-start"}`}>
                 <div className={`max-w-md p-4 rounded-2xl text-sm font-medium shadow-sm ${
                   msg.sender === "lawyer" 
                     ? "bg-emerald-600 text-white rounded-tr-none" 
                     : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                 }`}>
                   {msg.text}
                 </div>
               </div>
             ))}
           </div>

           {/* Input bar */}
           <form onSubmit={handleSend} className="p-4 border-t border-slate-100 flex gap-3 bg-white">
             <input
               type="text"
               placeholder="Type your reply here..."
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               className="flex-grow px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
             />
             <button type="submit" className="bg-[#032b21] hover:bg-emerald-950 text-white p-3.5 rounded-xl transition-all shadow-md active:scale-95">
               <Send size={18} />
             </button>
           </form>
         </div>
      </div>
    </DashboardLayout>
  );
}

export default LawyerMessages;
