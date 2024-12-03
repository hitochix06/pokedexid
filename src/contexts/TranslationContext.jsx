import React, { createContext, useState, useContext } from "react";
import pokemonTranslations from "../data/pokemon-translations-fr.json";

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("FR");

  const translatePokemonName = (pokemonId) => {
    // Convertir pokemonId en chaîne car les clés sont des chaînes
    const id = String(pokemonId);
    return (
      pokemonTranslations.pokemon_names[id]?.[language.toLowerCase()] ||
      `Pokemon ${id}`
    );
  };

  return (
    <TranslationProvider.Provider
      value={{
        language,
        setLanguage,
        translatePokemonName,
      }}
    >
      {children}
    </TranslationProvider.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
