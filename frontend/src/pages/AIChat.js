import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { Send, Bot, User, Loader2, AlertCircle } from "lucide-react";
import API from "../services/api";

function AIChatAssistant() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchChatHistory = async () => {
      try {
        const response = await API.get("/chat/history");
        const history = response.data.map(msg => ({
          text: msg.content,
          sender: msg.role === "assistant" ? "ai" : "user",
          id: msg._id
        }));
        
        if (history.length === 0) {
          setChat([{ text: "Hello! I am your AI Legal Assistant. How can I help you with your legal issues today?", sender: "ai", id: "default" }]);
        } else {
          setChat(history);
        }
      } catch (err) {
        console.error("Failed to fetch chat history", err);
        setError("Could not load chat history. You can still start a new chat.");
        setChat([{ text: "Hello! I am your AI Legal Assistant. How can I help you with your legal issues today?", sender: "ai", id: "default" }]);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchChatHistory();
  }, [navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const sendMessage = async (presetText) => {
    const textToSend = presetText || message;
    if (textToSend.trim() === "" || loading) return;

    const userMessage = { text: textToSend, sender: "user", id: Date.now() };
    setChat(prev => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/chat", { content: textToSend });
      const aiMessage = { 
        text: response.data.aiMessage.content, 
        sender: "ai",
        id: response.data.aiMessage._id 
      };
      setChat(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error("Failed to send message", err);
      const errorDetail = err.response?.data?.detail || "Failed to get response. Please check your connection.";
      setError(errorDetail);
      setChat(prev => [...prev, { text: `Sorry, I encountered an issue: ${errorDetail}`, sender: "ai", id: "error-" + Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
      <p className="text-slate-500 font-medium">Initializing AI Assistant...</p>
    </div>
  );

  return (
    <PageTransition>
      <PageHeader 
        title="AI Legal Assistant" 
        subtitle="Get instant answers to your legal queries from our smart AI."
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col h-[650px] relative">
          
          {error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-red-50 text-red-600 px-6 py-2 rounded-full border border-red-100 flex items-center gap-2 text-sm font-bold shadow-lg animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50">
            {chat.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md ${msg.sender === "user" ? "bg-emerald-600 text-white" : "bg-white text-emerald-600 border border-emerald-100"}`}>
                    {msg.sender === "user" ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm ${msg.sender === "user" ? "bg-emerald-600 text-white rounded-tr-none" : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"}`}>
                    {msg.sender === "ai" ? (
                      <div className="leading-relaxed text-sm md:text-base space-y-1">
                        {msg.text.split('\n').filter(line => line.trim() !== '').map((line, i) => {
                          // Check if line is a bullet point (starts with "- ")
                          const isBullet = line.trim().startsWith('- ');
                          const content = isBullet ? line.trim().substring(2) : line;
                          // Render bold text wrapped in **...**
                          const renderBold = (text) => {
                            const parts = text.split(/(\*\*.*?\*\*)/g);
                            return parts.map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={j}>{part.slice(2, -2)}</strong>;
                              }
                              return <span key={j}>{part}</span>;
                            });
                          };
                          return isBullet ? (
                            <div key={i} className="flex items-start gap-2 py-0.5">
                              <span className="text-emerald-500 font-bold mt-0.5 shrink-0">•</span>
                              <span>{renderBold(content)}</span>
                            </div>
                          ) : (
                            <p key={i} className="py-0.5">{renderBold(content)}</p>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="leading-relaxed text-sm md:text-base">{msg.text}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-white text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-md">
                    <Bot size={20} />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* AI Legal Disclaimer */}
          <div className="bg-orange-50 border-y border-orange-100 p-3 px-6 flex items-center gap-3">
             <AlertCircle size={16} className="text-orange-500 flex-shrink-0" />
             <p className="text-xs text-orange-800 font-medium">
               <strong>Disclaimer:</strong> This AI assistant provides general legal information based on Pakistan law, not official legal advice. Always consult a qualified attorney before taking legal action.
             </p>
          </div>

          {/* Chat Input */}
          <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
               {["Draft a contract", "Divorce laws in Pakistan", "Property dispute", "Child custody"].map(q => (
                 <button 
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="whitespace-nowrap px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
                 >
                    {q}
                 </button>
               ))}
            </div>
            <div className="flex gap-4 items-center bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
              <input
                type="text"
                placeholder="Describe your legal issue..."
                className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-slate-700 font-medium"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button 
                onClick={() => sendMessage()}
                disabled={loading || !message.trim()}
                className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-[0.2em] font-black">LawBridge Secure AI</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default AIChatAssistant;