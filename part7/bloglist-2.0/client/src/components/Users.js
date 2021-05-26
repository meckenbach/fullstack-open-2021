import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllUsers, selectUsersStatus } from '../reducers/usersReducer'

const Users = () => {
  const users = useSelector(selectAllUsers)
  const usersStatus =  useSelector(selectUsersStatus)

  if (usersStatus === 'loading') return <div>Loading...</div>

  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td>blogs created</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
