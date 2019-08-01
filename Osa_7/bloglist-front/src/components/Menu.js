import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Menu = (props) => {

  const Button = styled.button`
    background: #f505b5;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #1cfa07;
    border-radius: 3px;
  `

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      --- {props.user.name} logged in <Button onClick={props.logout}>logout</Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Menu)