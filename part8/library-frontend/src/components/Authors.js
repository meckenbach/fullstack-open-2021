import React from 'react'
import { useQuery, useMutation } from '@apollo/client'

import EditAuthorForm from './EditAuthorForm'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [setBirthyear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const { loading, data } = useQuery(ALL_AUTHORS)
  if (loading) return <div>Loading...</div>

  if (!props.show) {
    return null
  }

  const authors = data.allAuthors

  const submit = ({ name, born }) => {
    setBirthyear({ variables: { name, born: Number(born) } })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <EditAuthorForm authors={authors} onSubmit={submit} />
    </div>
  )
}

export default Authors
