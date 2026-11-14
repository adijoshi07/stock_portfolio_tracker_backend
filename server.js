const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config({ path: "./.env" });

const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const portfolioRoutes = require("./routes/portfolioRoutes.js");
const stockRoutes = require("./routes/stockRoutes.js");

const app = express();

// Allowed origins (add more via CLIENT_URL on Render, comma-separated)
const allowedOrigins = [
  'http://localhost:5173',
  'https://stock-portfolio-tracker-9bw9.vercel.app',
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map((s) => s.trim().replace(/\/$/, ''))
    : []),
];

// Middleware (CORS must come before routes)
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API running");
});

// Routes
app.use("/api/users", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/stock", stockRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// Render provides the port via process.env.PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
