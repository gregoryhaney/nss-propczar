/*
    The purpose of this component is to perform 
    an update to the DB for an individual manager note.
    The FN "editNote" is called when the user clicks
    the "Edit Note" button from the "NotesList.js"
    component.  
    This is called by the route: "/EditNote"   
*/

import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import logo from '../propczar.png'
 
export const EditNote = () => {
    const history = useHistory()    
    const id = useParams()  


    // variables to hold state
    const [ noteToEdit, setNoteToEdit ] = useState([])
    const [ note, updateNote ] = useState({})
    const [ properties, setAllProperties ] = useState([])  
    const [ users, setAllUsers ] = useState([])
    
    // FN to fetch the specific note for editing
    const getNoteToEdit = () => {
        fetch(`http://localhost:8080/notes/${id.id}?_expand=property`)
            .then(res => res.json())
            .then((editNoteArray) => {
                setNoteToEdit(editNoteArray)
        })
    }

    // FN to retrieve all property records
    const getProperties = () => {
        fetch(`http://localhost:8080/properties`)
            .then(res => res.json())
            .then((propertiesArray) => {
                setAllProperties(propertiesArray)
        })
    }

    // FN to retrieve all user records
    const getUsers = () => {
        fetch(`http://localhost:8080/users`)
            .then(res => res.json())
            .then((usersArray) => {
                setAllUsers(usersArray)
        })
    }

  
    // call the FNs to get data from DB via API Fetch
        // get the specific note to edit
        // get all the properties
        // get all the users
    useEffect(
        () => {
            getNoteToEdit()
            getProperties()
            getUsers()
        },
        []
    )

        
        // 'edNote' object builder goes here
        const edNote = {
            date: note.date,
            propertyId: note.propertyId,
            mgrId: note.mgrId,
            note: note.note
        }

            // FN to make the PATCH API call for the record to update in DB
        const makeTheUpdate = () => {
        // POST action of edited property object goes here
        const fetchOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(edNote)
        }
        return fetch(`http://localhost:8080/notes/${id.id}`, fetchOption)
            .then(() => {
                history.push("/Notes")
            })
        }


        return (
            <>
                <hr className="rounded"></hr> 
                <img src={logo} className="App-logo" alt="logo" />
                <hr className="rounded"></hr>
                <form className="editNoteForm">
                <h2 className="editNoteForm__title">Edit an Existing Manager's Note</h2>
                
                    <fieldset>
                        <div className="form-group">                        
                            <label htmlFor="date">Date submitted:</label>                       
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = {...note}
                                        copy.date = evt.target.value
                                        updateNote(copy)
                                    }
                                }
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder = {noteToEdit.date}
                                />
                        </div>
                    </fieldset>  
    

                    <fieldset>
                    <div className="form-group">
                        <label htmlFor="manager">Manager:</label>
                        <select value={noteToEdit.mgrId}
                            onChange={
                                (evt) => {
                                    const copy = {...note}
                                    copy.mgrId = parseInt(evt.target.value)
                                    updateNote(copy)
                        }}>
                            {users.map(mgruser => { 
                                if ((mgruser.role).toLowerCase() === "owner" || (mgruser.role).toLowerCase() === "manager") {
                                    <option value="0">{mgruser.name}</option>
                                        return <option value={mgruser.id}>
                                            {mgruser.name}
                                    </option>
                                }                       
                                    })}   
                        </select>
                    </div>
                    </fieldset>



                    <fieldset>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <select value={noteToEdit.propertyId}
                            onChange={
                                (evt) => {
                                    const copy = {...note}
                                    copy.propertyId = parseInt(evt.target.value)
                                    updateNote(copy)
                        }}>
                            {properties.map(property => { 
                            <option value="0">{property.address}</option>
                                 return <option value={property.id}>
                                            {property.address}
                                </option>
                                                        
                                    })}   
                        </select>
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
                                placeholder = {noteToEdit.note}
                                />
                        </div>
                    </fieldset>

        
                    <br></br>
                    <button onClick={makeTheUpdate} className="btn btn-primary">
                        Save Changes
                    </button>
                </form>
                </>
        )
}
