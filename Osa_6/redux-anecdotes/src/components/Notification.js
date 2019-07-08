import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {

  const newNotification = props.notification

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

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
