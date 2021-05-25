import deepFreeze from 'deep-freeze'
import blogsReducer, { addBlog, initializeBlogs, likeBlog } from './blogsReducer'

const newBlog = {
  title: 'A Title',
  author: 'An Author',
  url: 'An URL',
  likes: 0,
  id: 1
}

describe('blogsReducer', () => {
  test('should initialize the state with action INIT_BLOGS', () => {
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
})

describe('action creators', () => {
  test('initializeBlogs should return action INIT_BLOGS', () => {
    const action = {
      type: 'INIT_BLOGS',
      blogs: [newBlog, newBlog]
    }

    const returnedAction = initializeBlogs([newBlog, newBlog])
    expect(returnedAction).toEqual(action)
  })

  test('addBlog should return action ADD_BLOG', () => {
    const action = {
      type: 'ADD_BLOG',
      blog: newBlog
    }

    expect(addBlog(newBlog)).toEqual(action)
  })

  test('likeBlog should return action LIKE_BLOG', () => {
    const action = {
      type: 'LIKE_BLOG',
      id: 1
    }

    expect(likeBlog(1)).toEqual(action)
  })
})
