import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries'

const Login = ({ show, onSuccess, onError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      onSuccess(token)
    }
  }, [result.data, onSuccess])

  if (result.loading) return <div>Loading...</div>

  if (!show) return null

  const submit = async (e) => {
    e.preventDefault()
    try {
      await login({ variables: { username, password } })
    } catch (error) {
      onError(error.graphQLErrors[0].message)
    }
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="username">username</label>
        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
      </div>
      <button>login</button>
    </form>
  )
}

export default Login
