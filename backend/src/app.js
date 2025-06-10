const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
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
