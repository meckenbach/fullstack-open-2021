import { combineReducers } from 'redux'
import blogsReducer from './blogsReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  user: userReducer
})

export default reducer
