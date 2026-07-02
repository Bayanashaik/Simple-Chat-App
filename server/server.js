const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

// Allow React frontend to connect
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Create Socket.io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Listen for client connections
io.on("connection", (socket) => {
  console.log("🟢 User Connected:", socket.id);

  // Receive message from client
  socket.on("send_message", (data) => {
    console.log("Message:", data);

    // Send message to all connected clients
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User Disconnected:", socket.id);
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("Chat Server is Running...");
});

// Start server
const PORT = 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});