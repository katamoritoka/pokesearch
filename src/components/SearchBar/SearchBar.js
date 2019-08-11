/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import './SearchBar.sass'

export default function SearchBar (props) {
  const [input, setInput] = useState('')
  const [types, setTypes] = useState([])
  const typeNames = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']

  function handleInputChange (event) {
    setInput(event.target.value)
  }

  function handleSearch () {
    props.search(input, types)
  }

  function handleTypeChange (event) {
    let currentTypes = types.map(elem => elem)
    const currentType = event.target.id
    const index = currentTypes.indexOf(currentType)
    if (index === -1) {
      currentTypes.push(currentType)
    } else {
      const start = currentTypes.slice(0, index)
      const end = currentTypes.slice(index + 1)
      currentTypes = start.concat(end)
    }
    setTypes(currentTypes)
  }

  function getTypeClass (type) {
    const index = types.indexOf(type)
    if (index === -1) {
      return ''
    } else {
      return ' active'
    }
  }

  function renderTypes () {
    const typeDivs = typeNames.map(type => {
      return (
        <div
          id={type}
          className={type + getTypeClass(type)}
          onClick={handleTypeChange}
          key={type}
        >
          {type}
        </div>
      )
    })
    return (
      <div className="types-outer-container">
        <div className="types-inner-container">{typeDivs.slice(0, 6)}</div>
        <div className="types-inner-container">{typeDivs.slice(6, 12)}</div>
        <div className="types-inner-container">{typeDivs.slice(12, 18)}</div>
      </div>
    )
  }

  return (
    <div className="searchbar">
      <div className="searchbar-field">
        <input onChange={handleInputChange} placeholder="Enter pokemon name" />
      </div>
      <span id="or">OR</span>
      {renderTypes()}
      <div className="searchbar-submit">
        <a onClick={handleSearch}>Search</a>
      </div>
    </div>
  )
}
