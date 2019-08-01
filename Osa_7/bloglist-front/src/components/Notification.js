import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  return (
    <div className="error">
      <h3>{props.notification}</h3>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)