import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Card from "./Card";
import animationPokeball from "../assets/animationpokeball.json";

function PokemonList({ currentPage, searchTerm, onPageChange }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const pokemonPerPage = 20;
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * pokemonPerPage;
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`;
        const response = await fetch(url);
        const data = await response.json();
        
        // Ajout d'un délai de 3 secondes
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        setPokemonList(data.results);
        setFilteredPokemonList(data.results);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemonList(filtered);
      setNoResults(filtered.length === 0);
    } else {
      setFilteredPokemonList(pokemonList);
      setNoResults(false);
    }
  }, [searchTerm, pokemonList]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Lottie
          animationData={animationPokeball}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
      </div>
    );
  }

  return (
    <div className="container p-3">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mb-4">
        {filteredPokemonList.map((pokemon, index) => (
          <div className="col" key={pokemon.name}>
            <Card pokemonUrl={pokemon.url} index={index} />
          </div>
        ))}
        {noResults && (
          <div className="col-12 text-center">
            <p>Aucun résultat trouvé.</p>
          </div>
        )}
      </div>
      <nav aria-label="Navigation des pages de Pokémon">
        <ul className="pagination justify-content-center ">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
          </li>
          <li className="page-item active">
            <span className="page-link">Page {currentPage}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PokemonList;
