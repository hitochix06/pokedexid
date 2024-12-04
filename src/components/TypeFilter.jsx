import React from "react";
import pokemonColors from "../data/pokemonColors.json";
import pokemonTypeIcons from "../assets/pokemonTypelcons";
import { translateType } from "../utils/typeTranslations";
import { useLanguage } from '../context/LanguageContext';

function TypeFilter({ selectedType, onTypeSelect }) {
  const { language } = useLanguage();

  return (
    <div className="type-filter">
      <div className="type-buttons">
        {Object.keys(pokemonTypeIcons).map((type) => (
          <button
            key={type}
            className={`type-button ${selectedType === type ? 'selected' : ''}`}
            style={{
              backgroundColor: pokemonColors[type]?.primary || '#000000',
              borderColor: pokemonColors[type]?.secondary || '#000000'
            }}
            onClick={() => onTypeSelect(type)}
          >
            <img 
              src={pokemonTypeIcons[type]} 
              alt={type} 
              className="type-icon"
            />
            <span>{translateType(type, language)}</span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .type-filter {
          position: relative;
          padding: 20px;
          width: 100%;
        }

        .type-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 10px;
          margin-top: 40px;
        }

        .type-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 2px solid;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
          font-weight: bold;
        }

        .type-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .type-button.selected {
          transform: scale(0.95);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
        }

        .type-icon {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        @media (max-width: 768px) {
          .type-buttons {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          }

          .type-button {
            padding: 6px 12px;
            font-size: 0.9em;
          }

          .type-icon {
            width: 16px;
            height: 16px;
          }
        }

        @media (max-width: 480px) {
          .type-buttons {
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

export default TypeFilter; 