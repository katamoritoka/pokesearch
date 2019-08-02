import React from 'react';
import './Card.css';

class Card extends React.Component {
  render() {
    return (
      <div className="pokemon-card">
        <div className="image-container">
          <img src={this.props.pokemon.imgSrc} alt={this.props.pokemon.name} />
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
    );
  }
}

export default Card;
