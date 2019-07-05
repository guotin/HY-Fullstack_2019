import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

const user = {
  username: 'test',
  name: 'test'
}

const blog = {
  title: "new blog title",
  author: "blog author",
  url: "www.com",
  likes: 3,
  user: user
}

test('only title and author are shown before click', () => {

  const component = render(
    <Blog blog={blog} currentUser={user} />
  )

  const defaultInfo = component.container.querySelector('.defaultInfo')
  expect(defaultInfo).toHaveTextContent('new blog title blog author')

  const fullInfo = component.container.querySelector('.fullInfo')
  expect(fullInfo).toHaveStyle('display: none')

})

test('clicking blog expands it to show all information', () => {
  const component = render(
    <Blog blog={blog} currentUser={user} />
  )

  const button = component.container.querySelector('.defaultInfo')
  const fullInfo = component.container.querySelector('.fullInfo')

  expect(fullInfo).toHaveStyle('display: none')
  fireEvent.click(button)
  expect(fullInfo).toHaveStyle('display: ')

})