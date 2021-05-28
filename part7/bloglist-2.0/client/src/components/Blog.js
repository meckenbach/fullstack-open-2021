import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAuthorizedUser } from '../reducers/authorizationReducer'
import TextLink from './styled/TextLink'
import Button from './styled/Button'


import { likeBlog, removeBlog, addBlogComment, selectBlogById } from '../reducers/blogsReducer'

const Blog = () => {
  const { blogId } = useParams()
  const blog = useSelector(selectBlogById(blogId))
  const authorizedUser = useSelector(selectAuthorizedUser)

  const dispatch = useDispatch()

  if (!blog) return <div>Blog not found.</div>

  const isAuthorized = authorizedUser.username === blog.user.username

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

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(addBlogComment(blog.id, event.target.comment.value))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p><TextLink to={blog.url}>{blog.url}</TextLink></p>
      <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
      <div>added by {blog.user.name}</div>
      {isAuthorized ? <Button onClick={handleRemove}>remove</Button> : null}
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input type="text" name="comment" />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
      </ul>
    </div>
  )
}

export default Blog
