import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FileUp, ShieldCheck, FileText } from "lucide-react";

function Document() {
  const [file, setFile] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a document first");
      return;
    }
    alert("Document uploaded successfully!");
  };

  return (
    <DashboardLayout role="Client" user={userInfo.name || "User"}>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
         {/* Banner Card */}
         <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
           <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl font-black font-poppins">Secure Document Upload</h2>
              <p className="text-emerald-100/70 font-medium text-sm">Upload your legal documents safely for review by experts.</p>
           </div>
         </div>

         <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row mt-10">
           {/* Left Info Panel */}
           <div className="bg-emerald-900 p-10 text-white md:w-1/3 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                 <ShieldCheck className="text-emerald-400 w-8 h-8" />
                 <h3 className="text-xl font-bold">Encrypted</h3>
              </div>
              <p className="text-emerald-100/70 text-sm leading-relaxed mb-8">
                Your documents are safe with us. We use end-to-end encryption for all legal uploads.
              </p>
              <div className="flex items-center gap-3">
                 <FileText className="text-emerald-400 w-8 h-8" />
                 <h3 className="text-xl font-bold">Fast Review</h3>
              </div>
           </div>

           {/* Right Upload Panel */}
           <div className="p-10 md:w-2/3">
             <h2 className="text-2xl font-bold text-slate-800 mb-6 font-poppins">Select File</h2>
             <form onSubmit={handleUpload}>
               <div className="border-2 border-dashed border-emerald-200 rounded-2xl p-12 text-center hover:bg-emerald-50 transition-colors cursor-pointer group mb-8">
                 <input
                   type="file"
                   id="doc-upload"
                   className="hidden"
                   onChange={(e) => setFile(e.target.files[0])}
                 />
                 <label htmlFor="doc-upload" className="cursor-pointer">
                   <FileUp className="w-16 h-16 text-emerald-300 mx-auto mb-4 group-hover:text-emerald-600 transition-colors" />
                   <p className="text-slate-600 font-medium">
                     {file ? file.name : "Drag & drop or Click to upload"}
                   </p>
                   <p className="text-xs text-slate-400 mt-2">PDF, DOCX, or PNG (Max 10MB)</p>
                 </label>
               </div>

               <button
                 type="submit"
                 className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/30 active:scale-[0.98]"
               >
                 Upload Document Now
               </button>
             </form>
           </div>
         </div>
      </div>
    </DashboardLayout>
  );
}

export default Document;