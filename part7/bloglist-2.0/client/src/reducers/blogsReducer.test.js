import deepFreeze from 'deep-freeze'
import blogReducer, { addBlog, initializeBlogs } from './blogsReducer'

const newBlog = {
  title: 'A Title',
  author: 'An Author',
  url: 'An URL',
  likes: 0
}

test('should add a blog', () => {
  const state = []

  const action = {
    type: 'ADD_BLOG',
    blog: newBlog
  }

  deepFreeze(state)
  const newState = blogReducer(state, action)

  expect(newState).toContainEqual(newBlog)
})

test('should initialize bloglist', () => {
  const state = []

  const initialBlogs = [
    newBlog,
    {
      title: 'Second Blog',
      author: 'Another Author',
      url: 'Another URL',
      likes: 1
    },
  ]

  const action = {
    type: 'INIT_BLOGS',
    blogs: initialBlogs
  }

  deepFreeze(state)
  const newState = blogReducer(state, action)

  expect(newState).toHaveLength(2)
  expect(newState).toEqual(initialBlogs)
})

describe('action creators', () => {
  test('addBlog should return ADD action', () => {
    const action = {
      type: 'ADD_BLOG',
      blog: newBlog
    }

    expect(addBlog(newBlog)).toEqual(action)
  })

  test('initializeBlogs should return INIT action', () => {
    const action = {
      type: 'INIT_BLOGS',
      blogs: [newBlog, newBlog]
    }

    const returnedAction = initializeBlogs([newBlog, newBlog])
    expect(returnedAction).toEqual(action)
  })
})
