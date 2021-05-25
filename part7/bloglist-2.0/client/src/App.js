import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

import jsonschema from 'jsonschema'
import userSchema from './userSchema.json'

import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

const selectBlogs = (state) => state.blogs
const selectUser = (state) => state.user

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(selectBlogs)
  const user = useSelector(selectUser)

  const blogFormRef = useRef()

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    dispatch(initializeBlogs(blogs))
  }

  useEffect(() => fetchBlogs(), [])

  useEffect(() => {
    try {
      const userJson = localStorage.getItem('user')
      if (userJson !== null) {
        const user = JSON.parse(userJson)
        jsonschema.validate(user, userSchema, { throwError: true, allowUnknownAttributes: false })
        dispatch(setUser(user))
      }
    } catch (err) {
      console.error(err.message)
      localStorage.clear()
      dispatch(setUser(null))
    }
  }, [])

  const handleLogout = event => {
    event.preventDefault()
    dispatch(setUser(null))
    localStorage.clear()
  }

  if (user === null) return <LoginForm />

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm onAdd={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
      {blogs
        .sort(byLikesDescending)
        .map(blog => <Blog key={blog.id} blog={blog} />)
      }
    </div>
  )
}

const byLikesDescending = ({ likes: a }, { likes: b }) => b - a

export default App
