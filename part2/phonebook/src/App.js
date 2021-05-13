import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const App = () => {

  const [ persons, setPersons ] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  function handleAddPerson (event) {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const duplicatePerson = persons.find(person => person.name === newName)

    if (!duplicatePerson) {
      personService
        .create(newPerson)
        .then(person => {
          setPersons([...persons, person])
          setNewName('')
          setNewNumber('')

          setSuccessMessage(`Added ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
      return
    }

    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(duplicatePerson.id, newPerson)
        .then(updatedPerson => {
          setPersons([...persons.filter(person => person.name !== duplicatePerson.name), updatedPerson])
          setNewName('')
          setNewNumber('')

          setSuccessMessage(`Updated ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
        .catch (err => {
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
        
    } 
  }

  function handleDelete (id, name) {
    return (event) => {
      event.preventDefault()

      if (window.confirm(`Delete ${name}?`)) {
        personService
          .del(id)
          .then(() => {
            setPersons([...persons.filter(person => person.id !== id)])
          })
          
      }
    }
  }

  const [ newName, setNewName ] = useState('')

  function handleNameInput (event) {
    event.preventDefault()

    setNewName(event.target.value)
  }

  const [ newNumber, setNewNumber] = useState('')

  function handleNumberInput (event) {
    event.preventDefault()

    setNewNumber(event.target.value)
  }

  const [ filter, setFilter] = useState('')

  function handleFilterInput (event) {
    event.preventDefault()

    setFilter(event.target.value)
  }

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter onFilterInput={handleFilterInput} filterValue={filter} />
      <h3>add a new</h3>
      <PersonForm
        onNameInput={handleNameInput}
        nameValue={newName}
        onNumberInput={handleNumberInput}
        numberValue={newNumber}
        onAddPerson={handleAddPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} onDeletePerson={handleDelete} />
    </div>
  )
}

const Filter = ({onFilterInput, filterValue}) => {
  return (
    <div>
      filter shown with <input onChange={onFilterInput} value={filterValue} />
    </div>
  )
}

const PersonForm = ({onNameInput, onNumberInput, onAddPerson, nameValue, numberValue}) => {
  return (
    <form>
      <div>
        name: <input onChange={onNameInput} value={nameValue} />
      </div>
      <div>
        number: <input onChange={onNumberInput} value={numberValue} />
      </div>
      <div>
        <button onClick={onAddPerson} type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, filter, onDeletePerson}) => {
  persons = persons
    .filter(person => person.name.startsWith(filter))
    .map(person => <Person name={person.name} number={person.number} id={person.id} key={person.id} onDeletePerson={onDeletePerson} />)
  
    return <div>{persons}</div>
}

const Person = ({name, number, id, onDeletePerson}) => {
  return (
    <div>{name} {number} <button onClick={onDeletePerson(id, name)}>delete</button></div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App