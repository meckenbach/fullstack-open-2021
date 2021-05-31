import React, { useState } from 'react'
import { useMutation, } from '@apollo/client'

import { ADD_BOOK, ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

const NewBook = ({ show, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const updateCache = (store, response) => {
    const { addBook: book } = response.data
    const dataInStore = store.readQuery({ query: ALL_BOOKS })
    store.writeQuery({
      query: ALL_BOOKS,
      data: {
        ...dataInStore,
        allBooks: [...dataInStore.allBooks, book]
      }
    })
    if (book.genres.includes(user?.favoriteGenre)) {
      const query = {
        query: BOOKS_BY_GENRE,
        variables: { genre: user.favoriteGenre }
      }
      const dataInStore = store.readQuery(query)
      query.data = { ...dataInStore, allBooks: [...dataInStore.allBooks, book] }
      store.writeQuery(query)
    }
  }

  const [createBook] = useMutation(ADD_BOOK, { update: updateCache })

  if (!show) return null

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published: Number(published), genres } })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
