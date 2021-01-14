import React, { useState, useEffect } from 'react'
import noteService from './services/notes'

const Notification = ({message}) => {
  if (message === null) {
    return null
  } 

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  if (message === null) {
    return null
  } 

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Filter = ({onChange,filterValue}) => {
  return (
    <div>
      filter shown with <input onChange={onChange} value={filterValue}/>
    </div>
  )
}

const PersonForm = ({onSubmit,onNameChange,nameValue,onNumberChange,numberValue}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onNameChange} value={nameValue}/>
      </div>
      <div>
        number: <input onChange={onNumberChange} value={numberValue}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({contacts, deleteContact}) => {
  return (
    <div>
      {contacts.map(person => 
        <div key={person.name}>
          {person.name} {person.number} <button onClick={() => deleteContact(person.name)}>Delete</button>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notif, setNotif ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(()=>{
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
     })
  },[])

  const contactToShow = (filter === '')
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  const addContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const found = persons.find(person => person.name === newName);

    if (found) {
      if (window.confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`)) { 
      newContact.id = found.id
      noteService
        .update(found.id,newContact)
        .then(response => {
          const idx = persons.findIndex(person => person.name === found.name)
          persons.splice(idx,1,newContact)
          console.log(idx)
          setNewName('')
          setNewNumber('')
          setPersons(persons)
          setNotif(`Changed ${newContact.name}`)
          setTimeout(()=>setNotif(null), 5000)
        })
        .catch(error => {
          setErrorMessage(error)
          setTimeout(()=>setErrorMessage(null), 5000)
          setPersons(persons.filter(person => person.name !== newContact.name))
        })
    }}
    else {
      noteService
        .create(newContact)
        .then(response => {
          setPersons(persons.concat(newContact))
          setNewName('')
          setNewNumber('')
          setNotif(`Added ${newContact.name}`)
          setTimeout(()=>setNotif(null), 5000)
        })
    }
  }

  const contactDelete = (name) => {
    if (window.confirm(`Delete ${name}?`)) { 
      const id = persons.find(person => person.name === name).id
      noteService
        .deletedata(id)
        .then(response => {
          setPersons(persons.filter(person => person.name !== name))
          })
        .catch(error => {
          setErrorMessage(`Information of ${name} has already been removed from server`)
          setTimeout(()=>setErrorMessage(null), 5000)
          setPersons(persons.filter(person => person.name !== name))
          })    
  }}

  const filterChangeHandler = (event) => {
    setFilter(event.target.value)
  }

  const nameChangeHandler = (event) => {
    setNewName(event.target.value)
  }

  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif}/>
      <ErrorNotification message={errorMessage}/>
      <Filter onChange={filterChangeHandler} filterValue={filter}/>
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addContact}
        onNameChange={nameChangeHandler} nameValue={newName}
        onNumberChange={numberChangeHandler} numberValue={newNumber}
      />
      <h3>Numbers</h3>
      <Persons contacts={contactToShow} deleteContact={(name) => contactDelete(name)}/>
    </div>
  )
}

export default App