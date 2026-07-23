import { useState } from "react";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    console.log(keyword);
  };

  return (
    <div className="mt-10 max-w-3xl">
      <div className="flex rounded-xl overflow-hidden shadow-lg border">
        <input
          type="text"
          placeholder="Search jobs by title, skill, or company..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 px-5 py-4 outline-none"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:blue-700 text-white px-8 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
