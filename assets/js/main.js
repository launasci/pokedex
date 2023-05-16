

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limite = 10
let offset = 0

 loadPokemonsItens = (offset, limite) => {
  pokeApi.getPokemons(offset, limite).then((pokemons = []) => {
  const listItens = pokemons.map((pokemon) =>  `
            <li class="pokemon ${pokemon.type}">
              <span class="number">#${pokemon.number}</span>
              <span class="name">${pokemon.name}</span>
              <div class="detail">
                <ol class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                  alt="${pokemon.name}">
              </div>
            </li>
        `)
  const itensHtml = listItens.join('')
  pokemonList.innerHTML += itensHtml
  }).catch((error)=> console.error(error))
}

loadPokemonsItens(offset, limite)

loadMoreButton.addEventListener('click', () => {
  offset += limite
  const qtsRecord = offset + limite
  if(qtsRecord >= maxRecords){
    const newLimit = maxRecords - offset
    loadPokemonsItens(offset, newLimit)
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }
    loadPokemonsItens(offset, limite)
})