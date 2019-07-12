import React, { useState } from 'react'

const Books = (props) => {

  const [genre, setGenre] = useState('')
  const [genreMessage, setGenreMessage] = useState('books in all genres')

  if (!props.show) {
    return null
  }
  if (props.result.loading) {
    return <div>loading...</div>
  }
  
  const changeGenreFilter = (event) => {
    event.preventDefault()
    setGenre(event.target.value)
    setGenreMessage(event.target.value === '' ? 'books in all genres': `books in genre ${event.target.value}`)
  }

  const books = props.result.data.allBooks
  const genres = books
    .map(b => b.genres)
    .flat()
    .filter(g => g !== '')
    .reduce((uniq, item) => uniq.includes(item) ? uniq : [...uniq, item], [])

  let renderBooks = genre === '' ? books : books.filter(b => b.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>
      <h3>{genreMessage}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {renderBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g =>
        <button key={g} onClick={changeGenreFilter} value={g}>
          {g}
        </button>)}
      <button onClick={changeGenreFilter} value={''}>all genres</button>
    </div>
  )
}

export default Books