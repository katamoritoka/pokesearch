const PokeApi = {
  byNameUrl: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=807',
  byTypeUrl: 'https://pokeapi.co/api/v2/type/',
  getImgId (id) {
    const stringId = id.toString()
    let newId = ''
    switch (stringId.length) {
      case 1:
        newId = `00${stringId}`
        break
      case 2:
        newId = `0${stringId}`
        break
      default:
        newId = stringId
        break
    }
    return newId
  },
  async requestByName (input) {
    const rawData = await this.sendRequest(this.byNameUrl)
    const pokemonUrls = rawData.results.filter(
      pokemonObj => pokemonObj.name.indexOf(input) === 0
    )
    return pokemonUrls
  },
  async requestByType (typeId) {
    const endpoint = this.byTypeUrl + typeId
    const rawData = await this.sendRequest(endpoint)
    const unfilteredPokemonUrls = rawData.pokemon.map(
      pokemonObj => pokemonObj.pokemon
    )
    const pokemonUrls = unfilteredPokemonUrls.filter(
      pokemonObj => pokemonObj.url.length <= 38
    )
    return pokemonUrls
  },
  async transformPokemonUrlsToObj (pokemonUrls) {
    const promises = pokemonUrls.map(pokemon => {
      if (typeof pokemon === 'object') {
        return this.sendRequest(pokemon.url)
      }
      if (typeof pokemon === 'string') {
        return this.sendRequest(pokemon)
      }
    })
    const allPokemonsJSON = await Promise.all(promises)
    const pokemonObjects = allPokemonsJSON.map(pokemonJSON => {
      const types = pokemonJSON.types.map(type => type.type.name)
      const abilities = pokemonJSON.abilities.map(
        ability => ability.ability.name
      )
      return {
        id: pokemonJSON.id,
        name: pokemonJSON.name,
        types: types,
        imgSrc: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.getImgId(
          pokemonJSON.id
        )}.png`,
        height: pokemonJSON.height,
        weight: pokemonJSON.weight,
        abilities: abilities,
        hp: pokemonJSON.stats[5].base_stat,
        attack: pokemonJSON.stats[4].base_stat,
        defence: pokemonJSON.stats[3].base_stat,
        speed: pokemonJSON.stats[0].base_stat,
        specialAttack: pokemonJSON.stats[2].base_stat,
        specialDefence: pokemonJSON.stats[1].base_stat
      }
    })
    return pokemonObjects
  },
  async sendRequest (endpoint) {
    const response = await fetch(endpoint)
    const jsonResponse = await response.json()
    return jsonResponse
  },
  unique (arr) {
    const obj = {}
    for (let i = 0; i < arr.length; i += 1) {
      const str = arr[i].url
      obj[str] = arr[i].name
    }
    return Object.keys(obj)
  },
  async searchByTypes (types, input) {
    const promises = types.map(type => this.requestByType(type))
    const results = await Promise.all(promises)
    const concatenated = results.reduce((accumulator, currentValue) =>
      accumulator.concat(currentValue)
    )
    const filtered = concatenated.filter(
      pokemonObj => pokemonObj.name.indexOf(input) === 0
    )
    const uniqueUrls = this.unique(filtered)
    const transformed = await this.transformPokemonUrlsToObj(uniqueUrls)
    transformed.sort((a, b) => +a.id - +b.id)
    return transformed
  },
  async searchByName (input) {
    const filtered = await this.requestByName(input)
    const transformed = await this.transformPokemonUrlsToObj(filtered)
    return transformed
  }
}

export default PokeApi
