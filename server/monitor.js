// Written by gooltoe for the world
import globalEmitter from "./eventEmitter";

const { ethers } = require("ethers");
const ERC721 = require("@openzeppelin/contracts/build/contracts/ERC721.json");

const RPC_ENDPOINT = process.env.RPC;
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
      Time: Date.now(),
    };

    globalEmitter.emit("send_info", { contractJSON: contractJSON });
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
    console.log(`new block: ${blockNumber}`);

    const blockInfo = await provider.getBlockWithTransactions(blockNumber);
    const transactions = blockInfo.transactions;
    processTransaction(transactions);
  });
};

exports.processBlock = processBlock;
