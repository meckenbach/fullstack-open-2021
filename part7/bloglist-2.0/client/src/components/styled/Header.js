import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectAuthorizedUser } from '../../reducers/authorizationReducer'
import styled from 'styled-components'
import NavBar from '../NavBar'
import NavLink from './NavLink'
import Button from './Button'


const Header = () => {
  const dispatch = useDispatch()

  const authorizedUser = useSelector(selectAuthorizedUser)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <Wrapper>
      <h1>blogs app</h1>
      <NavBar>
        <NavLink to="/blogs">blogs</NavLink>
        <NavLink to="/users">users</NavLink>
      </NavBar>
      <div>
        <div>
          {authorizedUser?.name} logged in <Button onClick={handleLogout}>logout</Button>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  display: grid;
  grid-template-columns:
    1fr
    min(65ch, 100%)
    1fr;
  background-color: var(--metallic-seaweed);
  

  & > * {
    padding: 0;
    text-align: left;
    vertical-align: middle;
  }

  & > :nth-child(1) {
    grid-column: 1;
    margin-left: 1em;
    font-variant: small-caps;
  }

  & > :nth-child(2) {
    grid-column: 2;
    margin-left: 0;

  }

  & > :nth-child(3) {
    grid-column: 3;
    margin-right: 1em;
  }

  & :nth-child(3) > * {
    float: right;
  }
`

export default Header
