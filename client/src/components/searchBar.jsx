import React, { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. Microprocessors or Data Structures"
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "AI is thinking..." : "Generate"}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

