import React from 'react'

const Person = ({ name, number, handleDelete, id }) => {

  return (
    <div>
      <p>{name} {number}
       <button onClick={() => 
        window.confirm(`Poistetaanko henkilö ${name}?`) ?
        handleDelete(id, name) : <p></p>}>Delete</button>
      </p>
    </div>
  )

}

export default Person