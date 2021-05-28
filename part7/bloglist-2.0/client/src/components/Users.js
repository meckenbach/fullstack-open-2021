import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers, selectUsersStatus } from '../reducers/usersReducer'
import TextLink from './styled/TextLink'

const Users = () => {
  const users = useSelector(selectAllUsers)
  const usersStatus =  useSelector(selectUsersStatus)

  if (usersStatus === 'loading') return <div>Loading...</div>

  return (
    <table>
      <thead>
        <tr>
          <td>username</td>
          <td>blogs created</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td><TextLink to={`/users/${user.id}`}>{user.name}</TextLink></td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
