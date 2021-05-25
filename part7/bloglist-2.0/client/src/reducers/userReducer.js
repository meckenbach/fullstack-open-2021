export const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
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

export default reducer
