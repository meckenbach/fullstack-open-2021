import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const [filter, setFilter] = useState('')

  function handleFilterInput (event) {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>find countries <input onChange={handleFilterInput} value={filter}/></div>
      <SearchCountries countries={countries} query={filter} />
    </div>
  )
}

const SearchCountries = ({countries, query}) => {

  countries = countries.filter(country => {
    return country.name
      .toLowerCase()
      .includes(query)
  })

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country =>
          <div key={country.alpha3Code}>
            {country.name} <button>Show</button>
          </div>
        )}
      </div>
    )
  }

  if (countries.length === 1) {
    return <CountryDetailed country={countries[0]} />
  }
  
  return null
}

const CountryDetailed = ({country}) => {

  const languagesList = country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)

  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital {country.capital}</div>
      <div>Population {country.population}</div>
      <h2>Languages</h2>
      <ul>{languagesList}</ul>
      <img src={country.flag} alt={country.name} />
    </div>
  )
}

export default App;
