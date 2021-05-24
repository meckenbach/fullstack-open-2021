import notificationReducer, { setNotification } from './notificationReducer'

describe('action SET', () => {
  test('should set notification text to "Some String"', () => {
    const action = {
      type: 'SET',
      notification: {
        text: 'Some String',
        type: 'error'
      }
    }

    const state = ''
    const newState = notificationReducer(state, action)

    expect(newState.text).toBe('Some String')
  })

  test('should set notificationo to empty string', () => {
    const action = {
      type: 'SET',
      notification: {
        text: '',
        type: 'error'
      }
    }

    const state = 'Some String'
    const newState = notificationReducer(state, action)

    expect(newState.text).toBe('')
  })
})


test('setNotification should return action', () => {
  const action = {
    type: 'SET',
    notification: {
      text: 'Some String',
      type: 'success'
    }
  }

  expect(setNotification('Some String')).toEqual(action)
})