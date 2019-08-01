import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
      return state.map(b => b.id !== action.data.id ? b : action.data).sort((a, b) => b.likes - a.likes)
    case 'REMOVE':
      return state.filter(b => b.id !== action.data.id)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addLike = (blog) => {
  return async dispatch => {
    blog.likes++
    await blogService.update(blog.id, blog)
    dispatch({
      type: 'LIKE',
      data: blog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE',
      data: blog,
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const savedBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: savedBlog,
    })
  }
}

export default blogReducer