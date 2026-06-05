const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get('/health', (req, res) => {
    res.json({ service: 'auth-service', status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`auth-service running on port ${PORT}`);
});