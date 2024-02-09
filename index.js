const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
require("dotenv").config();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const Port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Data is working");
});
io.on("connection", (socket) => {
  socket.on("chat-message", (msg) => {
    io.emit("receive-message", msg);
  });
});

server.listen(Port, () => {
  console.log(`Server is running ${Port}`);
});
