import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Navbar from './components/Navbar'
import PrivateRoute from  './components/PrivateRoute'

import jsonschema from 'jsonschema'
import userSchema from './userSchema.json'

import { initializeBlogs, selectBlogsStatus } from './reducers/blogsReducer'
import { initializeUsers, selectUsersStatus } from './reducers/usersReducer'

import { setUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const authorizedUser = useSelector((state) => state.user)

  const blogsStatus = useSelector(selectBlogsStatus)
  const usersStatus = useSelector(selectUsersStatus)

  const blogFormRef = useRef()

  useEffect(() => {
    if (blogsStatus === 'idle') dispatch(initializeBlogs())
    if (usersStatus === 'idle') dispatch(initializeUsers())
  }, [blogsStatus, usersStatus, dispatch])

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

  return (
    <Router>
      <Notification />
      {authorizedUser
        ? (
          <div>
            <h2>blogs</h2>
            <Navbar />
          </div>
        )
        : null}
      <Switch>
        <Route path="/login">
          {authorizedUser ? <Redirect to="/" /> : <LoginForm />}
        </Route>
        <PrivateRoute exact path="/">
          <Redirect to="/blogs" />
        </PrivateRoute>
        <PrivateRoute exact path="/blogs">
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm onAdd={() => blogFormRef.current.toggleVisibility()} />
          </Togglable>
          <Blogs />
        </PrivateRoute>
        <PrivateRoute path="/blogs/:blogId">
          <Blog />
        </PrivateRoute>
        <PrivateRoute exact path="/users">
          <Users />
        </PrivateRoute>
        <PrivateRoute path="/users/:id">
          <User />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App
