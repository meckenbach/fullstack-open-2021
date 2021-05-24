import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.content.value

    props.createAnecdote({ content })

    props.setNotification(`you created '${content}'`, 5)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="content" required /></div>
        <button>create</button>
      </form>
    </div>
  )
}

AnecdoteForm.propTypes = {
  createAnecdote: PropTypes.oneOfType([PropTypes.function, PropTypes.any]),
  setNotification: PropTypes.oneOfType([PropTypes.function, PropTypes.any])
}

const ConnectedAnecdoteForm= connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)

export default ConnectedAnecdoteForm