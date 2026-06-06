const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5005;

// Health check endpoint
app.get('/api/payments/health', (req, res) => {
    res.json({ service: 'external-payment-api', status: 'OK', runtime: 'Node.js' });
});

// Mock payment processing endpoint
app.post('/api/payments/process', (req, res) => {
    const { amount, currency, cardNumber, expiryDate, cvv } = req.body;

    // Basic validation mock
    const isSuccess = amount != null && amount > 0 && cardNumber != null && cardNumber.length >= 12;

    const transactionId = uuidv4();
    const status = isSuccess ? 'SUCCESS' : 'FAILED';
    const message = isSuccess ? 'Payment processed successfully' : 'Payment processing failed due to invalid details';

    const response = {
        transactionId,
        status,
        message,
        amount
    };

    if (isSuccess) {
        return res.status(200).json(response);
    } else {
        return res.status(400).json(response);
    }
});

app.listen(PORT, () => {
    console.log(`external-payment-api (Node.js) running on port ${PORT}`);
});