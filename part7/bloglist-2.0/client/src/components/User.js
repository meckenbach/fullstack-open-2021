import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUsersStatus, selectUserById } from '../reducers/usersReducer'

const User = () => {
  const { id } = useParams()
  const user = useSelector(selectUserById(id))
  const usersStatus = useSelector(selectUsersStatus)

  if (usersStatus === 'pending' || usersStatus === 'loading') return <div>Loading...</div>

  if (!user) return <div>User not found.</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User
