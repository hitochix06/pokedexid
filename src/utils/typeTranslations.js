export const typeTranslations = {
  en: {
    normal: "Normal",
    fighting: "Fighting",
    flying: "Flying",
    poison: "Poison",
    ground: "Ground",
    rock: "Rock",
    bug: "Bug",
    ghost: "Ghost",
    steel: "Steel",
    fire: "Fire",
    water: "Water",
    grass: "Grass",
    electric: "Electric",
    psychic: "Psychic",
    ice: "Ice",
    dragon: "Dragon",
    dark: "Dark",
    fairy: "Fairy",
    shadow: "Shadow"
  },
  fr: {
    normal: "Normal",
    fighting: "Combat",
    flying: "Vol",
    poison: "Poison",
    ground: "Sol",
    rock: "Roche",
    bug: "Insecte",
    ghost: "Spectre",
    steel: "Acier",
    fire: "Feu",
    water: "Eau",
    grass: "Plante",
    electric: "Électrik",
    psychic: "Psy",
    ice: "Glace",
    dragon: "Dragon",
    dark: "Ténèbres",
    fairy: "Fée",
    shadow: "Obscur"
  }
};

export const translateType = (type, language = 'en') => {
  return typeTranslations[language][type.toLowerCase()] || type;
};
