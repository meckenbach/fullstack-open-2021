import React, { useState } from 'react'

const EditAuthorForm = ({ authors, onSubmit }) => {
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
        <select id="name" value={name} onChange={(e) => setName(e.target.value)}>
          {authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
        </select>
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
