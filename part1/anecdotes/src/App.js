import React, { useState } from 'react'

// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(getRandomInt(0, anecdotes.length))

  function handleClickNext () {
    setSelected(getRandomInt(0, anecdotes.length))
  }

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  function handleClickVotes () {
    if ((votes[selected] += 1) > votes[mostVotes]) {
      setMostVotes(selected)
    }
    setVotes([...votes])
  }

 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes.</p>
      <div>
        <button onClick={handleClickVotes}>vote</button>
        <button onClick={handleClickNext}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {votes[mostVotes]} votes.</p>
    </div>
  )
}

export default App
