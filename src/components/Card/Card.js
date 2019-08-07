/* eslint-disable react/prop-types */
import React from 'react'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import './Card.css'

class Card extends React.Component {
  constructor (props) {
    super(props)
    extendObservable(this, {
      opened: false
    })
  }

  toggleCard = (event) => {
    const width = window.innerWidth
    const pokemonCard = event.currentTarget.parentNode.parentNode
    const additionalInfo = pokemonCard.children[1]
    if (this.opened) {
      pokemonCard.style.width = '250px'
      additionalInfo.style.display = 'none'
    } else {
      if (width > 750) {
        pokemonCard.style.width = '645px'
      }
      additionalInfo.style.display = 'flex'
    }
    this.opened = !this.opened
  }

  render () {
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
    } = this.props.pokemon
    return (
      <div className="pokemon-card">
        <div className="main-block">
          <div onClick={this.toggleCard} className="image-container">
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
      </div>
    )
  }
}

export default observer(Card)
