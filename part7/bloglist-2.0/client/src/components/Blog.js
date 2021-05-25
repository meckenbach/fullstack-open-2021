import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

import { likeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const selectUser = (state) => state.user

const Blog = ({ blog, onRemove }) => {
  const [viewDetailed, setViewDetailed] = useState(false)

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

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

  const handleRemove = (event) => {
    event.preventDefault()

    onRemove(blog)
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
      <div>{blog.user.name}</div>
      {onRemove ? <button onClick={handleRemove}>remove</button> : null}
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
