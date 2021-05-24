const reducer = (state = { text: '', type: 'success' }, action) => {
  switch (action.type) {
  case 'SET':
    return action.notification
  default:
    return state
  }
}

export const setNotification = (text, type = 'success') => {
  return {
    type: 'SET',
    notification: {
      text,
      type
    }
  }
}

export default reducer