const pokeApi = {}

convertPokeApiDetailToPokemon = (pokeDetail) => {
  const pokemon = new Pokemon
  pokemon.name = pokeDetail.name
  pokemon.number = pokeDetail.id

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}
pokeApi.getPokemonsDetail = (pokemon) =>{
  return fetch(pokemon.url)
  .then((response) => response.json())
  .then(convertPokeApiDetailToPokemon)

}
pokeApi.getPokemons = (offset = 0, limite = 5) =>{
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limite}`
  return fetch(url)
  .then((response) => response.json()) // converte o responde inicial em json
  .then((data)=> data.results) // acessa os results que tem a lista de pokemon
  .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail)) // cria uma lista nova
  //a partir de uma nova requisição a url de detalhes dos pokemons
  .then((detailResquests) => Promise.all(detailResquests)) // espera todas as promises terminar 
  .then((pokemonsDetails)=> pokemonsDetails)
}