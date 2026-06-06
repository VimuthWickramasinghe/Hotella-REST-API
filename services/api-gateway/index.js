const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests from frontends
app.use(morgan('dev')); // Log incoming requests

// Define Microservices Routing Map
// The keys are the base route paths, and values are the internal Docker network URLs or Localhost
const services = {
    '/api/auth': process.env.AUTH_SERVICE_URL || 'http://localhost:5001',
    '/api/rooms': process.env.ROOM_SERVICE_URL || 'http://localhost:5002',
    '/api/bookings': process.env.BOOKING_SERVICE_URL || 'http://localhost:5003',
    '/api/events': process.env.BOOKING_SERVICE_URL || 'http://localhost:5003',
    '/api/emails': process.env.EMAIL_SERVICE_URL || 'http://localhost:5004',
    '/api/payments': process.env.PAYMENT_SERVICE_URL || 'http://localhost:5005'
};

// Setup Proxies
for (const [route, target] of Object.entries(services)) {
    app.use(route, createProxyMiddleware({
        target,
        changeOrigin: true, // Needed for virtual hosted sites
        // We do not rewrite the path here. E.g., a request to /api/auth/login 
        // will be forwarded to http://auth-service:5001/api/auth/login
        onError: (err, req, res) => {
            console.error(`Proxy error for ${route}:`, err.message);
            res.status(502).json({ 
                message: 'Bad Gateway: Microservice is down or unreachable',
                service: target 
            });
        }
    }));
}

// Gateway Health Check
app.get('/health', (req, res) => {
    res.json({ service: 'api-gateway', status: 'OK' });
});

// Fallback route for unmatched requests
app.use((req, res) => {
    res.status(404).json({ message: 'API Gateway: Route not found' });
});

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
    console.log(`Routing traffic to:`, Object.keys(services).join(', '));
});