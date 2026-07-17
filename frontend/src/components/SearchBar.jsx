function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      className="search-box"
      type="text"
      placeholder="🔍 Search by token, category or note..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
