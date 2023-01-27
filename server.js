const express = require("express");
const socket = require("socket.io");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");

// Environment Variables
dotenv.config({
  path: "./config/env/config.env",
});

//MongoDB Connection
connectDatabase();

const app = express();

const PORT = parseInt(process.env.PORT);

const server = app.listen(PORT, () => {
  console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`);
});

app.use(express.static("public"));

const io = socket(server);

io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
