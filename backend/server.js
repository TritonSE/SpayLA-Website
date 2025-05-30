// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const admin = require("./firebase");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to verify Firebase token
async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
}

// Sample protected route
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.email}` });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));

const User = require("./models/User");
app.post("/api/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).send(newUser);
});
