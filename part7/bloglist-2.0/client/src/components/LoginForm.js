import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Form from './styled/Form'
import TextField from './styled/TextField'
import Button from './styled/Button'

import { login } from '../reducers/authorizationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(login({ username, password }))

    setUsername('')
    setPassword('')
  }

  return (
    <Form legend="login to application" onSubmit={handleLogin}>
      <TextField label="username" onChange={(event) => setUsername(event.target.value)} required />
      <TextField label="password" onChange={(event) => setPassword(event.target.value)} required />
      <Button type="submit">login</Button>
    </Form>
  )
}

export default LoginForm
