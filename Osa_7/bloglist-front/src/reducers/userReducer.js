import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('tapahtuu login', action.data)
      return action.data
    default:
      return state
  }
}

export const setUser = (user) => {
  blogService.setToken(user !== null ? user.token : null)
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}
  
export default userReducer