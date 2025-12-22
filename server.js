require("dotenv").config();   // ✅ SABSE UPAR

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const Message = require("./models/Message");

const app = express();
app.use(express.json());
app.use(cors());  

// ✅ DEBUG (temporary)
console.log("DB_URL =", process.env.DB_URL);

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB error:", err));

app.post("/api/test", async (req, res) => {
  try {
    const { name } = req.body;

    const newMessage = new Message({ name });
    await newMessage.save();

    res.json({ message: "Data saved to database successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
