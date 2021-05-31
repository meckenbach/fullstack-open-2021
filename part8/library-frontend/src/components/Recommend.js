import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Recommend = ({ show, user }) => {
  const [loadBooks, { called, loading, data }] = useLazyQuery(BOOKS_BY_GENRE)

  useEffect(() => {
    if (!called && user) {
      loadBooks({ variables: { genre: user.favoriteGenre } })
    }
  }, [loadBooks, called, user])

  if (called && loading) return <div>Loading...</div>

  if (!show) return null

  const books = data.allBooks

  return (
    <div>
      <p>books in your favorite genre <b>{user.favoriteGenre}</b></p>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>author</td>
            <td>published</td>
          </tr>
        </thead>
        <tbody>
          {books
            .filter(book => book.genres.includes(user.favoriteGenre))
            .map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
