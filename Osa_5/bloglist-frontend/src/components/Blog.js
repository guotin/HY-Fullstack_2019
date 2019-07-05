import React, { useState } from 'react'

const Blog = ({ blog, blogService, blogs, setNewBlogs, currentUser }) => {

  const [visible, setVisible] = useState(false)
  let removeButtonVisibility = (blog.user.name === currentUser.name ? '' : 'none')

  const fullInfo = { display: visible ? '' : 'none' }
  const removeButton = { display: visible ? removeButtonVisibility : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeClick = () => {
    blog.likes++
    blogService.update(blog.id, blog)
    setNewBlogs(blogs.map(originalBlog => originalBlog.id === blog.id ? blog : originalBlog))
  }

  const handleRemoveClick = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id)
      setNewBlogs(blogs.filter(x => x.id !== blog.id))
    }

  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='defaultInfo' onClick={() => toggleVisibility()}>{blog.title} {blog.author}</div>
      <div style={fullInfo} className='fullInfo'>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={() => handleLikeClick()}>like</button></p>
        <p>added by {blog.user.name}</p>
        <button style={removeButton} onClick={() => handleRemoveClick()}>remove</button>
      </div>
    </div>

  )

}

export default Blog