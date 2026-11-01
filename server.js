
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Hotel Management Backend is running!",
  });
});

// Example API route
app.get("/api/hotels", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Grand Palace Hotel",
      location: "Indore",
      price: 2500,
    },
    {
      id: 2,
      name: "Royal Stay",
      location: "Bhopal",
      price: 1800,
    },
  ]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
