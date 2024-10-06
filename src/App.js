import React, { useState } from "react";
import NavBar from "./components/NavBar";

import PokemonList from "./components/PokemonListe";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      <PokemonList currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
