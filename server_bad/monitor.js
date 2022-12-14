// Written by gooltoe for the world
const { ethers } = require("ethers");
const ERC721 = require("@openzeppelin/contracts/build/contracts/ERC721.json");
import globalEmitter from "./loaders/eventEmitter";

const RPC_ENDPOINT =
  "https://nd-223-235-549.p2pify.com/d334e467db68c2dc91d416d74f1a36c1";
const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);

const processContract = async (transaction) => {
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
    };

    globalEmitter.emit("send_info", {
      time: Date.now(),
      contractJSON: contractJSON,
    });
  } catch (e) {
    console.log(e);
  }
};

const processTransaction = (transactions) => {
  // Go through each transaction and filter out what you need!
  transactions.forEach((transaction) => {
    if (transaction && transaction.creates) {
      processContract(transaction);
    }
  });
};

const processBlock = async () => {
  // Fire once per new block!
  provider.on("block", async (blockNumber) => {
    const blockInfo = await provider.getBlockWithTransactions(blockNumber);
    const transactions = blockInfo.transactions;
    processTransaction(transactions);
  });
};

exports.processBlock = processBlock;
