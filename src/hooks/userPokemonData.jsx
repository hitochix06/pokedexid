import { useState, useEffect } from "react";
import { fetchAllPokemon } from "../services/pokemonService";

export function usePokemonData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await fetchAllPokemon();
        setAllPokemon(data);
        console.log("Tous les Pokémon chargés:", data);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon:", error);
      }
    };

    loadPokemon();
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

  return {
    currentPage,
    filteredPokemon,
    handleSearch,
    handlePageChange,
  };
}
