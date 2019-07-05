import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>username: <input {...username} reset={null}/></div>
        <div>password: <input {...password} reset={null} /></div>
        <div><button type="submit">login</button></div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}

export default LoginForm