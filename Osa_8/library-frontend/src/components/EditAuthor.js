import React, { useState } from 'react'
import Select from 'react-select'

const EditAuthor = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    const response = await props.editAuthor({
      variables: { name, born: Number(born) }
    })
    console.log(response)
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <div>
            name: <input value={name} onChange={({ target }) => setName(target.value)}></input>
          </div>
          <div>
            born: <input type='number' value={born} onChange={({ target }) => setBorn(target.value)}></input>
          </div>
          <div>
            <button type='submit'>update author</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditAuthor