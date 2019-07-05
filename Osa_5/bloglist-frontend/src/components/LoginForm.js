import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleLogin}>
        <div>username: <input value={props.username} onChange={({ target }) => props.setUsername(target.value)} /></div>
        <div>password: <input value={props.password} onChange={({ target }) => props.setPassword(target.value)}  /></div>
        <div><button type="submit">login</button></div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm