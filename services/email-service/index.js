require('dotenv').config();
const express = require('express');
const emailRoutes = require('./routes/emails');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5004;

// Routes
// Note: API Gateway forwards requests from /api/emails to this service.
app.use('/api/emails', emailRoutes);

app.get('/health', (req, res) => {
    res.json({ service: 'email-service', status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`email-service running on port ${PORT}`);
});