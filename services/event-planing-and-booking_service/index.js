const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5003;

app.get('/health', (req, res) => {
    res.json({ service: 'event-planing-and-booking-service', status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`event-planing-and-booking-service running on port ${PORT}`);
});