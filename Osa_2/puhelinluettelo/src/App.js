import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.find(person => person.name===newName)) {

      const personObject = {
        name: newName,
        number: newNumber,
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')

    } else {
      window.alert(`${newName} on jo luettelossa`)
      setNewName('')
      setNewNumber('')
    }
  }

  const handlePersonNameChange = (event) => {
    setNewName(event.target.value) 
  }

  const handlePersonNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Lisää uusi</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handlePersonNameChange={handlePersonNameChange} 
        handlePersonNumberChange={handlePersonNumberChange} /> 
      <h2>Numerot</h2>
      <PersonList newFilter={newFilter} persons={persons} />
    </div>
  )

}

export default App
