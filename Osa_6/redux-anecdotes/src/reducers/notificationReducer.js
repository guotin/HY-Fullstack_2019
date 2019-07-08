const notificationReducer = (state = '', action) => {

  switch (action.type) {
    case 'SET_NOTIFICATION':
      const newNotification = action.data
      return newNotification
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}
export const setNotification = (notification, seconds) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, seconds * 1000)
  }
}

export default notificationReducer