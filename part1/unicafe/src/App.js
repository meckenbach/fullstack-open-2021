import React, { useState } from 'react'

const Statistic = ({name, value}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  
  const average = (good - bad) / all
  const positive = good / all

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <Statistic name='Good' value={good} />
        <Statistic name='Neutral' value={neutral} />
        <Statistic name='Bad' value={bad} />
        <Statistic name='All' value={all} />
        <Statistic name='Average' value={average} />
        <Statistic name='Positive' value={positive} />
      </table>
      
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <button onClick={() => setGood(good+1)}>good</button>
        <button onClick={() => setNeutral(neutral+1)}>neutal</button>
        <button onClick={() => setBad(bad+1)}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App