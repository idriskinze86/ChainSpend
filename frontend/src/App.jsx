import { useState, useEffect } from "react";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import { getContract } from "./lib/contract";
import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import ExpenseHistory from "./components/ExpenseHistory";
import ExpenseForm from "./components/ExpenseForm";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const [account, setAccount] = useState("");
  const [expenseCount, setExpenseCount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasLoadedExpenses, setHasLoadedExpenses] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  async function checkMonadNetwork() {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (chainId !== "0x279f") {
      toast.error("⚠️ Please switch to Monad Testnet.");
      return false;
    }

    return true;
  }

  async function addExpense() {
    if (!(await checkMonadNetwork())) return;
    try {
      const contract = await getContract();

      const tx = await contract.addExpense(amount, token, category, note);

      toast("📝 Transaction submitted! Please confirm in Rabby.");

      await tx.wait();

      toast.success("✅ Expense added successfully!");

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
    if (!(await checkMonadNetwork())) return;
    try {
      const contract = await getContract();

      const count = await contract.getExpenseCount();
      const total = Number(count);

      setExpenseCount(total);
      let list = [];
      let totalAmount = 0;

      for (let i = 0; i < total; i++) {
        const expense = await contract.getExpense(i);
        list.push(expense);

        totalAmount += Number(expense[0]);
      }

      setExpenses(list);
      setTotalSpent(totalAmount);
      setHasLoadedExpenses(true);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }
  const filteredExpenses = expenses.filter((expense) => {
    const search = searchTerm.toLowerCase();

    return (
      expense[1].toLowerCase().includes(search) ||
      expense[2].toLowerCase().includes(search) ||
      expense[3].toLowerCase().includes(search)
    );
  });
  useEffect(() => {
    async function checkConnection() {
      if (!window.ethereum) return;

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }

    checkConnection();

    function handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        setAccount("");
        setExpenses([]);
        setExpenseCount(0);
        setTotalSpent(0);
        setHasLoadedExpenses(false);
      } else {
        setAccount(accounts[0]);
        setExpenses([]);
        setExpenseCount(0);
        setTotalSpent(0);
        setHasLoadedExpenses(false);
      }
    }

    window.ethereum?.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);
  function disconnectWallet() {
    setAccount("");
    setExpenses([]);
    setExpenseCount(0);
    setTotalSpent(0);
    setHasLoadedExpenses(false);
    setSearchTerm("");
    setShowWalletMenu(false);
  }
  function exportCSV() {
    if (filteredExpenses.length === 0) {
      toast.error("No expenses to export.");
      return;
    }

    const rows = [["Amount", "Token", "Category", "Note", "Date"]];

    filteredExpenses.forEach((expense) => {
      rows.push([
        expense[0].toString(),
        expense[1],
        expense[2],
        expense[3],
        new Date(Number(expense[4]) * 1000).toLocaleString(),
      ]);
    });

    const csvContent = rows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    const today = new Date().toISOString().split("T")[0];

    link.download = `chainspend-expenses-${today}.csv`;

    toast.success("📤 CSV exported successfully!");

    setTimeout(() => {
      link.click();
      URL.revokeObjectURL(url);
    }, 200);
  }
  let toastTimer;

  return (
    <div className="App">
      <Toaster psition="top-right" />
      <div className="hero">
        <h1>💸 ChainSpend</h1>

        <p>
          Track your crypto expenses securely on
          <strong> Monad Testnet</strong>.
        </p>
        <ConnectWallet
          account={account}
          setAccount={setAccount}
          showWalletMenu={showWalletMenu}
          setShowWalletMenu={setShowWalletMenu}
          disconnectWallet={disconnectWallet}
          copied={copied}
          setCopied={setCopied}
        />
      </div>
      <ExpenseForm
        amount={amount}
        setAmount={setAmount}
        token={token}
        setToken={setToken}
        category={category}
        setCategory={setCategory}
        note={note}
        setNote={setNote}
        addExpense={addExpense}
        loadExpenses={loadExpenses}
        exportCSV={exportCSV}
      />
      <Dashboard expenseCount={expenseCount} totalSpent={totalSpent} />
      <hr />

      <h2>📋 Expense History</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ExpenseHistory
        filteredExpenses={filteredExpenses}
        hasLoadedExpenses={hasLoadedExpenses}
      />
    </div>
  );
}

export default App;
