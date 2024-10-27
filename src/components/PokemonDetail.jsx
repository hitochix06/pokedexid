import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPokemon } from "../api/Api";
import pokemonColors from "../data/pokemonColors.json";
import pokemonTypeIcons from "../assets/pokemonTypelcons";
import Lottie from "lottie-react";
import animationPokeball from "../assets/Animationpokeball.json";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPokemon(id)
      .then(setPokemon)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div>Erreur : {error}</div>;
  if (!pokemon) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Lottie
          animationData={animationPokeball}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-primary mb-3">Retour à la liste</Link>
      <div className="card" style={{ backgroundColor: pokemonColors[pokemon.types[0]] || "" }}>
        <div className="card-body">
          <h2 className="card-title text-center text-white">{pokemon.name.toUpperCase()}</h2>
          <div className="row">
            <div className="col-md-6 text-center">
              <img src={pokemon.image} alt={pokemon.name} className="img-fluid" />
            </div>
            <div className="col-md-6">
              <p><strong>Numéro :</strong> #{pokemon.id.toString().padStart(3, "0")}</p>
              <p><strong>Taille :</strong> {pokemon.height} m</p>
              <p><strong>Poids :</strong> {pokemon.weight} kg</p>
              <p><strong>Types :</strong></p>
              <div>
                {pokemon.types.map((type, index) => (
                  <img
                    key={index}
                    src={pokemonTypeIcons[type]}
                    alt={type}
                    style={{ width: "30px", height: "30px", marginRight: "5px" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
