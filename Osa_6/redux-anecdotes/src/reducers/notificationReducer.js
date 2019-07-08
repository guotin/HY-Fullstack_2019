const notificationReducer = (state = '', action) => {

  switch (action.type) {
    case 'SET_NOTIFICATION':
      const newNotification = action.data
      return newNotification
    default:
      return state
  }

}

export const setNotification = notification => {
  return {
    type: 'SET_NOTIFICATION',
    data: notification
  }
}

export const removeNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    data: ''
  }
}

export default notificationReducer