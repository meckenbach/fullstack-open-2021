import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('Vote', () => {
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
    expect(newState).toContainEqual({ ...anecdote, votes: 1 })
  })
})