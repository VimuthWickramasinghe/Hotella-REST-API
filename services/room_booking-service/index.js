const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5002;

app.get('/health', (req, res) => {
    res.json({ service: 'room-booking-service', status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`room-booking-service running on port ${PORT}`);
});