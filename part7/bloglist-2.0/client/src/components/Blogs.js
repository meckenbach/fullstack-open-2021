import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllBlogs } from '../reducers/blogsReducer'

const Blogs = () => {
  const blogs = useSelector(selectAllBlogs)

  return (
    <>
      {blogs
        .sort(byLikesDescending)
        .map(blog => <div key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)
      }
    </>
  )
}

const byLikesDescending = ({ likes: a }, { likes: b }) => b - a

export default Blogs
