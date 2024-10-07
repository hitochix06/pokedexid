import React, { useState } from "react";
import Search from "./components/Search";
import PokemonList from "./components/PokemonListe";
import NavBar from "./components/NavBar";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      <Search onSearch={handleSearch} />
      <PokemonList
        currentPage={currentPage}
        searchTerm={searchTerm}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
