/* eslint-disable react/prop-types */
import React from 'react'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor (props) {
    super(props)
    extendObservable(this, {
      input: '',
      types: []
    })
  }

  handleInputChange = (event) => {
    this.input = event.target.value
  }

  handleSearch = () => {
    const { input, types } = this
    this.props.search(input, types)
  }

  handleTypeChange = (event) => {
    let { types } = this
    const currentType = event.target
    if (currentType.className === 'active') {
      currentType.className = ''
      const index = types.indexOf(currentType.id)
      const start = types.slice(0, index)
      const end = types.slice(index + 1)
      types = start.concat(end)
    } else {
      currentType.className = 'active'
      types.push(currentType.id)
    }
    this.types = types
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
        <span id="or">OR</span>
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
          <a onClick={this.handleSearch}>Search</a>
        </div>
      </div>
    )
  }
}

export default observer(SearchBar)
