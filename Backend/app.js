const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to LawBridge AI Backend' });
});

module.exports = app;
