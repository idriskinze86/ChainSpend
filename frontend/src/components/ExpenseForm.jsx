function ExpenseForm({
  amount,
  setAmount,
  token,
  setToken,
  category,
  setCategory,
  note,
  setNote,
  addExpense,
  loadExpenses,
  exportCSV,
}) {
  return (
    <div className="form-card">
      <h2>Add Expense</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text"
        placeholder="Token (e.g. MON)"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category (e.g. Food)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="button-group">
        <button onClick={addExpense}>Add Expense</button>
        <button onClick={loadExpenses}>Load Expenses</button>
        <button onClick={exportCSV}>📤 Export CSV</button>
      </div>
    </div>
  );
}

export default ExpenseForm;
