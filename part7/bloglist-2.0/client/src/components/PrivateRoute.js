/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import LoginForm from './LoginForm'

const PrivateRoute = ({ children, ...rest }) => {
  const authorizedUser = useSelector((state) => state.user)

  const handleRender = () => {
    return authorizedUser
      ? children
      : <LoginForm />
  }

  return (
    <Route {...rest} render={handleRender} />
  )
}

export default PrivateRoute
