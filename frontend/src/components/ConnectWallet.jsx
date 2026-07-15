import { useState } from "react";

function ConnectWallet() {
  const [account, setAccount] = useState("");

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install Rabby Wallet or another EVM wallet.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={connectWallet}>
        {account ? "Wallet Connected" : "Connect Rabby Wallet"}
      </button>

      <p>
        <strong>Wallet:</strong>{" "}
        {account || "Not Connected"}
      </p>
    </div>
  );
}

export default ConnectWallet;
