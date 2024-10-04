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
          });
        }, 500);
      });
    });
}



export { fetchPokemon };
