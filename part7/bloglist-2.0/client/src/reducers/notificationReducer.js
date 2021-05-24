const reducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.data
  default:
    return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET',
    data: notification
  }
}

export default reducer