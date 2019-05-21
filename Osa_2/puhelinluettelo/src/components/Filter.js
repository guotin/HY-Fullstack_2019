import React from 'react'

const Filter = ({ newFilter, handleFilterChange}) => {
  return (
    <div>
      rajaa näytettäviä: <input value={newFilter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter