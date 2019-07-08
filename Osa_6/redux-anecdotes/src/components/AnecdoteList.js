import React from 'react'
import Anecdote from './Anecdote'

import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {

  const filter = store.getState().filter

  const handleVoteClick = (anecdote) => {
    store.dispatch(addVote(anecdote.id))
    store.dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      store.dispatch(removeNotification())
    }, 5000)

  }
  return (
    <div>
      {store.getState().anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            handleVoteClick(anecdote)
          }
        />)}
    </div>
  )
}

export default AnecdoteList