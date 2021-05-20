import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './blog'

test('only renders title and author by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Foo Bar',
    url: 'None',
    likes: 10,
    user: {
      username: 'mle',
      name: 'Max E.'
    }
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container.querySelector('.blog')).toHaveTextContent('Component testing is done with react-testing-library Foo Bar')
})

test('renders url and number of likes when "view" button is clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Foo Bar',
    url: 'None',
    likes: 10,
    user: {
      username: 'mle',
      name: 'Max E.'
    }
  }

  const component = render(<Blog blog={blog} />)

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container.querySelector('.blog'))
    .toHaveTextContent('None')

  expect(component.container.querySelector('.blog'))
    .toHaveTextContent('likes 10')
})

test('if "like" button is clicked twice, event handler is called twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Foo Bar',
    url: 'None',
    likes: 10,
    user: {
      username: 'mle',
      name: 'Max E.'
    }
  }

  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} onLike={mockHandler} />)

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})