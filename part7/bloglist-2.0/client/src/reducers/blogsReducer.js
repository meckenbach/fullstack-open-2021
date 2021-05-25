import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const reducer =  (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs

  case 'ADD_BLOG':
    return [...state, action.blog]

  case 'LIKE_BLOG': {
    const id = action.id
    const blogToChange = state.find((blog) => blog.id === id)
    const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
    return state.map((blog) => blog.id === changedBlog.id ? changedBlog : blog)
  }

  case 'REMOVE_BLOG': {
    const id = action.id
    const blogToRemove = state.find((blog) => blog.id === id)
    return state.filter((blog) => blog.id !== blogToRemove.id)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const addBlog = ({ title, author, url }) => async (dispatch, getState) => {
  const {
    user: { token }
  } = getState()
  try {
    const blog = await blogService.create({ title, author, url }, token)
    dispatch({
      type: 'ADD_BLOG',
      blog
    })
    dispatch(setNotification(`added ${blog.title}`))
    setTimeout(() => dispatch(setNotification('')), 5000)
  } catch (error) {
    console.log(error)
    dispatch(setNotification(error.response.data.error, 'error'))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }
}

export const likeBlog = ({ id, likes }) => async (dispatch, getState) => {
  const {
    user: { token }
  } = getState()
  try {
    await blogService.update(id, { likes: likes + 1 }, token)
    dispatch({
      type: 'LIKE_BLOG',
      id
    })
  } catch (error) {
    dispatch(setNotification(error.response.data.error, 'error'))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }
}

export const removeBlog = ({ id }) => async (dispatch, getState) => {
  const {
    user: { token }
  } = getState()
  try {
    await blogService.remove(id, token)
    dispatch({
      type: 'REMOVE_BLOG',
      id
    })
  } catch (error) {
    if (error.response.status === 404) {
      // Frontend out of sync with database. Remove from blogs to sync.
      dispatch({
        type: 'REMOVE_BLOG',
        id
      })
    } else {
      dispatch(setNotification('error: could not delete file', 'error'))
      setTimeout(() => dispatch(setNotification('')), 5000)
    }
  }
}

export default reducer
