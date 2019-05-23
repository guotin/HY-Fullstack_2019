import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Country = ({ country }) => {
  
  const name = country.name
  const capital = country.capital
  const population = country.population
  const languages = country.languages
  const flagImageURL = country.flag

  const rows = () => languages.map(country => <li key={country.name}>{country.name}</li>)
  const [ weather, setWeather ] = useState([])

  useEffect(() => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=e2660aac1831486f83a172033192305&q=${capital}`)
      .then(response => {
        const responseData = response.data.current
        const weatherData = {
          temperature: responseData.temp_c,
          iconURL: responseData.condition.icon,
          windSpeed: responseData.wind_kph,
          windDirection: responseData.wind_dir
        }

        setWeather(weatherData)
      })
  }, [capital])


  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      {rows()}
      <img src={flagImageURL} alt="country flag" height="150"></img>
      <h2>Weather in {capital}</h2>
      <p><b>Temperature: </b>{weather.temperature} Celsius</p>
      <img src={weather.iconURL} alt="weather icon"></img>
      <p><b>Wind: </b>{weather.windSpeed} kph direction {weather.windDirection}</p>
    </div>
  )

}

export default Country