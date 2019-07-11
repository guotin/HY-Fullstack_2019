import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

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
      author
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
      author
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

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Mutation mutation={EDIT_AUTHOR} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}>
        {(editAuthor) => 
          <Query query={ALL_AUTHORS}>
            {(result) => <Authors show={page === 'authors'} result={result} editAuthor={editAuthor}/>}
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