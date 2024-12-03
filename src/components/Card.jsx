import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import pokemonColors from "../data/pokemonColors.json";
import pokemonTypeIcons from "../assets/pokemonTypelcons";

function Card3D({ pokemonUrl, index }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(pokemonUrl);
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
                <img
                  key={index}
                  src={pokemonTypeIcons[type]}
                  alt={type}
                  className="type-icon"
                />
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
      `}</style>
    </div>
  );
}

export default Card3D;
