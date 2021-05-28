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
import PrivateRoute from  './components/PrivateRoute'
import Page from './components/styled/Page'
import Main from './components/styled/Main'
import Header from './components/styled/Header'

import { initializeBlogs, selectBlogsStatus } from './reducers/blogsReducer'
import { initializeUsers, selectUsersStatus } from './reducers/usersReducer'

import { authorizeFromLocalStorage, selectAuthorizedUser, selectAuthorizationStatus } from './reducers/authorizationReducer'

const App = () => {
  const dispatch = useDispatch()
  const authorizedUser = useSelector(selectAuthorizedUser)
  const authorizationStatus = useSelector(selectAuthorizationStatus)

  const blogsStatus = useSelector(selectBlogsStatus)
  const usersStatus = useSelector(selectUsersStatus)

  const blogFormRef = useRef()

  useEffect(() => {
    if (blogsStatus === 'idle') dispatch(initializeBlogs())
    if (usersStatus === 'idle') dispatch(initializeUsers())
  }, [blogsStatus, usersStatus, dispatch])

  useEffect(() => {
    if (authorizationStatus === 'idle') dispatch(authorizeFromLocalStorage())
  }, [])

  return (
    <Router>
      <Notification />
      <Switch>
        <Route path="/login">
          {authorizedUser
            ? <Redirect to="/" />
            : (
              <Page>
                <Main>
                  <LoginForm />
                </Main>
              </Page>)
          }
        </Route>
        <PrivateRoute exact path="/">
          <Redirect to="/blogs" />
        </PrivateRoute>
        <PrivateRoute exact path="/blogs">
          <Page>
            <Header />
            <Main>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm onAdd={() => blogFormRef.current.toggleVisibility()} />
              </Togglable>
              <Blogs />
            </Main>
          </Page>
        </PrivateRoute>
        <PrivateRoute path="/blogs/:blogId">
          <Header />
          <Main>
            <Blog />
          </Main>
        </PrivateRoute>
        <PrivateRoute exact path="/users">
          <Header />
          <Main>
            <Users />
          </Main>
        </PrivateRoute>
        <PrivateRoute path="/users/:id">
          <Header />
          <Main>
            <User />
          </Main>
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App
