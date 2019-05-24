import React from 'react'
import Person from './Person'

const PersonList = ({ newFilter, persons, handleDelete }) => {

  const rows = () => persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))
    .map(person => <Person key={person.name} name={person.name} number={person.number} handleDelete={handleDelete} id={person.id} />)

  return (
    <div>
      {rows()}
    </div>
  )
}

export default PersonList