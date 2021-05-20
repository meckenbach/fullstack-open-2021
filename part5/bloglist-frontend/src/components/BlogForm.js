import React, { useState } from 'react'

const BlogForm = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()

    onAdd({ title, author, url })

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
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default BlogForm