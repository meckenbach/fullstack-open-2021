import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { likeBlog, removeBlog, selectBlogById } from '../reducers/blogsReducer'

const selectUser = (state) => state.user

const Blog = () => {
  const { blogId } = useParams()
  const blog = useSelector(selectBlogById(blogId))
  const user = useSelector(selectUser)

  const dispatch = useDispatch()

  if (!blog) return <div>Blog not found.</div>

  const isAuthorized = user.username === blog.user.username

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

  return (
    <div>
      <h2>{blog.title}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
      <div>added by {blog.user.name}</div>
      {isAuthorized ? <button onClick={handleRemove}>remove</button> : null}
      <h3>comments</h3>
      <ul>
        {blog.comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
      </ul>
    </div>
  )
}

export default Blog
