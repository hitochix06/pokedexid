import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import PokemonList from "./components/PokemonListe";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      <Search onSearch={handleSearch} />
      <PokemonList currentPage={currentPage} searchTerm={searchTerm} />
      <Pagination
        currentPage={currentPage}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}

export default App;