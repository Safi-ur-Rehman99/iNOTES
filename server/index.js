require('dotenv').config();
const connectToMongo=require('./db')
const express = require('express')
var cors = require('cors')

const app = express()
const port = process.env.PORT || 5000;
connectToMongo();

// Build a small whitelist for allowed origins (trim trailing slashes)
const normalize = (u) => (u || '').replace(/\/+$/, '');
const prodClient = normalize(process.env.CLIENT_URL || 'https://i-notes-client-flax.vercel.app');
const whitelist = [prodClient, 'http://localhost:3000', 'http://127.0.0.1:3000'].filter(Boolean);

// Apply CORS headers before any body parsing so errors still include CORS headers
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser or server-to-server requests
    const normalizedOrigin = normalize(origin);
    if (whitelist.includes(normalizedOrigin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'auth-token', 'Authorization']
}));

app.use(express.json())

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'iNOTES API is running' });
});

//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// Only listen locally — Vercel handles this in serverless mode
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`iNOTES server listening on port ${port}`)
  })
}

// Export for Vercel serverless
module.exports = app;