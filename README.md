# 🏛️ LawBridge — AI-Powered Legal Services Platform
<div align="center">
![LawBridge Banner](https://img.shields.io/badge/LawBridge-LegalTech%20Platform-064e3b?style=for-the-badge&logo=balance-scale)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-10b981?style=for-the-badge&logo=vercel)](https://lawbridge-fyp-xcg3.vercel.app/)
[![React](https://img.shields.io/badge/Frontend-React%20v19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![AI Integration](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2?style=for-the-badge&logo=google)](https://ai.google.dev/)
**Bridging Citizens & Verified Legal Professionals in Pakistan — Access to Justice Made Simple.**
[Explore Live Demo](https://lawbridge-fyp-xcg3.vercel.app/) · [Report Bug](https://github.com/ImanAyaz10/LAWBRIDGE-FYP/issues) · [Request Feature](https://github.com/ImanAyaz10/LAWBRIDGE-FYP/issues)
</div>
---
## 📌 About The Project
**LawBridge** is a full-stack web application developed as a **Final Year Project (FYP)** to digitize and democratize legal services in Pakistan. 
Navigating the legal system is often daunting, expensive, and filled with procedural complexity. **LawBridge** solves this by providing citizens with an all-in-one digital hub for instant AI-driven legal consultations, lawyer discovery, appointment scheduling, automated legal document generation, case complexity analysis, and fee estimation.
### 🌟 Why LawBridge?
- **Democratizing Legal Guidance**: Get immediate answers to basic legal questions 24/7.
- **Verified Legal Network**: Connect directly with licensed lawyers filtered by domain & city.
- **Automated Documentation**: Generate legally formatted affidavits, contracts, and agreements in seconds.
- **Fee Transparency**: Estimate case costs before hiring legal counsel.
---
## ✨ Key Features
|
 Feature 
|
 Description 
|
|
:---
|
:---
|
|
 🤖 
**
AI Legal Assistant
**
|
 Interactive AI assistant powered by Google Gemini to answer Pakistan legal queries instantly. 
|
|
 👨‍⚖️ 
**
Lawyer Directory & Search
**
|
 Browse, filter, and search verified lawyers by specialization, location, and rating. 
|
|
 📅 
**
Appointment Management
**
|
 Book legal consultation slots directly with preferred lawyers. 
|
|
 📄 
**
Legal Document Generator
**
|
 Dynamic client-side (jsPDF) & server-side document synthesis for contracts & legal forms. 
|
|
 📊 
**
Case Complexity Analyzer
**
|
 AI tool that evaluates case severity, estimated timeframe, and procedural steps. 
|
|
 💰 
**
Cost Estimator
**
|
 Transparent legal fee calculator tailored to specific case types and court levels. 
|
|
 🗺️ 
**
Legal Roadmap
**
|
 Interactive step-by-step visual guide for court proceedings and legal rights. 
|
|
 🚨 
**
Emergency Legal Aid
**
|
 Quick directory of urgent legal helpline numbers and emergency assistance contacts. 
|
|
 👤 
**
Multi-Role Dashboards
**
|
 Customized admin, lawyer, and client management dashboards. 
|
|
 🔒 
**
Secure Auth & RBAC
**
|
 JWT-based authentication with bcrypt password encryption & role control. 
|
---
## 🛠️ Tech Stack & Architecture
### **Frontend**
- **Framework**: [React.js](https://reactjs.org/) (v19) with `react-router-dom` (v7)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons & Animations**: [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/)
- **Document Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **HTTP Client**: [Axios](https://axios-http.com/)
### **Backend**
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) (v5)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ORM](https://mongoosejs.com/)
- **AI Engine**: [Google Gemini AI REST API](https://ai.google.dev/)
- **File Uploads**: [Multer](https://github.com/expressjs/multer)
- **PDF Generation**: [Puppeteer](https://pptr.dev/)
- **Security & Utilities**: JWT (`jsonwebtoken`), `bcryptjs`, `cors`, `dotenv`, `nodemailer`
### **Deployment**
- **Frontend & Backend Hosting**: [Vercel](https://vercel.com/)
---
## 🚀 Getting Started
Follow these steps to set up and run **LawBridge** locally on your machine.
### **Prerequisites**
- **Node.js** (`v18.x` or higher) installed
- **MongoDB** instance (local or MongoDB Atlas URI)
- **Google Gemini API Key** (for AI features)
---
### **1. Clone the Repository**
```bash
git clone https://github.com/ImanAyaz10/LAWBRIDGE-FYP.git
cd LAWBRIDGE-FYP
2. Backend Setup
bash


# Navigate to backend directory
cd Backend
# Install dependencies
npm install
# Create environment file
cp .env.example .env
Configure your Backend/.env file:

env


PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
Start the backend development server:

bash


npm run dev
Backend will run at http://localhost:5000.

3. Frontend Setup
Open a new terminal:

bash


# Navigate to frontend directory
cd frontend
# Install dependencies
npm install
# Start development server
npm start
Frontend will run at http://localhost:3000.

📁 Repository Directory Structure
text


LAWBRIDGE-FYP/
├── Backend/
│   ├── config/          # DB connection & server configurations
│   ├── controllers/     # Route logic (Auth, Lawyers, AI, Appointments)
│   ├── middleware/      # Auth & Error handling middlewares
│   ├── models/          # Mongoose DB Schemas (User, Lawyer, Document, Appointment)
│   ├── routes/          # API Route Definitions
│   ├── services/        # AI Service & Email service integrations
│   ├── uploads/         # Uploaded documents & profile images
│   ├── app.js           # Express App initialization
│   ├── server.js        # Server entry point
│   └── package.json
│
├── frontend/
│   ├── public/          # Static assets & HTML template
│   ├── src/
│   │   ├── assets/      # Images & branding assets
│   │   ├── components/  # Reusable UI components (Navbar, Footer, Modals)
│   │   ├── context/     # React Auth & Language Context Providers
│   │   ├── pages/       # App pages (Home, Lawyers, AIChat, DocumentGen, Dashboards)
│   │   ├── services/    # API Axios service modules
│   │   ├── App.js       # Main Router & Routing logic
│   │   └── index.js     # React root renderer
│   └── package.json
│
└── README.md
🔗 Main API Endpoints Summary
Method	Endpoint	Description
POST	/api/auth/register	Register a new client or lawyer user account
POST	/api/auth/login	Authenticate user & return JWT token
GET	/api/lawyers	Retrieve list of verified lawyers (supports filtering)
GET	/api/lawyers/:id	Fetch specific lawyer details & available slots
POST	/api/appointments	Book a consultation slot with a lawyer
POST	/api/ai/chat	Send legal query to Gemini AI & return structured answer
POST	/api/ai/complexity	Analyze case complexity using AI
POST	/api/documents/generate	Generate customized legal document
👥 Authors & Academic Context
Project Title: LawBridge — Bridging Clients & Lawyers
Degree Program: Bachelor of Science in Computer Science (BSCS)
Location: Lahore, Pakistan
Contact Email: 
lawbridge77@gmail.com
Instagram: @lawbridge79
📄 License
This project is developed for academic purposes under the Final Year Project (FYP) curriculum.

Built with ❤️ by the LawBridge Team • 2026
```
