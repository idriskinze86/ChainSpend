import "dotenv/config";
import fs from "fs";
import { ethers } from "ethers";

const artifact = JSON.parse(
  fs.readFileSync("build/ExpenseTracker.json", "utf8")
);

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

console.log("Deploying from:", wallet.address);

const factory = new ethers.ContractFactory(
  artifact.abi,
  artifact.evm.bytecode.object,
  wallet
);

const contract = await factory.deploy();

console.log("Waiting for deployment...");

await contract.waitForDeployment();

console.log("✅ Contract deployed!");
console.log("Address:", await contract.getAddress());
