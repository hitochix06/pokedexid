import React from "react";
import pokemonColors from "../data/pokemonColors.json";
import pokemonTypeIcons from "../assets/pokemonTypelcons";

function TypeFilter({ selectedType, onTypeSelect }) {
  return (
    <div className="container mb-4">
      <div className="d-flex flex-wrap justify-content-center gap-2">
        <button
          className={`btn ${!selectedType ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onTypeSelect(null)}
        >
          Tous
        </button>
        {Object.keys(pokemonColors).map((type) => (
          <button
            key={type}
            className={`btn d-flex align-items-center gap-2 ${
              selectedType === type ? 'active' : ''
            }`}
            onClick={() => onTypeSelect(type)}
            style={{
              backgroundColor: selectedType === type ? pokemonColors[type] : 'transparent',
              borderColor: pokemonColors[type],
              color: selectedType === type ? 'white' : pokemonColors[type]
            }}
          >
            <img
              src={pokemonTypeIcons[type]}
              alt={type}
              style={{ width: "20px", height: "20px" }}
            />
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TypeFilter; 