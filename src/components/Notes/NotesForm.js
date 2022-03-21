/*
    The purpose of this component is to provide the
    form for adding a new manager's note.

    The is called by the route: "/NoteForm"
*/


import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import logo from '../propczar.png'

export const NoteForm = () => {   
    

    // variables for state
    const [ note, updateNote ] = useState({})
    const [ properties, setProperties ] = useState([])
    const [ users, setUsers ] = useState([])



    const history = useHistory()


    // FN to retrieve properties objects from DB via API fetch
    const getProperties = () => {
        fetch("http://localhost:8080/properties")
        .then(res => res.json())
        .then((propertiesArray) => {
            setProperties(propertiesArray)
        })
    }


    // FN to retrieve user objects from DB via API fetch
    const getUsers = () => {
        fetch("http://localhost:8080/users")
        .then(res => res.json())
        .then((usersArray) => {
            setUsers(usersArray)
        })
    }

    // call the FNs to retrieve properties and users from DB
    useEffect(
        () => {
           getProperties()
           getUsers()
        },
        []
    )



        const newNote = (evt) => {
            evt.preventDefault()


                // builder for the new note when adding to the DB
                const buildNewNote = {
                    mgrId: note.mgrId,
                    propertyId: note.propertyId,
                    date: note.date,
                    note: note.note
                }
        
                // API Post method to create the new note in DB
                const fetchOption = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(buildNewNote)
                }
                return fetch("http://localhost:8080/notes", fetchOption)
                    .then(() => {
                        history.push("/Notes")
                    })

    }

        return (
            <>
                <hr className="rounded"></hr> 
                <img src={logo} className="App-logo" alt="logo" />
                <hr className="rounded"></hr> 
                <form className="newUserForm">     
                <h2 className="newUserForm__title">New Manager's Note</h2>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="manager">Select Manager:</label>
                        <select defaultValue={'0'}
                        onChange={
                            (evt) => {
                                const copy = {...note}
                                copy.mgrId = parseInt(evt.target.value)
                                updateNote(copy)
                    }}>
                        <option value="0">Choose the manager...</option>
                            {users.map(user => {
                                if ((user.role).toLowerCase() === "owner" || (user.role).toLowerCase() === "manager") {                              
                                    return <option key={`users--${user.id}`} value={user.id}>
                                    {user.name}
                                    </option>                        
                                } 
                            })}   
                       </select>
                    </div>
                </fieldset>



                <fieldset>
                <div className="form-group">
                    <label htmlFor="pickProperty">Select the Address:</label>
                    <select defaultValue={'0'}
                        onChange={
                            (evt) => {
                                const copy = {...note}
                                copy.propertyId = parseInt(evt.target.value)
                                updateNote(copy)
                    }}>
                        <option value="0">Choose the address...</option>
                            {properties.map(property => {
                                return <option key={`properties--${property.id}`} value={property.id}>
                                    {property.address}
                                    </option>                        
                            })}   
                    </select>
                </div>
                </fieldset>




                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                                onChange={
                                    (evt) => {
                                        const copy = {...note}
                                        copy.date = evt.target.value
                                        updateNote(copy)
                                    }
                                }
                            required autoFocus
                            type="date"
                            className="form-control"
                            placeholder="Email address..."
                            />
                    </div>
                </fieldset>


                <fieldset>
                    <div className="form-group">
                        <label htmlFor="note">Note:</label>
                        <input
                                onChange={
                                    (evt) => {
                                        const copy = {...note}
                                        copy.note = evt.target.value
                                        updateNote(copy)
                                    }
                                }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Note..."
                            />
                    </div>
                </fieldset>



                <button onClick={newNote} className="btn btn-primary">
                    Add New Note
                </button>

                </form>
            </>
        )
}