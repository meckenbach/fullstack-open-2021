import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes
        .sort((a1, a2) => -(a1.votes - a2.votes))
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
              <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}


export default AnecdoteList