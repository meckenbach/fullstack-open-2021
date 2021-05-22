import notificationReducer from './notificationReducer'

describe('Notification', () => {
  test('SET_NOTIFICATION should set a string', () => {
    const state = ''

    const action = {
      type: 'SET_NOTIFICATION',
      message: 'Hello, World!'
    }

    const newState = notificationReducer(state, action)

    expect(newState).toBe('Hello, World!')
  })
})