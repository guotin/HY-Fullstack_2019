import React from 'react'

const PersonForm = ({ addPerson, newName, newNumber, handlePersonNameChange, handlePersonNumberChange }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>nimi: <input value={newName} onChange={handlePersonNameChange} /></div>
        <div>numero: <input value={newNumber} onChange={handlePersonNumberChange} /></div>
        <div><button type="submit">lisää</button></div>
      </form>
    </div>
  )
}

export default PersonForm