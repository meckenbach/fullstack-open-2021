import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const selectUser = (state) => state.user

const Navbar = () => {
  const dispatch = useDispatch()

  const loggedInUser = useSelector(selectUser)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <nav>
      <p>{loggedInUser.name} logged in<button onClick={handleLogout}>logout</button></p>
    </nav>
  )
}

export default Navbar
