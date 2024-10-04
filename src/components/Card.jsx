import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Row, Col } from "react-bootstrap";

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
    <Card style={{ width: "18rem", margin: "10px" }}>
          ID: {pokemon.id}
      <Card.Img variant="top" src={pokemon.image} />
      <Card.Body className="text-center">
        <Card.Title>{pokemon.name}</Card.Title>
        <Card.Text>
        </Card.Text>
        <Row>
          {pokemon.types.map((type, index) => (
            <Col key={index}>
              <Badge pill bg="primary" >
                {type}
              </Badge>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Cards;
