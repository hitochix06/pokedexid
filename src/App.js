import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import PokemonList from "./components/PokemonListe";
import Navbar from "./components/NavBar";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        const data = await response.json();
        setAllPokemon(data.results);
        console.log("Tous les Pokémon chargés:", data.results);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon:", error);
      }
    };

    fetchAllPokemon();
  }, []);

  useEffect(() => {
    const filtered = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
    setCurrentPage(1);
    console.log("Pokémon filtrés:", filtered);
  }, [searchTerm, allPokemon]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log("Terme de recherche:", term);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
