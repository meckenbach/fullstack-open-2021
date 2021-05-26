import { curry } from 'lodash/fp'
import { setNotification } from './notificationReducer'
import blogsService from '../services/blogs'

const initialState = {
  data: [],
  status: 'idle',
  error: null
}

const reducer =  (state = initialState, action) => {
  switch (action.type) {

  case 'GET_BLOGS_PENDING':
    return { ...state, status: 'loading' }
  case 'GET_BLOGS_FULFILLED':
    return { ...state, status: 'success', data: action.data }
  case 'GET_BLOGS_REJCTED':
    return { ...state, status: 'failure', error: action.error }

  case 'ADD_BLOG_PENDING':
    return { ...state, status: 'loading' }
  case 'ADD_BLOG_FULFILLED':
    return { ...state, status: 'success', data: [...state.data, action.data] }
  case 'ADD_BLOG_REJECTED':
    return { ...state, status: 'failure', error: action.error }

  case 'LIKE_BLOG_PENDING':
    return { ...state, status: 'loading' }
  case 'LIKE_BLOG_FULFILLED': {
    const [id, blogs] = [action.id, state.data]
    const blogToLike = blogs.find((blog) => blog.id === id)
    const likes = blogToLike.likes + 1
    const likedBlog = { ...blogToLike, likes }
    const newBlogs = blogs.map(blog => blog.id === likedBlog.id ? likedBlog : blog)
    return { ...state, status: 'success', data: newBlogs }
  }
  case 'LIKE_BLOG_REJECTED':
    return { ...state, status: 'failure', error: action.error }

  case 'REMOVE_BLOG_PENDING':
    return { ...state, status: 'loading' }
  case 'REMOVE_BLOG_FULFILLED': {
    const [id, blogs] = [action.id, state.data]
    const blogToRemove = blogs.find(blog => blog.id === id)
    const newBlogs = blogs.filter(blog => blog.id !== blogToRemove.id)
    return { ...state, status: 'success', data: newBlogs }
  }
  case 'REMOVE_BLOG_REJECTED':
    return { ...state, status: 'failure', error: action.error }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_BLOGS_PENDING'
    })
    try {
      const blogs = await blogsService.getAll()
      dispatch({
        type: 'GET_BLOGS_FULFILLED',
        data: blogs
      })
    } catch (error) {
      dispatch({
        type: 'GET_BLOGS_REJECTED',
        error: error.response.data.error
      })
    }
  }
}

export const addBlog = ({ title, author, url }) => async (dispatch, getState) => {
  dispatch({
    type: 'ADD_BLOG_PENDING'
  })

  const {
    user: { token }
  } = getState()

  try {
    const blog = await blogsService.create({ title, author, url }, token)
    dispatch({
      type: 'ADD_BLOG_FULFILLED',
      data: blog
    })
    dispatch(setNotification(`added ${blog.title}`))
    setTimeout(() => dispatch(setNotification('')), 5000)
  } catch (error) {
    dispatch({
      type: 'ADD_BLOG_REJECTED',
      error: error.response.data.error
    })
    dispatch(setNotification(error.response.data.error, 'error'))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }
}

export const likeBlog = ({ id, likes }) => async (dispatch, getState) => {
  dispatch({
    type: 'LIKE_BLOG_PENDING'
  })

  const {
    user: { token }
  } = getState()

  try {
    await blogsService.update(id, { likes: likes + 1 }, token)
    dispatch({
      type: 'LIKE_BLOG_FULFILLED',
      id
    })
  } catch (error) {
    dispatch({
      type: 'LIKE_BLOG_REJECTED',
      error: error.response.data.error
    })

    dispatch(setNotification(error.response.data.error, 'error'))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }
}

export const removeBlog = (id) => async (dispatch, getState) => {
  dispatch({
    type: 'REMOVE_BLOG_PENDING'
  })

  const {
    user: { token }
  } = getState()

  try {
    console.log(id)
    await blogsService.remove(id, token)
    dispatch({
      type: 'REMOVE_BLOG_FULFILLED',
      id
    })
  } catch (error) {
    if (error.response.status === 404) {
      // Frontend out of sync with database. Remove from blogs to sync.
      dispatch({
        type: 'REMOVE_BLOG_FULFILLED',
        id
      })
    } else {
      dispatch({
        type: 'REMOVE_BLOG_REJECTED',
        error: error.response.data.error
      })
      dispatch(setNotification('error: could not delete file', 'error'))
      setTimeout(() => dispatch(setNotification('')), 5000)
    }
  }
}

export const selectAllBlogs = (state) => state.blogs.data

export const selectBlogById = curry((id, state) => state.blogs.data.find(blog => blog.id === id))

export const selectBlogsStatus = (state) => state.blogs.status

export default reducer
