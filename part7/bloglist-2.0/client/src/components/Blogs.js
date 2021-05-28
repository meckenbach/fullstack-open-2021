import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllBlogs } from '../reducers/blogsReducer'
import TextLink from './styled/TextLink'

const Blogs = () => {
  const blogs = useSelector(selectAllBlogs)

  return (
    <div>
      <h2 style={{ marginBottom: '0.5em' }}>blogs</h2>
      <ul>
        {blogs
          .sort(byLikesDescending)
          .map(blog => <li key={blog.id}><TextLink to={`/blogs/${blog.id}`}>{blog.title}</TextLink></li>)
        }
      </ul>
    </div>
  )
}

const byLikesDescending = ({ likes: a }, { likes: b }) => b - a

export default Blogs
