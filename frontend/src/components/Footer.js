import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-100/60 pt-20 pb-10 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 lg:col-span-1">
          {/* Logo in Footer */}
          <div className="flex items-center space-x-3 text-white mb-6 group">
            <div className="w-12 h-12 bg-[#032b21] rounded-xl flex items-center justify-center p-1 border border-emerald-800 shadow-lg group-hover:border-emerald-500 transition-colors">
               <svg className="w-8 h-8 text-[#f1edd3] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0L2.62 15.696c-.122.499.106 1.028.589 1.202a5.988 5.988 0 012.031.352 5.988 5.988 0 012.031-.352c.483-.174.711-.703.59-1.202L5.25 4.97z" />
               </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-poppins tracking-tight text-[#f1edd3] leading-none">LawBridge</span>
              <span className="text-[8px] uppercase tracking-widest text-emerald-400 font-bold mt-1 uppercase">Bridging Clients & Lawyers</span>
            </div>
          </div>
          
          <p className="text-emerald-100/60 leading-relaxed mb-8 text-sm">
            Providing smart legal solutions and connecting you with the most experienced legal minds since 2026.
          </p>
          <div className="flex space-x-4">
             <a href="https://www.facebook.com/share/18JeRb6C1p/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-500 hover:text-emerald-950 transition-all shadow-lg" title="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
             </a>
             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-500 hover:text-emerald-950 transition-all shadow-lg" title="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
             </a>
             <a href="https://www.instagram.com/lawbridge79?igsh=MTJva2l2NHpreGN1cA==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-500 hover:text-emerald-950 transition-all shadow-lg" title="Instagram">
                <svg className="w-5 h-5 border-2 border-current rounded-[4px] p-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
             </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6 underline decoration-emerald-500 decoration-2 underline-offset-8">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
            <li><Link to="/lawyers" className="hover:text-emerald-400 transition-colors">Find a Lawyer</Link></li>
            <li><Link to="/legal-documents" className="hover:text-emerald-500 transition-colors">Legal Templates</Link></li>
            <li><Link to="/emergency-help" className="hover:text-red-500 font-bold transition-colors">Emergency Help</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6 underline decoration-emerald-500 decoration-2 underline-offset-8">Services</h4>
          <ul className="space-y-4">
            <li><Link to="/categories" className="hover:text-emerald-400 transition-colors">Legal Categories</Link></li>
            <li><Link to="/ai-assistant" className="hover:text-emerald-400 transition-colors">AI Intelligence Hub</Link></li>
            <li><Link to="/case-timeline" className="hover:text-emerald-400 transition-colors">Case Tracker</Link></li>
            <li><Link to="/legal-roadmap" className="hover:text-emerald-400 transition-colors">Procedural Roadmap</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6 underline decoration-emerald-500 decoration-2 underline-offset-8">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Lahore, PK</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
              <a href="tel:+923001234567" className="hover:text-emerald-400 transition-colors">+92 300 1234567</a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
              <a href="mailto:lawbridge77@gmail.com" className="hover:text-emerald-400 transition-colors">lawbridge77@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Sleek, Modern Copyright Line */}
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-emerald-900 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] inline-flex flex-wrap justify-center items-center gap-2">
            <span className="text-emerald-500 font-extrabold">© 2026 LawBridge</span>
            <span className="w-1 h-1 bg-emerald-800 rounded-full" />
            <span className="text-[#f1edd3] font-medium opacity-80 italic">Bridging Clients and Lawyers</span>
            <span className="w-1 h-1 bg-emerald-800 rounded-full" />
            <span className="text-emerald-400 font-black">Securely & Smartly</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
