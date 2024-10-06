import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Card from "./Card";
import animationPokeball from "../assets/animationpokeball.json";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await response.json();
        setPokemonList(data.results);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

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

  console.log("Affichage de la liste des Pokémon");
  return (
    <div className="pokemon-grid">
      {pokemonList.map((pokemon, index) => (
        <Card key={pokemon.name} pokemonUrl={pokemon.url} index={index} />
      ))}
    </div>
  );
}

export default PokemonList;
