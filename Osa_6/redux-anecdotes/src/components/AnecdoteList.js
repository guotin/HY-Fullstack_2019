import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const handleVoteClick = async (anecdote) => {
    props.addVote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
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
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)