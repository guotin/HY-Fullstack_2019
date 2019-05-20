import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({anecdote, votes}) => (
  <div>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const anecdotes=props.anecdotes
  const emptyVotesArray = new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
  const [votes, setVotes]=useState(emptyVotesArray)
  const [mostVotedIndex, setMostVotedIndex] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)

  const setVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    if (copy[selected] > mostVotes) {
      setMostVotes(copy[selected])
      setMostVotedIndex(selected)
    }
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote" />
      <Button handleClick={() => setVote()} text="vote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[mostVotedIndex]} votes={mostVotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)