import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Card from "./Card";
import animationPokeball from "../assets/animationpokeball.json";

function PokemonList({ currentPage, searchTerm }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const pokemonPerPage = 20;

  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      try {
        let url;
        if (searchTerm) {
          url = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
        } else {
          const offset = (currentPage - 1) * pokemonPerPage;
          url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (searchTerm) {
          setPokemonList([
            {
              name: data.name,
              url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
            },
          ]);
        } else {
          setPokemonList(data.results);
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [currentPage, searchTerm]);

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
    <div className="pokemon-grid">
      {pokemonList.map((pokemon, index) => (
        <Card key={pokemon.name} pokemonUrl={pokemon.url} index={index} />
      ))}
    </div>
  );
}

export default PokemonList;
