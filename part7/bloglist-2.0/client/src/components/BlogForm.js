import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { addBlog } from '../reducers/blogsReducer'
import TextField from './styled/TextField'
import Form from './styled/Form'
import Button from './styled/Button'

const BlogForm = ({ onAdd }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()

    if (typeof onAdd === 'function') onAdd()

    dispatch(addBlog({ title, author, url }))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Form legend="create new" onSubmit={handleAddBlog}>
        <TextField label="title" onChange={(event) => setTitle(event.target.value)} value={title} required />
        <TextField label="author" onChange={(event) => setAuthor(event.target.value)} value={author} required />
        <TextField label="url" onChange={(event) => setUrl(event.target.value)} value={url} required />
        <Button primary>create</Button>
        <Button type="button" onClick={onAdd}>cancel</Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  onAdd: PropTypes.func
}

export default BlogForm
