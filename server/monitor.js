// Written by gooltoe for the world
import globalEmitter from "./loaders/eventEmitter";

const { ethers } = require("ethers");
const ERC721 = require("@openzeppelin/contracts/build/contracts/ERC721.json");

const RPC_ENDPOINT =
  "https://nd-223-235-549.p2pify.com/d334e467db68c2dc91d416d74f1a36c1";
const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);

const processContract = async (transaction, socket) => {
  try {
    console.log(`new contract found ${transaction.creates}`);

    let contract = await new ethers.Contract(
      transaction.creates,
      ERC721.abi,
      provider
    );
    let tokenName = await contract.name();
    let tokenSymbol = await contract.symbol();

    tokenName = tokenName ? tokenName : "UNKNOWN";
    tokenSymbol = tokenSymbol ? tokenSymbol : "UNKNOWN";

    let contractJSON = {
      "Transaction Hash": transaction.hash,
      Block: transaction.blockNumber,
      "Contract Address": transaction.creates,
      "Contract Creator": transaction.from,
      "Contract Name": tokenName,
      "Contract Symbol": tokenSymbol,
      Time: Date.now(),
    };

    globalEmitter.emit("send_info", {
      socket: socket,
      contractJSON: contractJSON,
    });
  } catch (e) {
    console.log(e);
  }
};

const processTransaction = (transactions, socket) => {
  // Go through each transaction and filter out what you need!
  transactions.forEach((transaction) => {
    if (transaction && transaction.creates) {
      processContract(transaction, socket);
    }
  });
};

const processBlock = async (socket) => {
  // Fire once per new block!
  provider.on("block", async (blockNumber) => {
    console.log(`new block: ${blockNumber}`);

    const blockInfo = await provider.getBlockWithTransactions(blockNumber);
    const transactions = blockInfo.transactions;
    processTransaction(transactions, socket);
  });
};

const testing = async (io) => {
  io.sockets.emit("send_info");
  // globalEmitter.emit("send_info", {
  //   time: Date.now(),
  //   contractJSON: "A message",
  // });
};

exports.processBlock = processBlock;
exports.testing = testing;
