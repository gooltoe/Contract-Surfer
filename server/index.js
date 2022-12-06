import loaders from "./loaders";

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { processBlock, testing } = require("./monitor");

const port = 3000;

async function startServer() {
  const app = express();
  await loaders({ app });
  const httpServer = createServer(app);
  const io = new Server(httpServer, { path: "/" });

  io.on("connection", (socket) => {
    // currently drilling socket all the way down (change this later)
    socket.emit("Connect", "Connected");
    processBlock(socket);
  });

  app.use(express.json());

  app.get("/alive", (req, res, next) => {
    res.send("OK");
    next();
  });

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${res.statusCode}`);
    next();
  });

  httpServer.listen(port, () => {
    console.log("Started");
  });
}

startServer();
