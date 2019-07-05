import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

const blog = {
  title: "new blog title",
  author: "blog author",
  likes: 3
}

test('everything is rendered', () => {
  

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const info = component.container.querySelector('.info')
  expect(info).toHaveTextContent('new blog title blog author')

  const likes = component.container.querySelector('.likes')
  expect(likes).toHaveTextContent('blog has 3 likes')

})

test('event handler called twice when like is clicked twice', async () => {
  
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})