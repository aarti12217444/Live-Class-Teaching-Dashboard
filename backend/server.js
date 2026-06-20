require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const { Server } = require("socket.io");

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const fileRoutes = require("./routes/fileRoutes");
const authRoutes = require(
  "./routes/authRoutes"
);

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static Uploads Folder
app.use(
  "/uploads",
  express.static("uploads")
);

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Virtual Classroom API Running");
});

const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(
    "User Connected:",
    socket.id
  );

  // Chat Messages
  socket.on(
    "sendMessage",
    (message) => {
      io.emit(
        "receiveMessage",
        message
      );
    }
  );

  // Notifications
  socket.on(
    "newNotification",
    (notification) => {

      console.log(
      "Notification Received:",
      notification
    );

      io.emit(
        "receiveNotification",
        notification
      );
    }
  );

  socket.on(
    "signal",
    (data) => {

      socket.broadcast.emit(
        "signal",
        data
      );

    }
  );

  socket.on("disconnect", () => {
    console.log(
      "User Disconnected:",
      socket.id
    );
  });
});

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});