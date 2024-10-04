const colors = {
  fire: "#ff7402",
  grass: "#33a165",
  steel: "#00858a",
  water: "#0050ac",
  psychic: "#c90086",
  ground: "#c90086",
  ice: "#70deff",
  flying: "#5d4e75",
  ghost: "#4d5b64",
  normal: "#753845",
  poison: "#7e0058",
  rock: "#6e1a00",
  fighting: "#634136",
  dark: "#272625",
  bug: "#6e1a00",
  dragon: "#00c431",
  electric: "#bba909",
  fairy: "#d31c81",
  unknow: "#757575",
  shadow: "#29292c",
};

//fonction pour recuperer les information du pokemon
const BASE_URL = "https://pokeapi.co/api/v2/";

export const fetchPokemon = async (idOrName) => {
  try {
    const response = await fetch(
      `${BASE_URL}pokemon/${idOrName.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error("Pokémon non trouvé");
    }
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      types: data.types.map((type) => type.type.name),
      image: data.sprites.other["official-artwork"].front_default,
      height: data.height / 10, // convertir en mètres
      weight: data.weight / 10, // convertir en kg
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du Pokémon:", error);
    throw error;
  }
};
