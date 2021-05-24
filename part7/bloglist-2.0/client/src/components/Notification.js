import React from 'react'
import { useSelector } from 'react-redux'

const selectNotification = (state) => state

const Notification = () => {
  const notification = useSelector(selectNotification)

  const success = {
    color: 'green'
  }

  const error = {
    color: 'red'
  }

  return (
    <div style={notification.type === 'success' ? success : error }>
      {notification.text}
    </div>
  )
}

export default Notification