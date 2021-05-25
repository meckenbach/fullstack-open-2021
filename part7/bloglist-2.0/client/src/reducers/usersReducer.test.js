import usersReducer from './usersReducer'
import deepFreeze from 'deep-freeze'

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    token: '12345'
  },
  {
    username: 'mle',
    name: 'User MLE',
    token: '67890'
  },
]

describe('usersReducer', () => {
  test('should initialize state with action INIT_USERS', () => {
    const state = []

    const action = {
      type: 'INIT_USERS',
      users: initialUsers
    }

    deepFreeze(state)
    const newState = usersReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toEqual(initialUsers)
  })
})
