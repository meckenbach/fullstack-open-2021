import React, { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    onLogin({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input id="username" onChange={(event) => setUsername(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input id="password" onChange={(event) => setPassword(event.target.value)} required />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm