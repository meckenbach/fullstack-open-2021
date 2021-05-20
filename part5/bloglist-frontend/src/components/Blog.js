import React, { useState } from 'react'


const Blog = ({ blog, onLike, onRemove }) => {
  const [viewDetailed, setViewDetailed] = useState(false)

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

    onLike(blog.id, blog.likes + 1)
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

export default Blog