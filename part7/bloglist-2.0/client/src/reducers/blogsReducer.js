const reducer =  (state = [], action) => {
  switch (action.type) {
  case 'ADD_BLOG':
    return [...state, action.blog]
  case 'INIT_BLOGS':
    return action.blogs
  default:
    return state
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    blog
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    blogs
  }
}

export default reducer
