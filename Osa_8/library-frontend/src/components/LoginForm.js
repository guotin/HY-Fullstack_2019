import React, { useState } from 'react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const result = await props.login({
      variables: { username, password }
    })

    if (result) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>username: <input value={username} onChange={({ target }) => setUsername(target.value)}></input></div>
        <div>password: <input value={password} onChange={({ target }) => setPassword(target.value)}></input></div>
        <div><button type='submit'>login</button></div>
      </form>
    </div>
  )

}

export default LoginForm