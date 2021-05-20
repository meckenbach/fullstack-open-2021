import React from 'react'

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

export default Message