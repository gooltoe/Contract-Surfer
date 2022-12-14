const express = require("express");
const { emitter } = require("./eventEmitter");
const { processBlock } = require("./monitor");
const { createServer } = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 3000;

// processBlock();

// const io = new Server(port, { path: "/" });

// io.on("connection", (socket) => {
//   socket.emit("Connect", "Connected");
//   emitter.on("send_info", ({ contractJSON }) => {
//     socket.emit("Connect", contractJSON);
//   });
// });

// io.listen(port);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, { path: "/" });

  // emits send_info event when new contract is found
  processBlock();

  io.on("connection", (socket) => {
    socket.emit("Connect", "Connected");
    emitter.on("send_info", ({ contractJSON }) => {
      socket.emit("new_contract", contractJSON);
    });
  });

  app.use(express.json());

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${res.statusCode}`);
    next();
  });

  httpServer.listen(port, () => {
    console.log("Started");
  });
}

startServer();
