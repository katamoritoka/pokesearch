import React from 'react'
import './App.css'
import SearchBar from '../SearchBar/SearchBar'
import CardList from '../CardList/CardList'
import PokeApi from '../../util/PokeApi'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pokemons: []
    }
    this.search = this.search.bind(this)
  }

  search (input, types) {
    if (types.length === 0) {
      PokeApi.searchByName(input).then(pokemons => {
        this.setState({
          pokemons
        })
      })
    } else {
      PokeApi.searchByTypes(types).then(pokemons => {
        this.setState({
          pokemons
        })
      })
    }
  }

  render () {
    return (
      <div className="app">
        <h1>PokeSearch</h1>
        <SearchBar search={this.search} />
        <CardList pokemons={this.state.pokemons} />
      </div>
    )
  }
}

export default App
