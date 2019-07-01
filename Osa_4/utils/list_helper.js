const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const reducer = (previous, current) => {
    return current.likes > previous.likes ? current : previous
  }
  const favourite = blogs.reduce(reducer, {likes: 0})
  return blogs.length === 0 ? undefined : favourite
}

const mostBlogs = (blogs) => {
  return lodash(blogs)
    .groupBy('author')
    .map((value, key) => ({author: key, blogs: value.length}))
    .maxBy('blogs')
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}