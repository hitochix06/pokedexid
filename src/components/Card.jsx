import React, { useState, useEffect } from "react";
import AnimatedCard from "react-animated-3d-card";
import pokemonColors from "../data/pokemonColors.json";
import pokemonTypeIcons from "../assets/pokemonTypelcons";
import { Link } from "react-router-dom";

function Card({ pokemonUrl, index }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

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
      } finally {
        setTimeout(() => setIsVisible(true), index * 200);
      }
    };

    fetchData();
  }, [pokemonUrl, index]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemon) {
    return null;
  }

  return (
    <div className="card-container">
      <div className={`animated-card ${isVisible ? "visible" : ""}`}>
        <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: "none" }}>
          <AnimatedCard
            style={{
              width: "18rem",
              margin: "10px",
              backgroundColor: pokemonColors[pokemon.types[0]] || "",
              borderRadius: "0.5rem",
              cursor: "pointer",
              position: "relative",
            }}
           
          >
            <div style={{ padding: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "4rem",
                    fontWeight: "bold",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  #{pokemon.id.toString().padStart(3, "0")}
                </span>
                <div>
                  {pokemon.types.map((type, index) => (
                    <img
                      key={index}
                      src={pokemonTypeIcons[type]}
                      alt={type}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginLeft: "5px",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="text-center">
                <h3 style={{ textTransform: "uppercase", color: "white" }}>
                  {pokemon.name}
                </h3>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  style={{ width: "100%", height: "auto" }}
                  className="animate__animated animate__bounce"
                />
              </div>
            </div>
          </AnimatedCard>
        </Link>
      </div>
      <style jsx>{`
        .pokemon-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        .card-container {
          perspective: 1000px;
        }

        .animated-card {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        .animated-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default Card;
