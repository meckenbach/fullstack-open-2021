import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const NavBar = ({ children }) => {
  return (
    <nav>
      <List>
        {React.Children.map(children, (child) => <ListElement>{child}</ListElement>)}
      </List>
    </nav>
  )
}

const List = styled.ul`
  list-style-type: none;
  overflow: hidden;
  margin: 0;
  padding: 0;
`

NavBar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
}

const ListElement = styled.li`
  float: left;
`

export default NavBar
