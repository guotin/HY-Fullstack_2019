import React from 'react'
import Person from './Person'

const PersonList = ({ newFilter, persons}) => {

  const rows = () => persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))
    .map(person => <Person key={person.name} name={person.name} number={person.number} />)

  return (
    <div>
      {rows()}
    </div>
  )
}

export default PersonList