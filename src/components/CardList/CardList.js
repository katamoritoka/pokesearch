/* eslint-disable react/prop-types */
import React from 'react'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import './CardList.css'
import Card from '../Card/Card'

class CardList extends React.Component {
  constructor (props) {
    super(props)
    extendObservable(this, {
      offset: 0,
      limit: 10
    })
  }

  handleLimitChange = (event) => {
    this.limit = +event.target.value
    this.offset = 0
  }

  handlePageChange = (number) => {
    this.offset = number * this.limit
  }

  currentPokemons = () => {
    const { offset, limit } = this
    const pokemons = this.props.pokemons
    const current = pokemons.slice(
      offset,
      Math.min(offset + limit, pokemons.length)
    )
    return current
  }

  getPageClass = (pageNumber) => {
    const { offset, limit } = this
    const currentPage = offset / limit
    if (pageNumber === currentPage) {
      return 'current'
    } else {
      return ''
    }
  }

  renderPages = () => {
    const { offset, limit } = this
    const pokemons = this.props.pokemons
    const pages = []
    const lastPage = Math.ceil(pokemons.length / limit) - 1
    if (lastPage < 9) {
      for (let i = 0; i <= lastPage; i += 1) {
        pages.push(
          <div
            className={this.getPageClass(i)}
            onClick={this.handlePageChange.bind(this, i)}
            key={i}
          >
            {i + 1}
          </div>
        )
      }
    } else {
      const currentPage = offset / limit
      let left = currentPage - 2
      let right = currentPage + 2
      while (left < 0) {
        left += 1
        right += 1
      }
      while (right > lastPage) {
        left -= 1
        right -= 1
      }
      for (let i = left; i <= right; i += 1) {
        pages.push(
          <div
            className={this.getPageClass(i)}
            onClick={this.handlePageChange.bind(this, i)}
            key={i}
          >
            {i + 1}
          </div>
        )
      }
      if (left > 1) {
        pages.unshift(<span key={left - 1}>...</span>)
      }
      if (left > 0) {
        pages.unshift(
          <div onClick={this.handlePageChange.bind(this, 0)} key={0}>
            {1}
          </div>
        )
      }
      if (right < lastPage - 1) {
        pages.push(<span key={right + 1}>...</span>)
      }
      if (right < lastPage) {
        pages.push(
          <div
            onClick={this.handlePageChange.bind(this, lastPage)}
            key={lastPage}
          >
            {lastPage + 1}
          </div>
        )
      }
    }
    return pages
  }

  renderListParams = () => {
    const { offset, limit } = this
    const pokemons = this.props.pokemons
    if (pokemons.length !== 0) {
      return (
        <div className="pagination">
          <div className="info">
            <p>
              Results: {pokemons.length}. Current: {offset + 1}-
              {Math.min(offset + limit, pokemons.length)}. Per page:{' '}
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
      )
    }
    return []
  }

  render () {
    const { loadingFlag } = this.props
    if (loadingFlag) {
      return (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )
    } else {
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
      )
    }
  }
}

export default observer(CardList)
