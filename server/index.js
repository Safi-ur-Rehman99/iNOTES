require('dotenv').config();
const connectToMongo=require('./db')
const express = require('express')
var cors = require('cors')

const app = express()
const port = process.env.PORT || 5000;
connectToMongo();
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://i-notes-client-flax.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
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