// Cette fonction récupère tous les Pokémon depuis l'API avec une limite de 1000
export async function fetchAllPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  const data = await response.json();
  return data.results;
}
