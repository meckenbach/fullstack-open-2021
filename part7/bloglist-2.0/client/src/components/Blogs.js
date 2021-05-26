import React from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <>
      {blogs
        .sort(byLikesDescending)
        .map(blog => <Blog key={blog.id} blog={blog} />)
      }
    </>
  )
}

const byLikesDescending = ({ likes: a }, { likes: b }) => b - a

export default Blogs
