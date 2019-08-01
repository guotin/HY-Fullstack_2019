import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import styled from 'styled-components'

const BlogForm = (props) => {

  const Button = styled.button`
    background: #f505b5;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #1cfa07;
    border-radius: 3px;
  `

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleBlogPost = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    props.addBlog(newBlog)
    props.setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    title.reset()
    author.reset()
    url.reset()

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogPost}>
        <div>title:<input {...title} reset={null} /></div>
        <div>author:<input {...author} reset={null} /></div>
        <div>url:<input {...url} reset={null} /></div>
        <div><Button type="submit">create</Button></div>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  addBlog
}
export default connect(null, mapDispatchToProps)(BlogForm)