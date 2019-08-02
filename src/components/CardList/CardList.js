import React from 'react';
import './CardList.css';
import Card from '../Card/Card';

class CardList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      limit: 10,
    };

    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.currentPokemons = this.currentPokemons.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.renderPages = this.renderPages.bind(this);
    this.renderListParams = this.renderListParams.bind(this);
    this.getPageClass = this.getPageClass.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      offset: 0,
    });
  }

  handleLimitChange(event) {
    this.setState({
      limit: +event.target.value,
      offset: 0,
    });
  }

  handlePageChange(number) {
    this.setState({
      offset: number * this.state.limit,
    });
  }

  currentPokemons() {
    const current = this.props.pokemons.slice(
      this.state.offset,
      Math.min(this.state.offset + this.state.limit, this.props.pokemons.length),
    );
    return current;
  }

  getPageClass(pageNumber) {
    const currentPage = this.state.offset / this.state.limit;
    if (pageNumber === currentPage) {
      return 'current';
    }
    return '';
  }

  renderPages() {
    const pages = [];
    const lastPage = Math.ceil(this.props.pokemons.length / this.state.limit) - 1;
    if (lastPage < 9) {
      for (let i = 0; i < lastPage; i += 1) {
        pages.push(
          <div
            className={this.getPageClass(i)}
            onClick={this.handlePageChange.bind(this, i)}
            key={i}
          >
            {i + 1}
          </div>,
        );
      }
    } else {
      const currentPage = this.state.offset / this.state.limit;
      let left = currentPage - 2;
      let right = currentPage + 2;
      while (left < 0) {
        left += 1;
        right += 1;
      }
      while (right > lastPage) {
        left -= 1;
        right -= 1;
      }
      for (let i = left; i <= right; i += 1) {
        pages.push(
          <div
            className={this.getPageClass(i)}
            onClick={this.handlePageChange.bind(this, i)}
            key={i}
          >
            {i + 1}
          </div>,
        );
      }
      if (left > 1) {
        pages.unshift(<span>...</span>);
      }
      if (left > 0) {
        pages.unshift(
          <div onClick={this.handlePageChange.bind(this, 0)} key={0}>
            {1}
          </div>,
        );
      }
      if (right < lastPage - 1) {
        pages.push(<span>...</span>);
      }
      if (right < lastPage) {
        pages.push(
          <div
            onClick={this.handlePageChange.bind(this, lastPage)}
            key={lastPage}
          >
            {lastPage + 1}
          </div>,
        );
      }
    }
    return pages;
  }

  renderListParams() {
    if (this.props.pokemons.length !== 0) {
      return (
        <div className="pagination">
          <div className="info">
            <p>
              Results: {this.props.pokemons.length}. Current:{' '}
              {this.state.offset + 1}-
              {Math.min(
                this.state.offset + this.state.limit,
                this.props.pokemons.length,
              )}
              . Per page:{' '}
            </p>
            <select
              onChange={this.handleLimitChange}
              defaultValue="10"
              id="limit"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
          <div className="pages">{this.renderPages()}</div>
        </div>
      );
    }
    return [];
  }

  render() {
    return (
      <div>
        {this.renderListParams()}
        <div className="card-list">
          {this.currentPokemons().map(pokemon => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        <div className="pages">{this.renderPages()}</div>
      </div>
    );
  }
}

export default CardList;
