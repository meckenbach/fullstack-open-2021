import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import jsonschema from 'jsonschema'
import userSchema from './userSchema.json'

import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

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
      dispatch(setNotification(err.response.data.error, 'error'))
      setTimeout(() => dispatch(setNotification('')), 5000)
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

      blogFormRef.current.toggleVisibility()

      dispatch(setNotification(`added ${blog.title}`))
      setTimeout(() => dispatch(setNotification('')), 5000)
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 'error'))
      setTimeout(() => dispatch(setNotification('')), 5000)
    }
  }

  const handleLikeBlog = async (blogId, newLikes) => {
    try {
      const updatedBlog = await blogService.update(blogId, { likes: newLikes }, user.token)
      setBlogs(blogs.map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog))
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 'error'))
      setTimeout(() => dispatch(setNotification('')), 5000)
    }
  }

  const handleRemoveBlog = async ({ id: blogId, title }) => {
    if (!window.confirm(`remove blog "${title}"?`)) return
    try {
      await blogService.remove(blogId, user.token)
      setBlogs(blogs.filter((blog) => blog.id !== blogId))
    } catch (err) {
      if (err.response.status === 404) {
        // Frontend out of sync with database. Remove from blogs to sync.
        setBlogs(blogs.filter((blog) => blog.id !== blogId))
      } else {
        dispatch(setNotification('error: could not delete file', 'error'))
        setTimeout(() => dispatch(setNotification('')), 5000)
      }
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
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm onAdd={handleAddBlog} />
        </Togglable>
        {
          blogs
            // sort by likes in descending order
            .sort((blog1, blog2) => -(blog1.likes - blog2.likes))
            .map(blog => {
              return <Blog
                key={blog.id}
                blog={blog}
                onLike={handleLikeBlog}
                onRemove={user.username === blog.user.username ? handleRemoveBlog : null}
              />
            })
        }
      </div>
    )
  }

  return (
    <div>
      <Notification />
      { user ? showBlogs() : loginForm() }
    </div>
  )
}

export default App