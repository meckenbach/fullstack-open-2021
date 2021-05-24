import notificationReducer, { setNotification } from './notificationReducer'

describe('action SET', () => {
  test('should set notification to "Some String"', () => {
    const action = {
      type: 'SET',
      data: 'Some String'
    }

    const state = ''
    const newState = notificationReducer(state, action)

    expect(newState).toBe('Some String')
  })

  test('should set notificationo to empty string', () => {
    const action = {
      type: 'SET',
      data: ''
    }

    const state = 'Some String'
    const newState = notificationReducer(state, action)

    expect(newState).toBe('')
  })
})


test('setNotification should return action', () => {
  const action = {
    type: 'SET',
    data: 'Some String'
  }

  expect(setNotification('Some String')).toEqual(action)
})