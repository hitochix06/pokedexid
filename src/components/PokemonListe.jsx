import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationPokeball from "../assets/Animationpokeball.json";
import pokemonColors from "../data/pokemonColors.json";
import pokemonTypeIcons from "../assets/pokemonTypelcons";
import TypeFilter from "./TypeFilter";
import { useLanguage } from "../context/LanguageContext";
import { translateType } from "../utils/typeTranslations";
import { translatePokemonName } from "../utils/pokemonTranslations";

function Card3D({ pokemonUrl, index }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(pokemonUrl);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données");
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
                  <span className="type-name">
                    {translateType(type, language)}
                  </span>
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
            {translatePokemonName(pokemon.name, language)}
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
  const [showScrollButton, setShowScrollButton] = useState(false);
  const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);

  const handlePageChange = async (newPage) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onPageChange(newPage);
    setLoading(false);
  };

  useEffect(() => {
    const filterPokemonByType = async (pokemonData) => {
      if (!selectedType) return true;

      try {
        const response = await fetch(pokemonData.url);
        const data = await response.json();
        return data.types.some((type) => type.type.name === selectedType);
      } catch (error) {
        console.error("Erreur lors du filtrage:", error);
        return false;
      }
    };

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
        setFilteredPokemon(filtered.filter((pokemon) => pokemon !== null));
      }
      setLoading(false);
    };

    filterPokemon();
  }, [selectedType, pokemonList]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button
            className="page-link modern-page-link"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

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
        <nav
          aria-label="Navigation des pages de Pokémon"
          className="pagination-container"
        >
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link modern-page-link"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                «
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link modern-page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ‹
              </button>
            </li>

            {renderPageNumbers()}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link modern-page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </li>
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link modern-page-link"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </li>
          </ul>

          <div className="pagination-info">
            Page {currentPage} sur {totalPages}
          </div>

          <style jsx>{`
            .pagination-container {
              margin: 2rem 0;
              padding: 1rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1rem;
            }

            .pagination-info {
              font-size: 0.9rem;
              color: #666;
              margin-top: 0.5rem;
            }

            .modern-page-link {
              min-width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: none !important;
              border-radius: 50% !important;
              margin: 0 5px;
              font-weight: 500;
              transition: all 0.3s ease;
              background-color: #f0f0f0;
              color: #333;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }

            .page-item.active .modern-page-link {
              background-color: #ff5350 !important;
              color: white !important;
              transform: scale(1.2);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            }

            .modern-page-link:hover:not(:disabled) {
              background-color: #ff7b78 !important;
              color: white !important;
              transform: translateY(-3px);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            }

            @media (max-width: 576px) {
              .modern-page-link {
                min-width: 35px;
                height: 35px;
                font-size: 0.9rem;
              }
            }
          `}</style>
        </nav>
      )}

      {showScrollButton && (
        <button
          className="scroll-to-top-button"
          onClick={scrollToTop}
          aria-label="Retour en haut"
        >
          ↑
        </button>
      )}

      <style jsx>{`
        .scroll-to-top-button {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #ff5350;
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          z-index: 1000;
          animation: fadeIn 0.5s ease-in-out, bounce 2s infinite;
        }

        .scroll-to-top-button:hover {
          transform: translateY(-3px);
          background-color: #ff3d3a;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          animation: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @media (max-width: 768px) {
          .scroll-to-top-button {
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default PokemonList;
