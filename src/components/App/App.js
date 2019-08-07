import React from 'react'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import './App.css'
import SearchBar from '../SearchBar/SearchBar'
import CardList from '../CardList/CardList'
import PokeApi from '../../util/PokeApi'

class App extends React.Component {
  constructor (props) {
    super(props)
    extendObservable(this, {
      pokemons: [],
      loadingFlag: false
    })
  }

  search = async (input, types) => {
    this.loadingFlag = true
    let pokemons = []
    if (types.length === 0) {
      pokemons = await PokeApi.searchByName(input)
    } else {
      pokemons = await PokeApi.searchByTypes(types, input)
    }
    this.pokemons = pokemons
    this.loadingFlag = false
  }

  render () {
    const { pokemons, loadingFlag } = this
    return (
      <div className="app">
        <h1>PokeSearch</h1>
        <SearchBar search={this.search} />
        <CardList
          pokemons={pokemons}
          key={pokemons.length}
          loadingFlag={loadingFlag}
        />
      </div>
    )
  }
}

export default observer(App)
