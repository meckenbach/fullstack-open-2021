const reducer =  (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  case 'ADD_BLOG':
    return [...state, action.blog]
  case 'LIKE_BLOG': {
    const id = action.id
    const blogToChange = state.find((blog) => id === blog.id)
    const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
    return state.map((blog) => blog.id === changedBlog.id ? changedBlog : blog)
  }
  default:
    return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    blogs
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    blog
  }
}

export const likeBlog = (id) => {
  return {
    type: 'LIKE_BLOG',
    id
  }
}

export default reducer
