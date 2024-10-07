import React from "react";
import Search from "./components/Search";
import PokemonList from "./components/PokemonListe";
import Navbar from "./components/NavBar";
import { usePokemonData } from "./hooks/userPokemonData";

function App() {
  const { currentPage, filteredPokemon, handleSearch, handlePageChange } =
    usePokemonData();

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Search onSearch={handleSearch} />
      <PokemonList
        pokemonList={filteredPokemon}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
