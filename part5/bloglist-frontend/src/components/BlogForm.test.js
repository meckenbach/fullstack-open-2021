import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('new blog form', () => {
  const handleAddBlog = jest.fn()

  const component = render(<BlogForm onAdd={handleAddBlog} />)

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'Test Blog' }
  })

  fireEvent.change(author, {
    target: { value: 'Test Author' }
  })

  fireEvent.change(url, {
    target: { value: 'Test Url' }
  })

  fireEvent.submit(form)

  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog.mock.calls[0][0].title).toBe('Test Blog')
  expect(handleAddBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(handleAddBlog.mock.calls[0][0].url).toBe('Test Url')
})