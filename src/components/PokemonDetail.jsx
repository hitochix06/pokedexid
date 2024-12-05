import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import pokemonColors from "../data/pokemonColors.json";
import pokemonTypeIcons from "../assets/pokemonTypelcons";
import Lottie from "lottie-react";
import fetchPokemon from "../api/Api";
import animationPokeball from "../assets/Animationpokeball.json";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [moves, setMoves] = useState([]);

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

  const fetchMoveDetails = async (moveUrl) => {
    try {
      const response = await fetch(moveUrl);
      const data = await response.json();
      return {
        name: data.name,
        type: data.type.name,
        power: data.power || "N/A",
        accuracy: data.accuracy || "N/A",
        description:
          data.effect_entries.find((entry) => entry.language.name === "en")
            ?.effect || "Aucune description disponible",
      };
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du mouvement:",
        error
      );
      return null;
    }
  };

  useEffect(() => {
    const loadPokemonDetails = async () => {
      try {
        const pokemonData = await fetchPokemon(id);
        setPokemon(pokemonData);
        const minimumLoadingTime = 5000; // 5 secondes
        await new Promise((resolve) => setTimeout(resolve, minimumLoadingTime));
        setIsLoaded(true);
      } catch (err) {
        setError(err.message);
      }
    };

    setIsLoaded(false); // Réinitialiser l'état de chargement
    loadPokemonDetails();
  }, [id]);

  useEffect(() => {
    if (isLoaded) {
      const progressBars = document.querySelectorAll(".progress-bar");
      progressBars.forEach((bar) => {
        const progress = bar.getAttribute("data-progress");
        requestAnimationFrame(() => {
          bar.style.width = `${progress}%`;
        });
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    const loadMoveDetails = async () => {
      if (pokemon && pokemon.moves) {
        const moveDetailsPromises = pokemon.moves.map((move) =>
          fetchMoveDetails(move.url)
        );
        const moveDetails = await Promise.all(moveDetailsPromises);
        setMoves(moveDetails.filter((move) => move !== null));
      }
    };

    loadMoveDetails();
  }, [pokemon]);

  if (error) return <div className="alert alert-danger">Erreur : {error}</div>;
  if (!pokemon) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Lottie
          animationData={animationPokeball}
          loop={true}
          className="w-25"
        />
      </div>
    );
  }

  const primaryColor = pokemonColors[pokemon.types[0]] || "#FFFFFF";
  const secondaryColor = pokemonColors[pokemon.types[1]] || primaryColor;
  const gradientBackground = `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`;

  const abilities = pokemon?.abilities || [];

  return (
    <div className="container-fluid pokemon-detail">
      <div className="row">
        <div className="col-12 py-4">
          <Link
            to="/"
            className="btn mb-3"
            style={{
              color: "#fff",
              backgroundColor: primaryColor,
              borderColor: primaryColor,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${primaryColor}dd`;
              e.currentTarget.style.borderColor = `${primaryColor}dd`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
              e.currentTarget.style.borderColor = primaryColor;
            }}
          >
            ← Retour
          </Link>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-9">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div
                className="card pokemon-card border-0 shadow-lg h-100"
                style={{
                  background: gradientBackground,
                  borderRadius: "20px",
                  overflow: "hidden",
                  padding: "15px",
                }}
              >
                <div className="card-header text-center text-white py-4">
                  <h1 className="display-5 text-uppercase">{pokemon.name}</h1>
                  <div className="pokemon-number text-white-50">
                    #{pokemon.id.toString().padStart(3, "0")}
                  </div>
                </div>

                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-6 text-center">
                      <img
                        src={getPokemonImage(pokemon.id)}
                        alt={pokemon.name}
                        className="img-fluid pokemon-image"
                        style={{
                          maxWidth: "200px",
                          filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.3))",
                          transform: "scale(1.2)",
                        }}
                      />
                    </div>

                    <div className="col-md-6">
                      <div className="row text-white">
                        <div className="col-6 mb-3">
                          <h5>Taille</h5>
                          <p className="lead">{pokemon.height} m</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h5>Poids</h5>
                          <p className="lead">{pokemon.weight} kg</p>
                        </div>
                      </div>

                      <div className="types-container mt-4">
                        <h5 className="text-white mb-3">Types</h5>
                        <div className="d-flex justify-content-start">
                          {pokemon.types.map((type, index) => (
                            <div
                              key={index}
                              className="type-badge me-3 p-2 rounded text-white d-flex align-items-center"
                              style={{
                                backgroundColor: pokemonColors[type] + "80",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                              }}
                            >
                              <img
                                src={pokemonTypeIcons[type]}
                                alt={type}
                                style={{ width: "30px", marginRight: "10px" }}
                              />
                              {type}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="stats-section mt-5">
                    <h4 className="text-center text-white text-uppercase mb-4">
                      Statistiques
                    </h4>
                    <div className="row">
                      <div className="col-md-6">
                        {pokemon.stats.slice(0, 3).map((stat, index) => (
                          <div key={index} className="stat-item mb-3">
                            <div className="d-flex justify-content-between text-white mb-2">
                              <span className="text-uppercase">
                                {stat.name}
                              </span>
                              <span>{stat.base_stat}</span>
                            </div>
                            <div
                              className="progress"
                              style={{
                                height: "10px",
                                backgroundColor: "rgba(255,255,255,0.2)",
                              }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: "0%",
                                  backgroundColor: "white",
                                  opacity: 0.8,
                                  transition: "width 1.5s ease-out",
                                }}
                                data-progress={`${
                                  (stat.base_stat / 255) * 100
                                }`}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="col-md-6">
                        {pokemon.stats.slice(3).map((stat, index) => (
                          <div key={index} className="stat-item mb-3">
                            <div className="d-flex justify-content-between text-white mb-2">
                              <span className="text-uppercase">
                                {stat.name}
                              </span>
                              <span>{stat.base_stat}</span>
                            </div>
                            <div
                              className="progress"
                              style={{
                                height: "10px",
                                backgroundColor: "rgba(255,255,255,0.2)",
                              }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: "0%",
                                  backgroundColor: "white",
                                  opacity: 0.8,
                                  transition: "width 1.5s ease-out",
                                }}
                                data-progress={`${
                                  (stat.base_stat / 255) * 100
                                }`}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="abilities-section mt-5 px-4 pb-4">
                    <h4 className="text-center text-white text-uppercase mb-4">
                      Capacités
                    </h4>
                    <div className="row">
                      {abilities.length > 0 ? (
                        abilities.map((ability, index) => (
                          <div key={index} className="col-md-4 mb-3">
                            <div
                              className="ability-card p-3 rounded text-white text-center"
                              style={{
                                backgroundColor: "rgba(255,255,255,0.2)",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                              }}
                            >
                              <h5
                                className="text-uppercase mb-2 "
                                style={{ fontSize: "14px" }}
                              >
                                {ability.name
                                  ? ability.name.replace("-", " ")
                                  : "Capacité inconnue"}
                              </h5>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center text-white">
                          Aucune capacité trouvée
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div
                className="card moves-section border-0 shadow-lg h-100"
                style={{
                  background: gradientBackground,
                  borderRadius: "20px",
                  overflow: "hidden",
                  padding: "15px",
                }}
              >
                <div className="card-header text-center text-white py-4">
                  <h4 className="text-uppercase">Mouvements</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    {moves.map((move, index) => (
                      <div key={index} className="col-md-6 mb-3">
                        <div
                          className="move-card p-3 rounded text-white text-center h-100"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.2)",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                          }}
                        >
                          <h5 className="text-uppercase mb-2">
                            {move.name.replace("-", " ")}
                          </h5>
                          <div className="move-details">
                            <p className="mb-1">
                              <strong>Type:</strong> {move.type}
                            </p>
                            <p className="mb-1">
                              <strong>Puissance:</strong> {move.power}
                            </p>
                            <p className="mb-1">
                              <strong>Précision:</strong> {move.accuracy}
                            </p>
                          </div>
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
    </div>
  );
}

export default PokemonDetail;
