const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            'http://localhost:3000', 
            'http://localhost:5173',
            'https://lawbridge-fyp-xcg3-i0jeaicb0-iman-ayazs-projects.vercel.app',
            'https://lawbridge-fyp.vercel.app'
        ];
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure DB is connected before handling any requests (crucial for serverless)
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/case', require('./routes/caseRoutes'));
app.use('/api/lawyers', require('./routes/lawyerRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/templates', require('./routes/templateRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin/auth', require('./routes/adminAuth'));

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to LawBridge AI Backend' });
});
// Testing API
app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "The Api Endpoint is working fine",
  });
});
// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
