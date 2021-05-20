import React, { useState } from 'react'


const Blog = ({ blog, onLike }) => {
  const [viewDetailed, setViewDetailed] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

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

    const newLikes = likes + 1
    setLikes(newLikes)
    onLike(blog.id, newLikes)
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>likes {likes} <button onClick={handleLike}>like</button></div>
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