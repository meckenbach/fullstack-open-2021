import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button>like</button></div>
      <div>{blog.user.name}</div>
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleView}>{viewDetailed ? 'hide' : 'view'}</button>
      {viewDetailed ? details() : null}
    </div>
  )
}

export default Blog