import React from 'react'

const Notification = ({ notificationMessage, errorMessage }) => {
  if (notificationMessage === null && errorMessage === null) {
    return <div></div>
  }
  if (errorMessage !== null) {
    return <div className="error">{errorMessage}</div>
  }
  if (notificationMessage !== null) {
    return <div className="notification">{notificationMessage}</div>
  }
}

export default Notification