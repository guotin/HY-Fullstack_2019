import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Notification from './components/Notification'


const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.history.push('/')
    props.setNotification(`a new anecdote ${content} created`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification}/>
        <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route exact path="/create" render={() => <CreateNewHistory addNew={addNew} setNotification={setNotification}/>} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/anecdotes/:id" render={({ match }) => 
          <Anecdote anecdote={anecdoteById(match.params.id)} /> } />
        <Footer />
      </div>
    </Router>
  )
}

const CreateNewHistory = withRouter(CreateNew)

export default App;