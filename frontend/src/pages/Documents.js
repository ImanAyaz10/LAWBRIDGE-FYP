import React, { useState } from "react";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import { FileUp, ShieldCheck, FileText } from "lucide-react";

function Document() {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a document first");
      return;
    }
    alert("Document uploaded successfully!");
  };

  return (
    <PageTransition>
      <PageHeader 
        title="Secure Document Upload" 
        subtitle="Upload your legal documents safely for review by experts."
      />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
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
    </PageTransition>
  );
}

export default Document;