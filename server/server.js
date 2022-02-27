const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const { initSocket } = require("./socket"); // <-- add this

const app = express();
const server = http.ceateSrerver(app);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize Socket.IO on this server
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
