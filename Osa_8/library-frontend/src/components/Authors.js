import React, { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const handleAuthorChange = (option) => {
    setName(option)
  }

  const submit = async (e) => {
    e.preventDefault()
    await props.editAuthor({
      variables: { name: name.value, born: Number(born) }
    })
    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }
  if (props.result.loading) {
    return <div>loading...</div>
  }
  const authors = props.result.data.allAuthors

  const options = authors.map(a => ({ value: a.name, label: a.name }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <div>
            <Select value={name} onChange={handleAuthorChange} options={options} />
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

export default Authors