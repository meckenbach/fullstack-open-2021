import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import jsonschema from 'jsonschema'
import userSchema from './userSchema.json'


const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => fetchBlogs(), [])

  useEffect(() => {
    try {
      const userJson = localStorage.getItem('user')
      if (userJson !== null) {
        const user = JSON.parse(userJson)
        jsonschema.validate(user, userSchema, { throwError: true, allowUnknownAttributes: false })
        setUser(user)
      }
    } catch (err) {
      console.error(err.message)
      localStorage.clear()
      setUser(null)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    } catch (err) {
      setErrorMessage(err.response.data.error)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    setUser(null)
    localStorage.clear()
  }

  const handleAddBlog = async ({ title, author, url }) => {
    try {
      const blog = await blogService.create({ title, author, url }, user.token)
      setBlogs([...blogs, blog])
      setSuccessMessage(`added ${blog.title}`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (err) {
      setErrorMessage(err.response.data.error)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const loginForm = () => {
    return <LoginForm onLogin={handleLogin} />
  }

  const showBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel="create new blog">
          <BlogForm onAdd={handleAddBlog} />
        </Togglable>
        {
          blogs.map(blog => <Blog key={blog.id} blog={blog} />)
        }
      </div>
    )
  }

  return (
    <div>
      { errorMessage ? <Message type="error">{errorMessage}</Message> : null }
      { successMessage ? <Message type="success">{successMessage}</Message> : null }
      { user ? showBlogs() : loginForm() }
    </div>
  )
}

export default App