import React, { useState } from 'react'
import { Query, Mutation, useApolloClient } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author {
        name
      }
      genres
      published
    }
  }
`

const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      id
    }
  }
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const ME = gql`
  {
    me {
      favouriteGenre
    }
  }
`
const ALL_BOOKS_GENRE = gql`
  query allBooksGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      genres
      published
    }
  }
`


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Mutation mutation={EDIT_AUTHOR} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}>
          {(editAuthor) =>
            <Query query={ALL_AUTHORS}>
              {(result) => <Authors show={page === 'authors'} result={result} editAuthor={editAuthor} />}
            </Query>}
        </Mutation>
        <Query query={ALL_BOOKS}>
          {(result) => <Books show={page === 'books'} result={result} />}
        </Query>
        <Mutation mutation={LOGIN} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}>
          {(login) => <LoginForm show={page === 'login'} login={login} setToken={(token) => setToken(token)} />}
        </Mutation>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => logout()}>logout</button>
      </div>
      <Mutation mutation={EDIT_AUTHOR} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}>
        {(editAuthor) =>
          <Query query={ALL_AUTHORS}>
            {(result) => <Authors show={page === 'authors'} result={result} editAuthor={editAuthor} />}
          </Query>}
      </Mutation>
      <Query query={ALL_BOOKS}>
        {(result) => <Books show={page === 'books'} result={result} />}
      </Query>
      <Mutation mutation={ADD_BOOK} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}>
        {(addBook) => <NewBook show={page === 'add'} addBook={addBook} />}
      </Mutation>
    </div>
  )
}

export default App