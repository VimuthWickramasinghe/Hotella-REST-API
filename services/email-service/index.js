const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5004;

app.get('/health', (req, res) => {
    res.json({ service: 'email-service', status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`email-service running on port ${PORT}`);
});