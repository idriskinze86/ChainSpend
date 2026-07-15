import "dotenv/config";
import { ethers } from "ethers";
import fs from "fs";

const artifact = JSON.parse(
  fs.readFileSync("build/ExpenseTracker.json", "utf8")
);

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const contract = new ethers.Contract(
  "0x24A3d7F42D76020d6C6dd1c87dcaCDA55E4b6b2a",
  artifact.abi,
  provider
);

try {
  const count = await contract.getExpenseCount();
  console.log("Expense Count:", count.toString());
} catch (err) {
  console.error(err);
}
