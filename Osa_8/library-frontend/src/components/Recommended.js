import React from 'react'

const Recommended = (props) => {


  if (!props.show) {
    return null
  }
  if (props.result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>ei toimi</div>
  )
}

export default Recommended