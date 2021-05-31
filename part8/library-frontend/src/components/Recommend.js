import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const { loading: loadingAllBooks, data: dataAllBooks } = useQuery(ALL_BOOKS)
  const { loading: loadingMe, data: dataMe } = useQuery(ME)

  if (loadingAllBooks || loadingMe) return <div>Loading</div>

  if (!props.show) return null

  const { allBooks: books } = dataAllBooks
  const { me: user } = dataMe

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
