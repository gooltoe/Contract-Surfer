import express from "express";
import loaders from "./loaders";
import globalEmitter from "./loaders/eventEmitter";
const { processBlock } = require("./monitor");

const port = 3000;

async function startServer() {
  const app = express();
  await loaders({ app });
  // processBlock();

  app.use(express.json());

  app.get("/alive", (req, res, next) => {
    res.send("OK");
    globalEmitter.emit("log_message", {
      time: Date.now(),
      message: "A message",
    });
    next();
  });

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${res.statusCode}`);
    next();
  });

  app.listen(port, () => {
    console.log("Started");
  });
}

startServer();
