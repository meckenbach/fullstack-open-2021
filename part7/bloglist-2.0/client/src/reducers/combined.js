import { combineReducers } from 'redux'
import blogsReducer from './blogsReducer'
import notificationReducer from './notificationReducer'
import authorizationReducer from './authorizationReducer'
import usersReducer from './usersReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  authorization: authorizationReducer,
  users: usersReducer
})

export default reducer
