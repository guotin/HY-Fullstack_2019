import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

const user = {
  username: 'testijäbä',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpasOkYsOkIiwiaWQiOiI1ZDFiM2YyZjNhMzJkMTAyYmU4Yzc3NzAiLCJpYXQiOjE1NjIzMjE1NTZ9.w7OZkPihCdFfZlYIhVDnPFq0XGQGuSboVkXdyX937Jw',
  name: 'juu'
}

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  test('if user is logged in, blogs are rendered', async () => {

    localStorage.setItem('loggedUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getAllByText('login')
    )

    localStorage.setItem('loggedUser', JSON.stringify(user))
    component.rerender(<App />)

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)

  })
})