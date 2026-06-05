const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5005;

app.get('/health', (req, res) => {
    res.json({ service: 'external-payment-api', status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`external-payment-api running on port ${PORT}`);
});