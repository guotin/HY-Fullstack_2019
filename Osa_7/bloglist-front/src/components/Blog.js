import React from 'react'
import { connect } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'

const Blog = (props) => {

  if (!props.blog) {
    return null
  }

  const removeButton = { display: props.blog.user.name === props.user.name ? '' : 'none' }

  const handleLikeClick = () => {
    props.addLike(props.blog)
  }

  const handleRemoveClick = () => {
    if (window.confirm(`remove blog ${props.blog.title} by ${props.blog.author}?`)) {
      props.removeBlog(props.blog)
    }
  }


  return (
    <div>
      <h2>{props.blog.title} by {props.blog.author}</h2>
      <div>
        <a href={props.blog.url}>{props.blog.url}</a>
        <p>{props.blog.likes} likes <button onClick={() => handleLikeClick()}>like</button></p>
        <p>added by {props.blog.user.name}</p>
        <button style={removeButton} onClick={() => handleRemoveClick()}>remove</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  addLike,
  removeBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)