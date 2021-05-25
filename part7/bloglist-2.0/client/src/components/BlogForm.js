import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { addBlog } from '../reducers/blogsReducer'

const BlogForm = ({ onAdd }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()

    if (typeof onAdd === 'function') onAdd()

    dispatch(addBlog({ title, author, url }))

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
