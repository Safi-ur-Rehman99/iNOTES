require('dotenv').config();
const connectToMongo=require('./db')
const express = require('express')
var cors = require('cors')

const app = express()
const port = process.env.PORT || 5000;
connectToMongo();
app.use(express.json())

// Strip trailing slash from CLIENT_URL to prevent CORS mismatch
const clientOrigin = (process.env.CLIENT_URL || 'https://i-notes-client-flax.vercel.app').replace(/\/+$/, '');
app.use(cors({
  origin: clientOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

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