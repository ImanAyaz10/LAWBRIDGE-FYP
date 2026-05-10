import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

import EmergencyHelp from "./pages/EmergencyHelp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CaseTimeline from "./pages/CaseTimeline";
import Signup from "./pages/Signup";
import FindLawyer from "./pages/FindLawyer";
import LawyerProfile from "./pages/LawyerProfile";
import LawyerDashboard from "./pages/LawyerDashboard";
import CostEstimator from "./pages/CostEstimator";
import BookAppointment from "./pages/BookAppointment";
import AIChat from "./pages/AIChat";

import AIAssistant from "./pages/AIAssistant";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import LegalRoadmap from "./pages/LegalRoadmap";
import AdminDashboard from "./pages/AdminDashboard";
import CaseComplexity from "./pages/CaseComplexity";
import Documents from "./pages/Documents";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ContactFinder from "./pages/ContactFinder";
import CaseScoreboard from "./pages/CaseScoreboard";
import Categories from "./pages/Categories";
import FamilyLawyers from "./pages/FamilyLawyers";
import RecommendedLawyers from "./pages/RecommendedLawyers";
import LegalDocuments from "./pages/LegalDocuments";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/lawyers" element={<FindLawyer />} />
            <Route path="/profile/:id" element={<LawyerProfile />} />
            <Route path="/lawyer-dashboard" element={
              <ProtectedRoute allowedRoles={['lawyer']}>
                <LawyerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/book-appointment/:id" element={<BookAppointment />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/case-complexity" element={<CaseComplexity />} />
            <Route path="/cost-estimator" element={<CostEstimator />} />
            <Route path="/legal-roadmap" element={<LegalRoadmap />} />
            <Route path="/case-timeline" element={<CaseTimeline />} />
            <Route path="/case-visibility" element={<CaseScoreboard />} />
            <Route path="/contact-finder" element={<ContactFinder />} />
            <Route path="/emergency-help" element={<EmergencyHelp />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/user-dashboard" element={
              <ProtectedRoute allowedRoles={['client']}>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/documents" element={<Documents />} />
            <Route path="/legal-documents" element={<LegalDocuments />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/family-lawyers" element={<FamilyLawyers />} />
            <Route path="/recommended-lawyers" element={<RecommendedLawyers />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </LanguageProvider>
    </AuthProvider>
  );
}

export default App;