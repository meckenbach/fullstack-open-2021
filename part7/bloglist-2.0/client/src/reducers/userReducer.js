export const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export const logoutUser = () => {
  localStorage.clear()
  return {
    type: 'LOGOUT_USER'
  }
}

export default reducer
