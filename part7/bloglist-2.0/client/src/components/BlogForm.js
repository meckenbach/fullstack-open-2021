import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { addBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const selectUser = (state) => state.user

const BlogForm = ({ onAdd }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()

    if (typeof onAdd === 'function') onAdd()

    blogService.create({ title, author, url }, user.token)
      .then((blog) => {
        dispatch(addBlog(blog))

        dispatch(setNotification(`added ${blog.title}`))
        setTimeout(() => dispatch(setNotification('')), 5000)
      })
      .catch((err) => {
        dispatch(setNotification(err.response.data.error, 'error'))
        setTimeout(() => dispatch(setNotification('')), 5000)
      })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input id="title" onChange={(event) => setTitle(event.target.value)} value={title} required />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input id="author" onChange={(event) => setAuthor(event.target.value)} value={author} required />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input id="url" onChange={(event) => setUrl(event.target.value)} value={url} required />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onAdd: PropTypes.func
}

export default BlogForm
