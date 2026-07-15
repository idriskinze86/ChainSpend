import { BrowserProvider, Contract } from "ethers";
import abi from "./abi.json";

const CONTRACT_ADDRESS = "0x24A3d7F42D76020d6C6dd1c87dcaCDA55E4b6b2a";

export async function getContract() {
  if (!window.ethereum) {
    throw new Error("Wallet not found");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new Contract(CONTRACT_ADDRESS, abi, signer);
}
