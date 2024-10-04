import React, { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import { Row, Col } from "react-bootstrap";
import AnimatedCard from "react-animated-3d-card";
import pokemonColors from "../data/pokemonColors.json";

function Cards({ pokemonUrl }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((data) => {
        setPokemon({
          name: data.name,
          id: data.id,
          height: data.height / 10,
          weight: data.weight / 10,
          types: data.types.map((type) => type.type.name),
          image: data.sprites.other["official-artwork"].front_default,
        });
      })
      .catch((err) => setError(err.message));
  }, [pokemonUrl]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemon) {
    return <div>Chargement...</div>;
  }

  return (
    <AnimatedCard
      style={{
        width: "18rem",
        margin: "10px",
        backgroundColor: pokemonColors[pokemon.types[0]] || "gray", // Utilise la couleur du premier type
        borderRadius: "0.5rem",
        cursor: "pointer",
      }}
      onClick={() => console.log("Carte cliquée")}
    >
      <div style={{ padding: "1rem" }}>
        <div style={{ color: "white" }}>ID: {pokemon.id}</div>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          style={{ width: "100%", height: "auto" }}
        />
        <div className="text-center">
          <h3 style={{ textTransform: "uppercase", color: "white" }}>
            {pokemon.name}
          </h3>
          <Row>
            {pokemon.types.map((type, index) => (
              <Col key={index}>
                <Badge
                  pill
                  style={{
                    backgroundColor: pokemonColors[type] || "gray",
                    color: "white",
                  }}
                >
                  {type}
                </Badge>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </AnimatedCard>
  );
}

export default Cards;
