import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const UserList = (props) => {

  const allUsers = props.blogs
    .map(blog => blog.user)
    .filter(user => user.name !== undefined)
    .reduce((uniq, user) => uniq.map(user => user.id).includes(user.id) ? uniq : [...uniq, user], [])

  const usersWithBlogCount = allUsers
    .map(user => ({ ...user, blogs: props.blogs.reduce((n, x) => n + (x.user.name === user.name), 0) }))
    .sort((a, b) => b.blogs - a.blogs)

  return (
    <div>
      <h2>users</h2>
      <h4>name and blogs created</h4>
      {usersWithBlogCount.map(user =>
        <p key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link> - blogs created: {user.blogs}</p>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}


export default connect(mapStateToProps)(UserList)