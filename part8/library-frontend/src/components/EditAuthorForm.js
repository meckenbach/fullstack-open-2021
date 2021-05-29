import React, { useState } from 'react'

const EditAuthorForm = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, born })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">name</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="born">born</label>
        <input id="born" type="number" value={born} onChange={(e) => setBorn(e.target.value)} />
      </div>
      <button>update author</button>
    </form>
  )
}

export default EditAuthorForm
