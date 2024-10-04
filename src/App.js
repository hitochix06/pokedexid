import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import Search from "./components/Search";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 20;

  useEffect(() => {
    fetchPokemonList(currentPage);
  }, [currentPage]);

  const fetchPokemonList = (page) => {
    const offset = (page - 1) * pokemonPerPage;
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`
    )
      .then((response) => response.json())
      .then((data) => setPokemonList(data.results));
  };

  const handleSearch = (name) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) =>
        setPokemonList([
          {
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
          },
        ])
      );
  };

  return (
    <div style={{ background: "black", minHeight: "100vh", color: "white" }}>
      <NavBar />
      <Search onSearch={handleSearch} />
      <div className="d-flex flex-wrap justify-content-center">
        {pokemonList.map((pokemon, index) => (
          <Card key={pokemon.name} pokemonUrl={pokemon.url} index={index} />
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Précédent
        </button>
        <span className="mx-3 align-self-center">Page {currentPage}</span>
        <button
          className="btn btn-primary ms-2"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default App;
