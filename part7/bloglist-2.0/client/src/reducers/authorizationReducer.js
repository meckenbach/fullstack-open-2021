import jsonschema from 'jsonschema'
import userSchema from '../userSchema.json'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const initialState = {
  user: null,
  status: 'idle',
  error: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_AUTHORIZATION_PENDING':
    return { ...state, status: 'loading' }
  case 'SET_AUTHORIZATION_FULFILLED':
    return { ...state, status: 'success', user: action.user }
  case 'SET_AUTHORIZATION_REJECTED':
    return { ...state, status: 'failure', error: action.error }
  default:
    return state
  }
}

export const login = ({ username, password }) => async (dispatch) => {
  dispatch({
    type: 'SET_AUTHORIZATION_PENDING'
  })
  try {
    const user = await loginService.login({ username, password })
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({
      type: 'SET_AUTHORIZATION_FULFILLED',
      user
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'SET_AUTHORIZATION_REJECTED',
      error: error.response.data.error
    })
    dispatch(
      setNotification(error.response.data.error, 'error')
    )
    setTimeout(() => dispatch(setNotification('')), 5000)
  }
}

export const logout = () => {
  localStorage.clear()
  return {
    type: 'SET_AUTHORIZATION_FULFILLED',
    user: null
  }
}

export const authorizeFromLocalStorage = () => (dispatch) => {
  dispatch({
    type: 'SET_AUTHORIZATION_PENDING'
  })
  try {
    const userJson = localStorage.getItem('user')

    const user = JSON.parse(userJson)
    jsonschema.validate(user, userSchema, { throwError: true, allowUnknownAttributes: false })
    dispatch({
      type: 'SET_AUTHORIZATION_FULFILLED',
      user
    })

  } catch (error) {
    dispatch({
      type: 'SET_AUTHORIZATION_ERROR',
      error: error.message
    })
  }
}

export const selectAuthorizedUser = (state) => state.authorization.user

export const selectAuthorizationStatus = (state) => state.authorization.status

export default reducer
