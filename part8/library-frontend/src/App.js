
import React, { useState, useEffect, useCallback } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useQuery } from '@apollo/client'
import { ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const handleSuccess = useCallback(token => {
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

  const { loading, data } = useQuery(ME)

  useEffect(() => {
    if (data) setUser(data.me)
  }, [data])

  if (loading) return <div>Loading...</div>

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
        user={user}
      />

      <Recommend
        show={page === 'recommend'}
        user={user}
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
