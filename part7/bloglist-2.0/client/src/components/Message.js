import React from 'react'
import PropTypes from 'prop-types'

const Message = (props) => {
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

Message.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string.isRequired
}

export default Message