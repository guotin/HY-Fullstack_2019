import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'

import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const handleVoteClick = (anecdote) => {
    props.addVote(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      props.removeNotification()
    }, 5000)

  }
  return (
    <div>
      {props.visibleAnecdotes.map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  return (anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification,
  removeNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)