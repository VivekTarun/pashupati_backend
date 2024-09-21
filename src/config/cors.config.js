const cors = require('cors');
const { FRONTEND_URL } = require('./server.config')
// CORS options setup
const corsOptions = {
    origin: (origin, callback) => {
        // Allow specific origins, including your frontend domain
        const allowedOrigins = [FRONTEND_URL, 'http://localhost:8080'];

        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// Export the CORS middleware
module.exports = cors(corsOptions);
