import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationPokeball from "../assets/Animationpokeball.json";
import pokemonColors from "../data/pokemonColors.json";
import pokemonTypeIcons from "../assets/pokemonTypelcons";
import TypeFilter from './TypeFilter';

function Card3D({ pokemonUrl, index }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(pokemonUrl);
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        const data = await response.json();
        setPokemon({
          name: data.name,
          id: data.id,
          height: data.height / 10,
          weight: data.weight / 10,
          types: data.types.map((type) => type.type.name),
          image: data.sprites.other["official-artwork"].front_default,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [pokemonUrl]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const maxRotation = 15;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const rotateX = (-deltaY / (rect.height / 2)) * maxRotation;
    const rotateY = (deltaX / (rect.width / 2)) * maxRotation;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  if (error) return <div>{error}</div>;
  if (!pokemon) return null;

  const primaryType = pokemon.types[0];
  const cardBgColor = pokemonColors[primaryType] || "#f0f0f0";

  return (
    <div className="pokemon-card-wrapper">
      <div
        ref={cardRef}
        className="pokemon-card-modern"
        style={{
          backgroundColor: cardBgColor,
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          boxShadow: `
            ${rotation.y * 2}px ${rotation.x * 2}px 20px rgba(0,0,0,0.2),
            ${-rotation.y * 2}px ${-rotation.x * 2}px 20px rgba(0,0,0,0.1)
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={`/pokemon/${pokemon.id}`} className="card-link">
          <div className="card-header">
            <span className="pokemon-number">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
            <div className="type-icons">
              {pokemon.types.map((type, index) => (
                <div key={index} className="type-container">
                  <img
                    src={pokemonTypeIcons[type]}
                    alt={type}
                    className="type-icon"
                  />
                  <span className="type-name">{type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pokemon-image-container">
            <div className="pokemon-image-wrapper">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="pokemon-image"
                style={{
                  transform: `translateZ(50px) scale(${
                    1 + Math.abs(rotation.x + rotation.y) / 100
                  })`,
                }}
              />
            </div>
          </div>

          <div className="pokemon-name">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </div>
        </Link>

        <style jsx>{`
          .pokemon-card-modern {
            width: 280px;
            height: 420px;
            border-radius: 30px;
            overflow: hidden;
            margin: 20px;
            position: relative;
            cursor: pointer;
            transition: all 0.1s ease;
            transform-style: preserve-3d;
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.2),
              rgba(0, 0, 0, 0.1)
            );
            border: 5px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            animation: breatheAnimation 4s ease-in-out infinite,
              cardRotation 8s ease-in-out infinite;
            animation-delay: 0s, calc(${index} * 0.5s);
          }

          .card-link {
            text-decoration: none;
            color: white;
            display: block;
            height: 100%;
            padding: 25px;
            position: relative;
            z-index: 1;
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .pokemon-number {
            font-size: 2.5rem;
            font-weight: bold;
            opacity: 0.8;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          }

          .type-icons {
            display: flex;
            gap: 10px;
          }

          .type-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
          }

          .type-name {
            font-size: 0.9rem;
            font-weight: bold;
            text-transform: capitalize;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          }

          .type-icon {
            width: 35px;
            height: 35px;
            filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.4));
            animation: typeIconPulse 2s ease-in-out infinite;
            animation-delay: calc(${index} * 0.2s);
          }

          .pokemon-image-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 250px;
            perspective: 500px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            margin-bottom: 15px;
          }

          .pokemon-image-wrapper {
            background: radial-gradient(
              circle at 30% 30%,
              rgba(255, 255, 255, 0.3),
              transparent 50%
            );
            border-radius: 50%;
            padding: 20px;
          }

          .pokemon-image {
            max-width: 200px;
            max-height: 200px;
            transition: transform 0.3s ease;
          }

          .pokemon-name {
            text-align: center;
            font-weight: bold;
            font-size: 1.5rem;
            padding: 15px 0;
            background-color: rgba(0, 0, 0, 0.2);
            letter-spacing: 2px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            border-radius: 0 0 25px 25px;
            text-transform: capitalize;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
          }

          @keyframes cardEntrance {
            from {
              opacity: 0;
              transform: scale(0.8) rotateY(-180deg);
            }
            to {
              opacity: 1;
              transform: scale(1) rotateY(0);
            }
          }

          @keyframes breatheAnimation {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.02);
            }
          }

          @keyframes typeIconPulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }

          @keyframes cardRotation {
            0% {
              transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
            }
            25% {
              transform: perspective(1000px) rotateY(10deg) rotateX(5deg);
            }
            50% {
              transform: perspective(1000px) rotateY(-10deg) rotateX(-5deg);
            }
            75% {
              transform: perspective(1000px) rotateY(5deg) rotateX(3deg);
            }
            100% {
              transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
            }
          }

          .pokemon-card-modern:hover .pokemon-image {
            transform: translateZ(50px) scale(1.1) rotate(5deg);
          }

          .pokemon-card-modern:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>

      <style jsx>{`
        .pokemon-card-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px;
        }

        .pokemon-card-name {
          margin-top: 10px;
          font-size: 1.2rem;
          font-weight: bold;
          text-transform: capitalize;
          color: #333;
        }

        @media (max-width: 768px) {
          .pokemon-card-modern {
            width: 240px;
            height: 360px;
          }

          .pokemon-number {
            font-size: 2rem;
          }

          .type-icon {
            width: 30px;
            height: 30px;
          }

          .pokemon-image {
            max-width: 160px;
            max-height: 160px;
          }

          .pokemon-name {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .pokemon-card-modern {
            width: 200px;
            height: 300px;
            margin: 10px;
          }

          .card-link {
            padding: 15px;
          }

          .pokemon-number {
            font-size: 1.5rem;
          }

          .type-icon {
            width: 25px;
            height: 25px;
          }

          .type-name {
            font-size: 0.8rem;
          }

          .pokemon-image-container {
            height: 180px;
          }

          .pokemon-image {
            max-width: 130px;
            max-height: 130px;
          }

          .pokemon-name {
            font-size: 1rem;
            padding: 10px 0;
          }
        }
      `}</style>
    </div>
  );
}

