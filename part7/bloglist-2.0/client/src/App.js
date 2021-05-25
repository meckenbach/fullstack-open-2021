import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import jsonschema from 'jsonschema'
import userSchema from './userSchema.json'

import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, logoutUser } from './reducers/userReducer'

const selectBlogs = (state) => state.blogs
const selectUser = (state) => state.user

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(selectBlogs)
  const user = useSelector(selectUser)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

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
      dispatch(logoutUser())
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  if (user === null) return (
    <div>
      <Notification />
      <LoginForm />
    </div>
  )

  return (
    <div>
      <Notification />
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
