import React from 'react'
import Country from './Country'

const CountryList = ({ newFilter, countries, handleClick }) => {

  if (newFilter === '') {
    return <div>Too many matches, specify another filter</div>
  }
  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  if (countriesToShow.length === 1) {
    return (
      <div>
        <Country country={countriesToShow[0]} />
      </div>
    )
  } else if (countriesToShow.length <= 10) {
    const rows = () => countriesToShow
      .map(country => <p key={country.name}>{country.name}
      <button onClick={() => handleClick(country.name)}>show</button></p>)
    return (
      <div>
        {rows()}
      </div>
    )
  } else {
    return <div>Too many matches, specify another filter</div>
  }
  
   
}

export default CountryList