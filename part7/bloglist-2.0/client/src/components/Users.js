import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const selectUsers = (state) => state.users

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Users
