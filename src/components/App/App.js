import React from 'react'
import { useObserver, useLocalStore } from 'mobx-react-lite'
import './App.sass'
import SearchBar from '../SearchBar/SearchBar'
import CardList from '../CardList/CardList'
import PokeApi from '../../util/PokeApi'

export default function App (props) {
  const state = useLocalStore(() => ({ loadingFlag: false, pokemons: [] }))

  async function search (input, types) {
    state.loadingFlag = true
    let newPokemons = []
    if (types.length === 0) {
      newPokemons = await PokeApi.searchByName(input)
    } else {
      newPokemons = await PokeApi.searchByTypes(types, input)
    }
    state.pokemons = newPokemons
    state.loadingFlag = false
  }

  return useObserver(() => (
    <div className="app">
      <h1>PokeSearch</h1>
      <SearchBar search={search} />
      <CardList
        pokemons={state.pokemons}
        key={state.pokemons.length}
        loadingFlag={state.loadingFlag}
      />
    </div>
  ))
}
