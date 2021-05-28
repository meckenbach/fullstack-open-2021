/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { selectAuthorizationStatus, selectAuthorizedUser } from '../reducers/authorizationReducer'

import LoginForm from './LoginForm'

const PrivateRoute = ({ children, ...rest }) => {
  const authorizedUser = useSelector(selectAuthorizedUser)
  const authorizationStatus = useSelector(selectAuthorizationStatus)

  if (authorizationStatus === 'idle' || authorizationStatus === 'loading') return null

  const handleRender = () => {
    return authorizedUser
      ? children
      : <Redirect to="/login" />
  }

  return (
    <Route {...rest} render={handleRender} />
  )
}

export default PrivateRoute
