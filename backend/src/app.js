const express = require('express')
const cors = require('cors')

const app = express()

// CORS configuration - most permissive for development
const corsOptions = {
  origin: '*', // Allow all origins
  methods: '*', // Allow all methods
  allowedHeaders: '*', // Allow all headers
  exposedHeaders: '*', // Expose all headers
  credentials: true,
  maxAge: 86400 // Cache preflight requests for 24 hours
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' })
})

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

module.exports = app 