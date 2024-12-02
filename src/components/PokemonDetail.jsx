import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import pokemonColors from "../data/pokemonColors.json";
import pokemonTypeIcons from "../assets/pokemonTypelcons";
import Lottie from "lottie-react";
import { fetchPokemonDetails } from "../api/Api";
import animationPokeball from "../assets/Animationpokeball.json";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  // Importer dynamiquement l'image du Pokémon
  const getPokemonImage = (id) => {
    try {
      return require(`../assets/pokemon/${id}.png`);
    } catch (error) {
      console.error(
        `Erreur lors de l'importation de l'image du Pokémon ${id}`,
        error
      );
      return null;
    }
  };

  useEffect(() => {
    const loadPokemonDetails = async () => {
      try {
        const pokemonData = await fetchPokemonDetails(id);
        setPokemon(pokemonData);
      } catch (err) {
        setError(err.message);
      }
    };

    loadPokemonDetails();
  }, [id]);

  if (error) return <div>Erreur : {error}</div>;
  if (!pokemon) {
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
    <div className="container mt-5">
      <Link to="/" className="btn btn-primary mb-3">
        Retour à la liste
      </Link>
      <div
        className="card"
        style={{
          backgroundColor: pokemonColors[pokemon.types[0]] || "#FFFFFF",
        }}
      >
        <div className="card-body">
          <h2 className="card-title text-center text-white">
            {pokemon.name.toUpperCase()}
          </h2>
          <div className="row">
            <div className="col-md-6 text-center">
              <img
                src={getPokemonImage(pokemon.id)}
                alt={pokemon.name}
                className="img-fluid"
                style={{
                  maxWidth: "250px", // Limite la largeur maximale
                  maxHeight: "250px", // Limite la hauteur maximale
                  objectFit: "contain", // Garde les proportions de l'image
                }}
              />
            </div>
            <div className="col-md-6">
              <p>
                <strong>Numéro :</strong> #
                {pokemon.id.toString().padStart(3, "0")}
              </p>
              <p>
                <strong>Taille :</strong> {pokemon.height} m
              </p>
              <p>
                <strong>Poids :</strong> {pokemon.weight} kg
              </p>
              <p>
                <strong>Types :</strong>
              </p>
              <div>
                {pokemon.types.map((type, index) => (
                  <img
                    key={index}
                    src={pokemonTypeIcons[type]}
                    alt={type}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "5px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Section des stats */}
          <div className="row mt-4">
            <div className="col-12">
              <h4 className="text-white text-center mb-4">Statistiques</h4>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  {pokemon.stats.slice(0, 3).map((stat, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span className="text-white">{stat.name}</span>
                        <span className="text-white">{stat.base_stat}</span>
                      </div>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${(stat.base_stat / 255) * 100}%`,
                            backgroundColor: pokemonColors[pokemon.types[0]] || "#FFFFFF",
                            opacity: "0.8"
                          }}
                          aria-valuenow={stat.base_stat}
                          aria-valuemin="0"
                          aria-valuemax="255"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-md-6">
                  {pokemon.stats.slice(3).map((stat, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span className="text-white">{stat.name}</span>
                        <span className="text-white">{stat.base_stat}</span>
                      </div>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${(stat.base_stat / 255) * 100}%`,
                            backgroundColor: pokemonColors[pokemon.types[0]] || "#FFFFFF",
                            opacity: "0.8"
                          }}
                          aria-valuenow={stat.base_stat}
                          aria-valuemin="0"
                          aria-valuemax="255"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
