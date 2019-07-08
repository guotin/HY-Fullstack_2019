import React from 'react'


const Notification = (props) => {

  const newNotification = props.store.getState().notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {newNotification}
    </div>
  )
}

export default Notification