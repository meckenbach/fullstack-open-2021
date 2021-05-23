import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.content.value

    const anecdote = await anecdoteService.createNew({ content, votes: 0 })

    dispatch(createAnecdote(anecdote))

    dispatch(setNotification(`you created '${anecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
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

export default AnecdoteForm