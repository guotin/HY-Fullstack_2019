import React, { useState } from 'react'

const BlogForm = (props) => {

  const [title, setTitle ] = useState('')
  const [author, setAuthor ] = useState('')
  const [url, setUrl ] = useState('')

  const handleBlogPost = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }
    
    const savedBlog = await props.blogService.create(newBlog)
    props.setBlogs(props.blogs.concat(savedBlog))
    handleNotification(savedBlog)
    setTitle('')
    setAuthor('')
    setUrl('')

  }
  
  const handleNotification = async (savedBlog) => {
    
    await props.setNotification(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)
    setTimeout(() => {
      props.setNotification(null)
    }, 5000)

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogPost}>
        <div>title:<input value={title} onChange={({ target }) => setTitle(target.value)} /></div>
        <div>author:<input value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>url:<input value={url} onChange={({ target }) => setUrl(target.value)} /></div>
        <div><button type="submit">create</button></div>
      </form>
    </div>
  )
}

export default BlogForm