function PokemonList({ pokemonList, currentPage, onPageChange }) {
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const pokemonPerPage = 20;

  // Fonction pour filtrer les Pokémon par type
  const filterPokemonByType = async (pokemonData) => {
    if (!selectedType) return true;
    
    try {
      const response = await fetch(pokemonData.url);
      const data = await response.json();
      return data.types.some(type => type.type.name === selectedType);
    } catch (error) {
      console.error("Erreur lors du filtrage:", error);
      return false;
    }
  };

  // Effet pour filtrer les Pokémon quand le type sélectionné change
  useEffect(() => {
    const filterPokemon = async () => {
      setLoading(true);
      if (!selectedType) {
        setFilteredPokemon(pokemonList);
      } else {
        const filtered = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const shouldInclude = await filterPokemonByType(pokemon);
            return shouldInclude ? pokemon : null;
          })
        );
        setFilteredPokemon(filtered.filter(pokemon => pokemon !== null));
      }
      setLoading(false);
    };

    filterPokemon();
  }, [selectedType, pokemonList]);

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Lottie
          animationData={animationPokeball}
          loop={true}
          className="w-25"
        />
      </div>
    );
  }

  return (
    <div className="container p-3">
      <TypeFilter
        selectedType={selectedType}
        onTypeSelect={(type) => {
          setSelectedType(type);
          onPageChange(1);
        }}
      />
      
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-3 mb-4">
        {currentPokemon.map((pokemon, index) => (
          <div className="col" key={pokemon.name}>
            <Card3D
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
      {!selectedType && pokemonList.length > pokemonPerPage && (
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
