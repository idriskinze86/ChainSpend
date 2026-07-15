import { useState } from "react";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import { getContract } from "./lib/contract";

function App() {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const [expenseCount, setExpenseCount] = useState(0);
  const [expenses, setExpenses] = useState([]);

  async function addExpense() {
    try {
      const contract = await getContract();

      const tx = await contract.addExpense(amount, token, category, note);

      alert("Transaction submitted! Please confirm in Rabby.");

      await tx.wait();

      alert("✅ Expense added successfully!");

      setAmount("");
      setToken("");
      setCategory("");
      setNote("");

      await loadExpenses();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function loadExpenses() {
    try {
      const contract = await getContract();

      const count = await contract.getExpenseCount();
      const total = Number(count);

      setExpenseCount(total);

      let list = [];

      for (let i = 0; i < total; i++) {
        const expense = await contract.getExpense(i);
        list.push(expense);
      }

      setExpenses(list);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <div className="App">
      <h1>ChainSpend</h1>

      <ConnectWallet />

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Token (e.g. MON)"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Category (e.g. Food)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addExpense}>Add Expense</button>

      <br />
      <br />

      <button onClick={loadExpenses}>Load Expenses</button>

      <h2>Total Expenses: {expenseCount}</h2>

      {expenses.map((expense, index) => (
        <div key={index}>
          <p>Amount: {expense[0].toString()}</p>
          <p>Token: {expense[1]}</p>
          <p>Category: {expense[2]}</p>
          <p>Note: {expense[3]}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
