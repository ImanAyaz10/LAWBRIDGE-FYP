const Payment = require('../models/Payment');

const processPayment = async (req, res) => {
    res.json({ message: "Payment processed (Skeleton)" });
};

const getPaymentHistory = async (req, res) => {
    res.json({ message: "Payment history fetched (Skeleton)" });
};

module.exports = {
    processPayment,
    getPaymentHistory,
};
