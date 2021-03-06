import { curry } from 'lodash/fp'
import usersService from '../services/users'

const initialState = {
  users: [],
  status: 'idle',
  error: ''
}

const reducer = (state = initialState, { type, users, error }) => {
  switch (type) {
  case 'GET_USERS_PENDING':
    return { ...state, staus: 'loading' }
  case 'GET_USERS_FULFILLED':
    return { ...state, status: 'success', users }
  case 'GET_USERS_REJCTED':
    return { ...state, status: 'failure', error }
  default:
    return state
  }
}

// actions
export const initializeUsers = () => async (dispatch) => {
  dispatch({
    type: 'GET_USERS_PENDING'
  })
  try {
    const users = await usersService.getAll()
    dispatch({
      type: 'GET_USERS_FULFILLED',
      users
    })
  } catch (error) {
    dispatch({
      type: 'GET_USERS_REJCTED',
      error: error.response.data.error
    })
  }
}

// selectors
export const selectAllUsers = state => state.users.users

export const selectUserById = curry((id, state) => state.users.users.find(user => user.id === id))

export const selectUsersStatus = state => state.users.status

export default reducer
