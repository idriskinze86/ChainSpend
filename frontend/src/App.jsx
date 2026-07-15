import { useState } from "react";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import { getContract } from "./lib/contract";

function App() {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  async function addExpense() {
    try {
      const contract = await getContract();

      const tx = await contract.addExpense(
        amount,
        token,
        category,
        note
      );

      alert("Transaction submitted! Please confirm in Rabby.");

      await tx.wait();

      alert("✅ Expense added successfully!");

      setAmount("");
      setToken("");
      setCategory("");
      setNote("");

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <div className="App">
      <h1>ChainSpend</h1>

      <ConnectWallet />

      <br /><br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Token (e.g. MON)"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Category (e.g. Food)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <br /><br />

      <button onClick={addExpense}>
        Add Expense
      </button>
    </div>
  );
}

export default App;
