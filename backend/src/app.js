const express = require("express");
const cors = require("cors");

const app = express();

// CORS configuration - most permissive for development
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all common HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  exposedHeaders: ["Content-Length", "X-Requested-With"], // Expose specific headers to the client
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  maxAge: 86400, // Cache preflight requests for 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
