export const fetchPokemon = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw new Error("Pokémon non trouvé");
    }

    const data = await response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: data.id,
          name: data.name,
          height: data.height / 10,
          weight: data.weight / 10,
          types: data.types.map((type) => type.type.name),
          image: data.sprites.other["official-artwork"].front_default,
          stats: data.stats.map((stat) => ({
            name: stat.stat.name,
            base_stat: stat.base_stat,
          })),
          abilities: data.abilities.map((ability) => ({
            name: ability.ability.name,
          })),
          moves: data.moves.slice(0, 10).map((move) => ({
            name: move.move.name,
            url: move.move.url,
          })),
        });
      }, 500);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du Pokémon:", error);
    throw error;
  }
};

export default fetchPokemon;
