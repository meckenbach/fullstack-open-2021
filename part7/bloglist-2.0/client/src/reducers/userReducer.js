import loginService from '../services/login'
import { setNotification } from './notificationReducer'

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

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const user = await loginService.login({ username, password })
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({
      type: 'SET_USER',
      user
    })
  } catch (error) {
    dispatch(
      setNotification(error.response.data.error, 'error')
    )
    setTimeout(() => dispatch(setNotification('')), 5000)
  }
}


export const logoutUser = () => {
  localStorage.clear()
  return {
    type: 'SET_USER',
    user: null
  }
}

export default reducer
