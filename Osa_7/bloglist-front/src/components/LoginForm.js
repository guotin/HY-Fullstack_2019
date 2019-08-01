import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import styled from 'styled-components'

const LoginForm = (props) => {

  const username = useField('text')
  const password = useField('text')

  const Button = styled.button`
    background: #f505b5;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #1cfa07;
    border-radius: 3px;
  `

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      props.setUser(user)
      props.setNotification('logged in succesfully', 5)
      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification('login failed, try again', 5)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>username: <input {...username} reset={null} /></div>
        <div>password: <input {...password} reset={null} /></div>
        <div><Button type="submit">login</Button></div>
      </form>
    </div>
  )
}

export default connect(null, { setUser, setNotification })(LoginForm)