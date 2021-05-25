import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const selectUser = (state) => state.user

const Blog = ({ blog }) => {
  const [viewDetailed, setViewDetailed] = useState(false)

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const isAuthorized = user.username === blog.user.username

  const blogStyle = {
    border: '1px solid black',
    padding: 5,
    borderWidth: 1,
    marginTop: 5
  }

  const toggleView = (event) => {
    event.preventDefault()
    setViewDetailed(!viewDetailed)
  }

  const handleLike = async (event) => {
    event.preventDefault()

    try {
      await blogService.update(blog.id, { likes: blog.likes + 1 }, user.token)
      dispatch(likeBlog(blog.id))
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 'error'))
      setTimeout(() => dispatch(setNotification('')), 5000)
    }
  }

  const handleRemove = async (event) => {
    event.preventDefault()

    if (!window.confirm(`remove blog "${blog.title}"?`)) return
    try {
      await blogService.remove(blog.id, user.token)
      dispatch(removeBlog(blog.id))
    } catch (err) {
      if (err.response.status === 404) {
        // Frontend out of sync with database. Remove from blogs to sync.
        dispatch(removeBlog(blog.id))
      } else {
        dispatch(setNotification('error: could not delete file', 'error'))
        setTimeout(() => dispatch(setNotification('')), 5000)
      }
    }
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
      <div>{blog.user.name}</div>
      {isAuthorized ? <button onClick={handleRemove}>remove</button> : null}
    </div>
  )

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleView}>{viewDetailed ? 'hide' : 'view'}</button>
      {viewDetailed ? details() : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func,
  onRemove: PropTypes.func
}

export default Blog
