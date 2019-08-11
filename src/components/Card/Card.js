/* eslint-disable react/prop-types */
import React from 'react'
import './Card.sass'
import { useLocalStore, useObserver } from 'mobx-react-lite'

export default function Card (props) {
  const state = useLocalStore(() => ({ opened: false }))
  const {
    imgSrc,
    name,
    id,
    types,
    height,
    weight,
    abilities,
    hp,
    attack,
    defence,
    speed,
    specialAttack,
    specialDefence
  } = props.pokemon

  function toggleCard () {
    state.opened = !state.opened
  }

  return useObserver(() => (
    <div className={'pokemon-card' + (state.opened ? ' opened' : '')}>
      <div className="main-block">
        <div onClick={toggleCard} className="image-container">
          <img src={imgSrc} alt={name} />
        </div>
        <div className="pokemon-info">
          <p className="id">
            <span>#</span>
            {id}
          </p>
          <h2>{name}</h2>
          <div className="types">
            {types.map(type => (
              <div key={type} className={type}>
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>
      {state.opened && (
        <div className="additional-info">
          <div className="stats-container">
            <h2>Profile</h2>
            <div className="stats">
              <div>
                <h3>Height</h3>
                <h3>Weight</h3>
              </div>
              <div>
                <h3>{height / 10} m</h3>
                <h3>{weight / 10} kg</h3>
              </div>
            </div>
            <h2>Abilities</h2>
            <div className="stats">
              <div>
                {abilities.map(ability => (
                  <h3 key={ability}>{ability}</h3>
                ))}
              </div>
            </div>
          </div>
          <div className="stats-container">
            <h2>Base stats</h2>
            <div className="stats">
              <div>
                <h3>HP</h3>
                <h3>Attack</h3>
                <h3>Defense</h3>
                <h3>Speed</h3>
                <h3>Special Attack</h3>
                <h3>Special Defence</h3>
              </div>
              <div>
                <h3>{hp}</h3>
                <h3>{attack}</h3>
                <h3>{defence}</h3>
                <h3>{speed}</h3>
                <h3>{specialAttack}</h3>
                <h3>{specialDefence}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ))
}
