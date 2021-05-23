const reducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION': {
    return action.message
  }
  default:
    return state
  }
}

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
    setTimeout(() => dispatch(clearNotification()), seconds * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    message: ''
  }
}

export default reducer