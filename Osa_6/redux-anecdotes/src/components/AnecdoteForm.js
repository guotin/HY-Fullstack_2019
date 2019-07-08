import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`you added '${content}'`)
    setTimeout(() => {
      props.removeNotification()
    }, 5000)

  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}

export default connect(null, { createAnecdote, setNotification, removeNotification})(AnecdoteForm)
