/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import '../styles/css/SearchBar.css'

export default function SearchBar (props) {
  const [input, setInput] = useState('')
  const [types, setTypes] = useState([])

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
      return 'active'
    }
  }

  return (
    <div className="searchbar">
      <div className="searchbar-field">
        <input onChange={handleInputChange} placeholder="Enter pokemon name" />
      </div>
      <span id="or">OR</span>
      <div className="types-outer-container">
        <div className="types-inner-container">
          <div
            id="normal"
            className={getTypeClass('normal')}
            onClick={handleTypeChange}
          >
            normal
          </div>
          <div
            id="fighting"
            className={getTypeClass('fighting')}
            onClick={handleTypeChange}
          >
            fighting
          </div>
          <div
            id="flying"
            className={getTypeClass('flying')}
            onClick={handleTypeChange}
          >
            flying
          </div>
          <div
            id="poison"
            className={getTypeClass('poison')}
            onClick={handleTypeChange}
          >
            poison
          </div>
          <div
            id="ground"
            className={getTypeClass('ground')}
            onClick={handleTypeChange}
          >
            ground
          </div>
          <div
            id="rock"
            className={getTypeClass('rock')}
            onClick={handleTypeChange}
          >
            rock
          </div>
        </div>
        <div className="types-inner-container">
          <div
            id="bug"
            className={getTypeClass('bug')}
            onClick={handleTypeChange}
          >
            bug
          </div>
          <div
            id="ghost"
            className={getTypeClass('ghost')}
            onClick={handleTypeChange}
          >
            ghost
          </div>
          <div
            id="steel"
            className={getTypeClass('steel')}
            onClick={handleTypeChange}
          >
            steel
          </div>
          <div
            id="fire"
            className={getTypeClass('fire')}
            onClick={handleTypeChange}
          >
            fire
          </div>
          <div
            id="water"
            className={getTypeClass('water')}
            onClick={handleTypeChange}
          >
            water
          </div>
          <div
            id="grass"
            className={getTypeClass('grass')}
            onClick={handleTypeChange}
          >
            grass
          </div>
        </div>
        <div className="types-inner-container">
          <div
            id="electric"
            className={getTypeClass('electric')}
            onClick={handleTypeChange}
          >
            electric
          </div>
          <div
            id="psychic"
            className={getTypeClass('psychic')}
            onClick={handleTypeChange}
          >
            psychic
          </div>
          <div
            id="ice"
            className={getTypeClass('ice')}
            onClick={handleTypeChange}
          >
            ice
          </div>
          <div
            id="dragon"
            className={getTypeClass('dragon')}
            onClick={handleTypeChange}
          >
            dragon
          </div>
          <div
            id="dark"
            className={getTypeClass('dark')}
            onClick={handleTypeChange}
          >
            dark
          </div>
          <div
            id="fairy"
            className={getTypeClass('fairy')}
            onClick={handleTypeChange}
          >
            fairy
          </div>
        </div>
      </div>
      <div className="searchbar-submit">
        <a onClick={handleSearch}>Search</a>
      </div>
    </div>
  )
}
