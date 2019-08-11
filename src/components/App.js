import React, { useState } from 'react'
import '../styles/css/App.css'
import SearchBar from './SearchBar'
import CardList from './CardList'
import PokeApi from '../util/PokeApi'

export default function App (props) {
  const [pokemons, setPokemons] = useState([])
  const [loadingFlag, setLoadingFlag] = useState(false)

  async function search (input, types) {
    setLoadingFlag(true)
    let pokemons = []
    if (types.length === 0) {
      pokemons = await PokeApi.searchByName(input)
    } else {
      pokemons = await PokeApi.searchByTypes(types, input)
    }
    setPokemons(pokemons)
    setLoadingFlag(false)
  }

  return (
    <div className="app">
      <h1>PokeSearch</h1>
      <SearchBar search={search} />
      <CardList
        pokemons={pokemons}
        key={pokemons.length}
        loadingFlag={loadingFlag}
      />
    </div>
  )
}
