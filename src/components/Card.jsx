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

    const maxRotation = 15; // Limite de rotation
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const rotateX = -deltaY / (rect.height / 2) * maxRotation;
    const rotateY = deltaX / (rect.width / 2) * maxRotation;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  if (error) return <div>{error}</div>;
  if (!pokemon) return null;

  const primaryType = pokemon.types[0];
  const cardBgColor = pokemonColors[primaryType] || '#f0f0f0';

  return (
    <div 
      ref={cardRef}
      className="pokemon-card-3d"
      style={{
        backgroundColor: cardBgColor,
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        boxShadow: `
          ${rotation.y * 2}px ${rotation.x * 2}px 20px rgba(0,0,0,0.2),
          ${-rotation.y * 2}px ${-rotation.x * 2}px 20px rgba(0,0,0,0.1)
        `
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/pokemon/${pokemon.id}`} className="card-link">
        <div className="card-header">
          <span className="pokemon-number">#{pokemon.id.toString().padStart(3, "0")}</span>
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
          <img 
            src={pokemon.image} 
            alt={pokemon.name} 
            className="pokemon-image" 
            style={{
              transform: `translateZ(50px) scale(${1 + Math.abs(rotation.x + rotation.y) / 100})`,
            }}
          />
        </div>

        <div className="pokemon-name">
          {pokemon.name.toUpperCase()}
        </div>
      </Link>

      <style jsx>{`
        .pokemon-card-3d {
          width: 250px;
          height: 350px;
          border-radius: 20px;
          overflow: hidden;
          margin: 20px;
          position: relative;
          cursor: pointer;
          transition: all 0.1s ease;
          transform-style: preserve-3d;
          background: linear-gradient(
            145deg, 
            rgba(255,255,255,0.1), 
            rgba(0,0,0,0.05)
          );
        }

        .card-link {
          text-decoration: none;
          color: white;
          display: block;
          height: 100%;
          padding: 20px;
          position: relative;
          z-index: 1;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .pokemon-number {
          font-size: 2.2rem;
          font-weight: bold;
          opacity: 0.7;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }

        .type-icons {
          display: flex;
          gap: 8px;
        }

        .type-icon {
          width: 30px;
          height: 30px;
          filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.3));
        }

        .pokemon-image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          perspective: 500px;
        }

        .pokemon-image {
          max-width: 180px;
          max-height: 180px;
          transition: transform 0.1s ease;
        }

        .pokemon-name {
          text-align: center;
          font-weight: bold;
          font-size: 1.3rem;
          padding: 15px 0;
          background-color: rgba(0,0,0,0.15);
          letter-spacing: 1px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}

export default Card3D;