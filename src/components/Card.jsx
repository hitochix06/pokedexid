import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pokemonColors from "../data/pokemonColors.json";
import pokemonTypeIcons from "../assets/pokemonTypelcons";

function Card3D({ pokemonUrl, index }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [tiltPosition, setTiltPosition] = useState({ x: 0, y: 0 });

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
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angleX = (centerY - e.clientY) / 20;
    const angleY = -(centerX - e.clientX) / 20;

    setTiltPosition({ x: angleX, y: angleY });
  };

  const handleMouseLeave = () => {
    setTiltPosition({ x: 0, y: 0 });
  };

  if (error) return <div>{error}</div>;
  if (!pokemon) return null;

  const primaryType = pokemon.types[0];
  const cardBgColor = pokemonColors[primaryType] || '#f0f0f0';

  return (
    <div 
      className="pokemon-card-3d"
      style={{
        transform: `perspective(1000px) rotateX(${tiltPosition.x}deg) rotateY(${tiltPosition.y}deg)`,
        backgroundColor: cardBgColor,
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
          box-shadow: 
            0 10px 30px rgba(0,0,0,0.2), 
            0 15px 40px rgba(0,0,0,0.1);
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
          transition: transform 0.3s ease;
          transform: translateZ(50px);
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

        .pokemon-card-3d:hover .pokemon-image {
          transform: translateZ(80px);
        }
      `}</style>
    </div>
  );
}

export default Card3D;