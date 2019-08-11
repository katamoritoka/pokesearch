/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import '../styles/css/CardList.css'
import Card from './Card'

export default function CardList (props) {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)

  function currentPokemons () {
    const { pokemons } = props
    const current = pokemons.slice(
      offset,
      Math.min(offset + limit, pokemons.length)
    )
    return current
  }

  function handlePageChange (number) {
    setOffset(number * limit)
  }

  function getPageClass (pageNumber) {
    const currentPage = offset / limit
    if (pageNumber === currentPage) {
      return 'current'
    } else {
      return ''
    }
  }

  function renderPages () {
    const { pokemons } = props
    const pages = []
    const lastPage = Math.ceil(pokemons.length / limit) - 1
    if (lastPage < 9) {
      for (let i = 0; i <= lastPage; i += 1) {
        pages.push(
          <div
            className={getPageClass(i)}
            onClick={handlePageChange.bind(this, i)}
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
            className={getPageClass(i)}
            onClick={handlePageChange.bind(this, i)}
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
          <div onClick={handlePageChange.bind(this, 0)} key={0}>
            {1}
          </div>
        )
      }
      if (right < lastPage - 1) {
        pages.push(<span key={right + 1}>...</span>)
      }
      if (right < lastPage) {
        pages.push(
          <div onClick={handlePageChange.bind(this, lastPage)} key={lastPage}>
            {lastPage + 1}
          </div>
        )
      }
    }
    return pages
  }

  function handleLimitChange (event) {
    setLimit(+event.target.value)
    setOffset(0)
  }

  function renderListParams () {
    const { pokemons } = props
    if (pokemons.length !== 0) {
      return (
        <div className="pagination">
          <div className="info">
            <p>
              Results: {pokemons.length}. Current: {offset + 1}-
              {Math.min(offset + limit, pokemons.length)}. Per page:{' '}
            </p>
            <select onChange={handleLimitChange} defaultValue="10" id="limit">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
          <div className="pages">{renderPages()}</div>
        </div>
      )
    }
    return []
  }

  const { loadingFlag } = props
  if (loadingFlag) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    )
  } else {
    return (
      <div>
        {renderListParams()}
        <div className="card-list">
          {currentPokemons().map(pokemon => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        <div className="pages">{renderPages()}</div>
      </div>
    )
  }
}
