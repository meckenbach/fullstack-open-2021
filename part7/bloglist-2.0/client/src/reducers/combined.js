import { combineReducers } from 'redux'
import blogsReducer from './blogsReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  user: userReducer,
  users: usersReducer
})

export default reducer
