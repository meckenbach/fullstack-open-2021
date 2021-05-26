import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
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
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li style={{ display: 'inline-block', paddingRight: 5 }}><NavLink activeStyle={{ fontWeight: 'bold' }} to="/blogs">blogs</NavLink></li>
        <li style={{ display: 'inline-block', paddingRight: 5 }}><NavLink activeStyle={{ fontWeight: 'bold' }} to="/users">users</NavLink></li>
      </ul>
      <p>{loggedInUser.name} logged in<button onClick={handleLogout}>logout</button></p>
    </nav>
  )
}

export default Navbar
