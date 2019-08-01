import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import styled from 'styled-components'


import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import Menu from './components/Menu'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import userService from './services/users'

const App = (props) => {

  const Page = styled.div`
    padding: 1em;
    background: #b0bfe8;
  `

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then(responseUsers => {
        setUsers(responseUsers)
      })
  }, [])

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    props.setUser(null)
  }

  if (!props.user) {
    return (
      <Page>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </Page>
    )
  }
  return (
    <Router>
      <Page>
        <Menu logout={handleLogout} />
        <h2>Bloglist application</h2>
        <Notification />
        <Route exact path="/blogs" render={() =>
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
        } />
        <Route exact path="/blogs" render={() => <BlogList />} />
        <Route exact path="/users" render={() => <UserList />} />
        <Route exact path="/users/:id" render={({ match }) =>
          <User user={users.find(u => u.id === match.params.id)} />} />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <Blog blog={props.blogs.find(b => b.id === match.params.id)} />} />
      </Page>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)