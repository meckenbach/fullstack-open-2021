const reducer =  (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  case 'ADD_BLOG':
    return [...state, action.blog]
  case 'LIKE_BLOG': {
    const id = action.id
    const blogToChange = state.find((blog) => blog.id === id)
    const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
    return state.map((blog) => blog.id === changedBlog.id ? changedBlog : blog)
  }
  case 'REMOVE_BLOG': {
    const id = action.id
    const blogToRemove = state.find((blog) => blog.id === id)
    return state.filter((blog) => blog.id !== blogToRemove.id)
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

export const removeBlog = (id)  => {
  return {
    type: 'REMOVE_BLOG',
    id
  }
}

export default reducer
