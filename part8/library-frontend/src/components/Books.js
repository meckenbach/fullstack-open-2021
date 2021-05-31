import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const { loading, data } = useQuery(ALL_BOOKS)
  if (loading) return <div>Loading...</div>

  if (!props.show) {
    return null
  }

  const books = data.allBooks
  const genres = Array.from(new Set(books.flatMap(book => book.genres)))

  return (
    <div>
      <h2>books</h2>

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
          {books
            .filter(book => genre === 'all' ? book : book.genres.includes(genre))
            .map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
        </tbody>
      </table>
      <div>
        <>{genres.map(genre => <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>)}</>
        <button onClick={() => setGenre('all')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
