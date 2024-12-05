export const pokemonTranslations = {
  en: {
    bulbasaur: "Bulbasaur",
    herbizarre: "Herbizarre",
    
 
  },
  fr: {
    bulbasaur: "Bulbizarre",
    ivysaur: "Herbizarre",
    
  },
};

export const translateType = (type, language = "en") => {
  return pokemonTranslations[language][type.toLowerCase()] || type;
};
