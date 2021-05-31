
import React, { useState, useEffect, useCallback } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)

  const handleSuccess = useCallback((token) => {
    localStorage.setItem('library-user-token', token)
    setToken(token)
    setError(null)
    setPage('authors')
  }, [])

  const handleError = (errorMessage) => {
    setError(errorMessage)
  }

  const handleLogout = () => {
    localStorage.clear()
    setToken(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) setToken(token)
  }, [])

  return (
    <div>
      <div style={{ color: 'red ' }}>{error}</div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ? (
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={handleLogout}>logout</button>
            </>
          )
          : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend
        show={page === 'recommend'}
      />

      <Login
        show={page === 'login'}
        onSuccess={handleSuccess}
        onError={handleError}
      />

    </div>
  )
}

export default App
