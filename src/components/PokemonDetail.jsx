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
  const [isLoaded, setIsLoaded] = useState(false);

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
        setTimeout(() => setIsLoaded(true), 500); // Délai pour l'animation
      } catch (err) {
        setError(err.message);
      }
    };

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
  const gradientBackground = `linear-gradient(135deg, ${primaryColor}, ${primaryColor}80)`;

  return (
    <div className="container py-5">
      <Link
        to="/"
        className="btn btn-outline-secondary mb-4 shadow-sm animate__animated animate__fadeIn"
      >
        ← Retour à la liste
      </Link>

      <div
        className={`card border-0 shadow-lg overflow-hidden animate__animated ${
          isLoaded ? "animate__fadeIn" : ""
        }`}
        style={{
          background: gradientBackground,
          transition: "all 0.5s ease",
          animationDelay: "0.2s",
        }}
      >
        <div className="card-body position-relative text-white">
          {/* Numéro du Pokémon */}
          <div
            className="position-absolute top-0 end-0 text-white-50 fs-1 fw-bold"
            style={{
              opacity: 0.2,
              transform: "translate(20%, -20%)",
              zIndex: 1,
            }}
          >
            #{pokemon.id.toString().padStart(3, "0")}
          </div>

          {/* Titre et Image */}
          <div className="row align-items-center">
            <div className="col-md-6 text-center">
              <h2
                className="card-title text-uppercase mb-4 animate__animated animate__fadeInLeft"
                style={{ letterSpacing: "2px" }}
              >
                {pokemon.name}
              </h2>
              <img
                src={getPokemonImage(pokemon.id)}
                alt={pokemon.name}
                className="img-fluid animate__animated animate__bounceIn"
                style={{
                  maxWidth: "300px",
                  filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))",
                }}
              />
            </div>

            {/* Informations et Types */}
            <div className="col-md-6 animate__animated animate__fadeInRight">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <strong>Taille</strong>
                  <p className="text-white-75">{pokemon.height} m</p>
                </div>
                <div>
                  <strong>Poids</strong>
                  <p className="text-white-75">{pokemon.weight} kg</p>
                </div>
              </div>

              <div className="mb-4">
                <strong className="d-block mb-2">Types</strong>
                <div className="d-flex">
                  {pokemon.types.map((type, index) => (
                    <img
                      key={index}
                      src={pokemonTypeIcons[type]}
                      alt={type}
                      className="me-2 animate__animated animate__pulse"
                      style={{
                        width: "40px",
                        height: "40px",
                        animation: "pulse 2s infinite",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="mt-5">
            <h4 className="text-center text-uppercase mb-4">Statistiques</h4>
            <div className="row">
              {pokemon.stats.map((stat, index) => (
                <div
                  key={index}
                  className="col-md-6 mb-3 animate__animated animate__fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-uppercase fw-bold ">{stat.name}</span>
                    <span className="fw-bold">{stat.base_stat}</span>
                  </div>
                  <div
                    className="progress"
                    style={{
                      height: "12px",
                      backgroundColor: `${primaryColor}20`,
                    }}
                  >
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      style={{
                        width: "0%",
                        backgroundColor: primaryColor,
                        opacity: 0.8,
                        transition: "width 1.5s ease-out",
                      }}
                      data-progress={`${(stat.base_stat / 255) * 100}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
