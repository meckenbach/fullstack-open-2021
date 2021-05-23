import anecdoteService from '../services/anecdoteService'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'VOTE':{
    const { id } = action.data
    const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    return state.map((anecdote) => 
      anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote
    )
  }
    
  case 'CREATE': {
    return [...state, action.data]
  }

  case 'INIT': {
    return action.data
  }

  default:
    return state
  }

  
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = ({ content, votes = 0 }) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew({ content, votes})
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default reducer