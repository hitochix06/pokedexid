import { useState, useEffect } from "react";
import { fetchAllPokemon } from "../services/pokemonService";

// Cette fonction personnalisée utilise des hooks pour gérer les données des Pokémon
export function usePokemonData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  // Effet pour charger tous les Pokémon au montage du composant
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        // Récupération des données de tous les Pokémon
        const data = await fetchAllPokemon();
        setAllPokemon(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon:", error);
      }
    };

    loadPokemon();
  }, []);

  // Effet pour filtrer les Pokémon en fonction du terme de recherche
  useEffect(() => {
    const filtered = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
    setCurrentPage(1);
  }, [searchTerm, allPokemon]);

  // Fonction pour gérer la recherche
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Fonction pour gérer le changement de page
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Retourne les états et fonctions nécessaires pour l'utilisation des données des Pokémon
  return {
    currentPage,
    filteredPokemon,
    handleSearch,
    handlePageChange,
  };
}
