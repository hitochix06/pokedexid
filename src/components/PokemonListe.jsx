import React, { useState, useEffect } from "react";
import Card from "./Card";
import Lottie from "lottie-react";
import animationPokeball from "../assets/animationpokeball.json";

function PokemonList({ pokemonList, currentPage, onPageChange }) {
  const [loading, setLoading] = useState(true);
  const pokemonPerPage = 20;
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemonList.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  useEffect(() => {
    setLoading(true);
    // Simuler un délai de chargement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pokemonList, currentPage]);

  console.log("PokemonList reçu:", pokemonList);
  console.log("Pokémon actuels:", currentPokemon);

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
        {currentPokemon.map((pokemon, index) => (
          <div className="col" key={pokemon.name}>
            <Card
              pokemonUrl={pokemon.url}
              index={indexOfFirstPokemon + index + 1}
            />
          </div>
        ))}
        {currentPokemon.length === 0 && (
          <div className="col-12 text-center">
            <p>Aucun résultat trouvé.</p>
          </div>
        )}
      </div>
      {pokemonList.length > pokemonPerPage && (
        <nav aria-label="Navigation des pages de Pokémon">
          <ul className="pagination justify-content-center">
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
                disabled={indexOfLastPokemon >= pokemonList.length}
              >
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default PokemonList;
