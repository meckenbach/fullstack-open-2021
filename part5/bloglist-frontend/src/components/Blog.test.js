import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './blog'

test('only render title and author by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Foo Bar',
    url: 'None',
    likes: 10
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container.querySelector('.blog')).toHaveTextContent('Component testing is done with react-testing-library Foo Bar')
})