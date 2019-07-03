    
import React from 'react'

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

export default LoginForm