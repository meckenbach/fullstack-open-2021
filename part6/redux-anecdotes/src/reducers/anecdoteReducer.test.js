import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('Anecdotes', () => {
  const anecdote = {
    content: 'If it hurts, do it more often',
    id: 1,
    votes: 0
  }

  const initialState = [ anecdote ]

  test('vote should increment votes', () => {
    const action = {
      type: 'VOTE',
      data: {
        id: 1
      }
    }

    const state = initialState

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    
    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual({ ...anecdote, votes: 1 })
  })

  test('create should a add a new anecdote', () => {
    const action = {
      type: 'CREATE',
      data: { id: 0, content: 'Test Anecdote', votes: 0 }
    }

    const state = []

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(expect.objectContaining({ content: 'Test Anecdote', votes: 0, id: 0 }))
  })

  test('INIT should initialize store with several anecdotes', () => {
    const action = {
      type: 'INIT',
      data: [{ id: 1, content: 'Test 1', votes: 0 }, { id: 2, content: 'Test 2', votes: 1 }]
    }

    const state = []
    
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(expect.objectContaining({ content: 'Test 1', votes: 0, id: 1 }))
    expect(newState).toContainEqual(expect.objectContaining({ content: 'Test 2', votes: 1, id: 2 }))
  })
})