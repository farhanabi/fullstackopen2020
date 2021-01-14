import React, {useState, useEffect} from 'react';
import axios from 'axios';
const api_key = process.env.WEATHERSTACK_API_KEY;

const CountryList = ({countries, buttonClickHandler}) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.alpha2Code}>
          {country.name}
          <button onClick={buttonClickHandler} id={country.alpha2Code}>show</button>
        </div>
      ))}
    </div>
  )
}

const ShowCountry = ({countries}) => {
  const country = countries[0]
  const [weather,setWeather] = useState()
  
  useEffect(()=>{
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => setWeather(response.data))
  },[country.capital])


  console.log(weather)

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} height='100px' alt={country.demonym + ' flag'}/>
      { weather && weather.success !== false ? (
        <div>
          <h2>Weather in {country.capital}</h2>
          <div>temperature: {weather.current.temperature} Celcius</div>
          {weather.current.weather_icons.map(icon => <img src={icon} key={icon} alt=''/>)}
          <div>wind: {weather.current.wind_speed} kph direction {weather.current.wind_dir}</div>
        </div>
      ):(<div></div>)}
    </div>
  )
}

const Display = ({countriesToShow,buttonClickHandler}) => {
  return (
    <div>
      {(countriesToShow.length > 10)
        ? <div>Too many matches, specify another filter</div>
        : (countriesToShow.length !== 1)
          ? <CountryList countries={countriesToShow} buttonClickHandler={buttonClickHandler}/>
          : <ShowCountry countries={countriesToShow}/>
      }
    </div>
  )
}

const App = () => {
  const [countriesDB,setCountriesDB] = useState([])
  const [countries,setCountries] = useState([])
  const [filter,setFilter] = useState('')

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  },[])

  const filterChangeHandler = (event) => {
    if (countries.length !== 1) {
      setFilter(event.target.value)
    }
    else {  
      setCountries(countriesDB)
      setFilter(event.target.value)
    }
  }

  let countriesToShow = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))

  const buttonClickHandler = (event) => {
    countriesToShow = countries.filter(country => country.alpha2Code === event.target.id)
    setCountriesDB(countries)
    setCountries(countriesToShow)
    setFilter(countriesToShow[0].name)
  }

  return (
    <div>
      <div>find countries: <input type='text' onChange={filterChangeHandler} value={filter}></input></div>
      <Display countriesToShow={countriesToShow} buttonClickHandler={buttonClickHandler}/>
    </div>
  );
}

export default App;
