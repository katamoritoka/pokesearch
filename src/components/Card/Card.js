/* eslint-disable react/prop-types */
import React from 'react'
import './Card.css'

class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      opened: false
    }
    this.toggleCard = this.toggleCard.bind(this)
  }

  toggleCard (event) {
    const width = window.innerWidth
    const pokemonCard = event.currentTarget.parentNode.parentNode
    const additionalInfo = pokemonCard.children[1]
    if (this.state.opened) {
      pokemonCard.style.width = '250px'
      additionalInfo.style.display = 'none'
    } else {
      if (width > 750) {
        pokemonCard.style.width = '605px'
      }
      additionalInfo.style.display = 'flex'
    }
    this.setState({ opened: !this.state.opened })
  }

  render () {
    return (
      <div className="pokemon-card">
        <div className="main-block">
          <div onClick={this.toggleCard} className="image-container">
            <img
              src={this.props.pokemon.imgSrc}
              alt={this.props.pokemon.name}
            />
          </div>
          <div className="pokemon-info">
            <p className="id">
              <span>#</span>
              {this.props.pokemon.id}
            </p>
            <h2>{this.props.pokemon.name}</h2>
            <div className="types">
              {this.props.pokemon.types.map(type => (
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
                <h3>{this.props.pokemon.height / 10} m</h3>
                <h3>{this.props.pokemon.weight / 10} kg</h3>
              </div>
            </div>
            <h2>Abilities</h2>
            <div className="stats">
              <div>
                {this.props.pokemon.abilities.map(ability => (
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
                <h3>{this.props.pokemon.hp}</h3>
                <h3>{this.props.pokemon.attack}</h3>
                <h3>{this.props.pokemon.defence}</h3>
                <h3>{this.props.pokemon.speed}</h3>
                <h3>{this.props.pokemon.specialAttack}</h3>
                <h3>{this.props.pokemon.specialDefence}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card
