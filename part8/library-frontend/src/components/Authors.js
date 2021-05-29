import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

import EditAuthorForm from './EditAuthorForm'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name,
      born
    }
  }
`

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
