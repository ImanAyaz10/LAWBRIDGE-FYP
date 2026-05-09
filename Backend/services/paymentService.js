const processPayment = async (amount, method) => {
    // Logic for Stripe/Paypal
    return { status: 'success', transactionId: 'TXN12345' };
};

module.exports = { processPayment };
