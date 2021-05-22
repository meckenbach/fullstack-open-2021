import filterReducer from './filterReducer'

describe('Filter', () => {
  test('SET_FILTER should set a string', () => {
    const state = ''

    const action = {
      type: 'SET_FILTER',
      filter: 'Hello, World!'
    }

    const newState = filterReducer(state, action)

    expect(newState).toBe('Hello, World!')
  })
})