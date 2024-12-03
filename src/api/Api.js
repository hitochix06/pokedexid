function fetchPokemon(id) {
  return fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Pokémon non trouvé");
      }
      return response.json();
    })
    .then((data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            name: data.name,
            id: data.id,
            height: data.height / 10, // convertir en mètres
            weight: data.weight / 10, // convertir en kg
            types: data.types.map((type) => type.type.name),
            image: data.sprites.other["official-artwork"].front_default,
            stats: data.stats.map((stat) => ({
              name: stat.stat.name,
              base_stat: stat.base_stat,
            })),
          });
        }, 500);
      });
    });
}

// Nouvelle fonction fetchPokemonDetails
export const fetchPokemonDetails = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      height: data.height / 10,
      weight: data.weight / 10,
      types: data.types.map((type) => type.type.name),
      stats: data.stats.map((stat) => ({
        name: stat.stat.name,
        base_stat: stat.base_stat,
      })),
      // Ensure abilities are correctly mapped
      abilities: data.abilities.map((ability) => ({
        name: ability.ability.name,
      })),
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du Pokémon:",
      error
    );
    throw error;
  }
}

// Export uniquement fetchPokemon car fetchPokemonDetails est déjà exporté avec export const
export { fetchPokemon };