import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.find(person => person.name === newName)) {

      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Lisättiin ${personObject.name}`)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => setErrorMessage(null), 5000)
        })

    } else {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        personToUpdate.number = newNumber
        updateNumber(personToUpdate)
      }
      setNewName('')
      setNewNumber('')
    }

    setTimeout(() => {
      setErrorMessage(null)
      setNotificationMessage(null)
    }, 5000)
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

  const handleDelete = (personId, personName) => {
    personService
      .remove(personId)
      .then(response => {
        const newPersons = persons.filter(p => p.id !== personId)
        setPersons(newPersons)
        setNotificationMessage(`${personName} poistettiin`)
      })
      .catch(error => {
        setErrorMessage(`${personName} oli jo poistettu aikaisemmin`)
      })

    setTimeout(() => {
      setErrorMessage(null)
      setNotificationMessage(null)
    }, 5000)

  }

  const updateNumber = (personObject) => {
    personService
      .update(personObject.id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== personObject.id ? person : returnedPerson))
        setNotificationMessage(`Päivitettiin numero`)
      })
      .catch(error => {
        setErrorMessage('Numeron päivittäminen epäonnistui')
      })

    setTimeout(() => {
      setErrorMessage(null)
      setNotificationMessage(null)
    }, 5000)

  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification errorMessage={errorMessage} notificationMessage={notificationMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Lisää uusi</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonNameChange={handlePersonNameChange}
        handlePersonNumberChange={handlePersonNumberChange} />
      <h2>Numerot</h2>
      <PersonList newFilter={newFilter} persons={persons} handleDelete={handleDelete} />
    </div>
  )

}

export default App
