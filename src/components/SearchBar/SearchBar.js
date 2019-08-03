/* eslint-disable react/prop-types */
import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      input: '',
      types: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
  }

  handleInputChange (event) {
    this.setState({
      input: event.target.value
    })
  }

  handleSearch () {
    this.props.search(this.state.input, this.state.types)
  }

  handleTypeChange (event) {
    let { types } = this.state
    if (event.target.className === 'active') {
      event.target.className = ''
      const index = types.indexOf(event.target.id)
      const start = types.slice(0, index)
      const end = types.slice(index + 1)
      types = start.concat(end)
    } else {
      event.target.className = 'active'
      types.push(event.target.id)
    }
    this.setState({
      types
    })
  }

  render () {
    return (
      <div className="searchbar">
        <div className="searchbar-field">
          <input
            onChange={this.handleInputChange}
            placeholder="Enter pokemon name"
          />
        </div>
        <div className="types-outer-container">
          <div className="types-inner-container">
            <div id="normal" onClick={this.handleTypeChange}>
              normal
            </div>
            <div id="fighting" onClick={this.handleTypeChange}>
              fighting
            </div>
            <div id="flying" onClick={this.handleTypeChange}>
              flying
            </div>
            <div id="poison" onClick={this.handleTypeChange}>
              poison
            </div>
            <div id="ground" onClick={this.handleTypeChange}>
              ground
            </div>
            <div id="rock" onClick={this.handleTypeChange}>
              rock
            </div>
          </div>
          <div className="types-inner-container">
            <div id="bug" onClick={this.handleTypeChange}>
              bug
            </div>
            <div id="ghost" onClick={this.handleTypeChange}>
              ghost
            </div>
            <div id="steel" onClick={this.handleTypeChange}>
              steel
            </div>
            <div id="fire" onClick={this.handleTypeChange}>
              fire
            </div>
            <div id="water" onClick={this.handleTypeChange}>
              water
            </div>
            <div id="grass" onClick={this.handleTypeChange}>
              grass
            </div>
          </div>
          <div className="types-inner-container">
            <div id="electric" onClick={this.handleTypeChange}>
              electric
            </div>
            <div id="psychic" onClick={this.handleTypeChange}>
              psychic
            </div>
            <div id="ice" onClick={this.handleTypeChange}>
              ice
            </div>
            <div id="dragon" onClick={this.handleTypeChange}>
              dragon
            </div>
            <div id="dark" onClick={this.handleTypeChange}>
              dark
            </div>
            <div id="fairy" onClick={this.handleTypeChange}>
              fairy
            </div>
          </div>
        </div>
        <div className="searchbar-submit">
          <div onClick={this.handleSearch}>Search</div>
        </div>
      </div>
    )
  }
}

export default SearchBar
