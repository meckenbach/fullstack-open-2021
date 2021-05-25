import deepFreeze from 'deep-freeze'
import blogsReducer from './blogsReducer'

const newBlog = {
  title: 'A Title',
  author: 'An Author',
  url: 'An URL',
  likes: 0,
  id: 3
}

const initialBlogs = [
  {
    title: 'Title',
    author: 'Foo Bar',
    url: 'none',
    likes: 10,
    id: 1
  },
  {
    title: 'Title',
    author: 'Alyssa P. Hacker',
    url: 'none',
    likes: 2,
    id: 2
  },
]

describe('blogsReducer', () => {
  test('should initialize the state with action INIT_BLOGS', () => {
    const state = []

    const action = {
      type: 'INIT_BLOGS',
      blogs: initialBlogs
    }

    deepFreeze(state)
    const newState = blogsReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toEqual(initialBlogs)
  })

  test('should return new state with blog added with action ADD_BLOG', () => {
    const state = []

    const action = {
      type: 'ADD_BLOG',
      blog: newBlog
    }

    deepFreeze(state)
    const newState = blogsReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(newBlog)
  })

  test('should add 1 to "likes" property of a specific blog with action LIKE_BLOG', () => {
    const state =  [newBlog]

    const action = {
      type: 'LIKE_BLOG',
      id: newBlog.id
    }

    deepFreeze(state)
    const newState = blogsReducer(state, action)

    expect(newState).toContainEqual({ ...newBlog, likes: 1 })
  })

  test('should remove a specific blog with action REMOVE_BLOG', () => {
    const state = [ ...initialBlogs, newBlog ]

    const action = {
      type: 'REMOVE_BLOG',
      id: newBlog.id
    }

    deepFreeze(state)
    const newState = blogsReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).not.toContainEqual(newBlog)
  })
})
