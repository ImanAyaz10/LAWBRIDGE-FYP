import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // mobile menu state
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBgColor = (!isHomePage || scrolled)
    ? 'bg-[#064e3b] shadow-2xl py-4'
    : 'bg-transparent py-6';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBgColor}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo & Headline */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-16 h-16 overflow-hidden rounded-xl bg-[#032b21] flex items-center justify-center p-1 shadow-lg border border-emerald-800">
            <svg className="w-10 h-10 text-[#f1edd3] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0L2.62 15.696c-.122.499.106 1.028.589 1.202a5.988 5.988 0 012.031.352 5.988 5.988 0 012.031-.352c.483-.174.711-.703.59-1.202L5.25 4.97z" />
            </svg>
          </div>
          <div className="flex flex-col border-l-2 border-emerald-400/30 pl-4">
            <span className="text-2xl font-extrabold font-poppins tracking-tight text-[#f1edd3] leading-tight">LawBridge</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-black">Bridging Clients & Lawyers</span>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Links for desktop */}
        <div className="hidden md:flex space-x-10 items-center">
          <Link to="/" className="text-white hover:text-emerald-400 font-semibold transition-colors">Home</Link>
          <Link to="/about" className="text-white hover:text-emerald-400 font-semibold transition-colors">About</Link>
          <Link to="/lawyers" className="text-white hover:text-emerald-400 font-semibold transition-colors">Lawyers</Link>
          <Link to="/categories" className="text-white hover:text-emerald-400 font-semibold transition-colors">Categories</Link>
          <Link to="/legal-documents" className="text-white hover:text-emerald-400 font-semibold transition-colors">Templates</Link>
          <Link to="/contact" className="text-white hover:text-emerald-400 font-semibold transition-colors">Contact</Link>
          {token ? (
            <>
              {user?.role === 'lawyer' && (
                <Link to="/lawyer-dashboard" className="text-white hover:text-emerald-400 font-semibold transition-colors">Dashboard</Link>
              )}
              {user?.role === 'client' && (
                <Link to="/user-dashboard" className="text-white hover:text-emerald-400 font-semibold transition-colors">Dashboard</Link>
              )}
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-white hover:text-emerald-400 font-semibold transition-colors">Admin</Link>
              )}
              <button onClick={() => { logout(); navigate('/'); }} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg active:scale-95">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-[#f1edd3] hover:bg-white text-[#064e3b] px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95">
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-[#064e3b] shadow-lg md:hidden transition-transform duration-300">
            <div className="flex flex-col space-y-4 py-4 px-6">
              <Link onClick={() => setIsOpen(false)} to="/" className="text-white hover:text-emerald-400 font-semibold">Home</Link>
              <Link onClick={() => setIsOpen(false)} to="/about" className="text-white hover:text-emerald-400 font-semibold">About</Link>
              <Link onClick={() => setIsOpen(false)} to="/lawyers" className="text-white hover:text-emerald-400 font-semibold">Lawyers</Link>
              <Link onClick={() => setIsOpen(false)} to="/categories" className="text-white hover:text-emerald-400 font-semibold">Categories</Link>
              <Link onClick={() => setIsOpen(false)} to="/legal-documents" className="text-white hover:text-emerald-400 font-semibold">Templates</Link>
              <Link onClick={() => setIsOpen(false)} to="/contact" className="text-white hover:text-emerald-400 font-semibold">Contact</Link>
              {token ? (
                <>
                  {user?.role === 'lawyer' && (
                    <Link onClick={() => setIsOpen(false)} to="/lawyer-dashboard" className="text-white hover:text-emerald-400 font-semibold">Dashboard</Link>
                  )}
                  {user?.role === 'client' && (
                    <Link onClick={() => setIsOpen(false)} to="/user-dashboard" className="text-white hover:text-emerald-400 font-semibold">Dashboard</Link>
                  )}
                  {user?.role === 'admin' && (
                    <Link onClick={() => setIsOpen(false)} to="/admin" className="text-white hover:text-emerald-400 font-semibold">Admin</Link>
                  )}
                  <button onClick={() => { logout(); navigate('/'); setIsOpen(false); }} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-bold">
                    Logout
                  </button>
                </>
              ) : (
                <Link onClick={() => setIsOpen(false)} to="/login" className="bg-[#f1edd3] hover:bg-white text-[#064e3b] px-8 py-3 rounded-xl font-bold">
                  Get Started
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;