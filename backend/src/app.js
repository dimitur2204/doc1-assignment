const express = require('express')
const cors = require('cors')

const app = express()

// CORS configuration - most permissive for development
const corsOptions = {
  origin: true, // Allow all origins but handle credentials properly
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
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