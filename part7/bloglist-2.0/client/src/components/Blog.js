import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { likeBlog, removeBlog } from '../reducers/blogsReducer'

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

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleRemove = (event) => {
    event.preventDefault()

    if (window.confirm(`remove blog "${blog.title}"?`)) {
      dispatch(removeBlog(blog.id))
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
