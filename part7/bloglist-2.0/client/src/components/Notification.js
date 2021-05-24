import React from 'react'
import PropTypes from 'prop-types'

const Notification = (props) => {
  const success = {
    color: 'green'
  }

  const error = {
    color: 'red'
  }

  return (
    <div style={props.type === 'success' ? success : error}>
      {props.children}
    </div>
  )
}

Notification.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string.isRequired
}

export default Notification