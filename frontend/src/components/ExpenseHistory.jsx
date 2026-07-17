function ExpenseHistory({ filteredExpenses, hasLoadedExpenses }) {
  return (
    <div className="expense-history">
      {hasLoadedExpenses && filteredExpenses.length === 0 ? (
        <p className="no-results">🔍 No matching expenses found.</p>
      ) : (
        filteredExpenses.map((expense, index) => (
          <div className="expense-card" key={index}>
            <h3>💰 Expense #{index + 1}</h3>

            <p>
              <strong>Amount:</strong> {expense[0].toString()} {expense[1]}
            </p>

            <p>
              <strong>📂 Category:</strong> {expense[2]}
            </p>

            <p>
              <strong>📝 Note:</strong> {expense[3]}
            </p>

            <p>
              <strong>🕒 Date:</strong>{" "}
              {new Date(Number(expense[4]) * 1000).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseHistory;
