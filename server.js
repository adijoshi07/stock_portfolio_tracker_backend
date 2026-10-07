const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const portfolioRoutes = require("./routes/portfolioRoutes.js");
const stockRoutes = require("./routes/stockRoutes.js");
dotenv.config();

const app = express();


// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); 
app.use(express.json());


// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.log(error);
});

process.env.STOCK_API_KEY


// Routes
app.use("/api/users", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/stock", stockRoutes);

// Test Route
app.get("/", (req,res) =>{
    res.send("API running");
});


const PORT = 5000;

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});