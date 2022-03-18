/*
    The purposes of this component are:
    1. generate the HTML (JSX) that will list the managers' notes.
    2. provide a "Create New Note" button at the top of the page
        a. it will go to route: "/NoteForm"
    3. provide an "Edit Note" and "Delete Note" button
    for each listed note.
        a. "Edit Note" goes to route "/EditNote" 
        b. "Delete Note" performs the "deleteNote" FN within this component

    This is called by the route: "/Notes"
*/

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import logo from '/Users/gregoryhaney/workspace/propczar/src/propczar.png'

export const NotesList = () => {
    const [ notes, setNotes ] = useState([])
    const [ users, setUsers ] = useState([])
    const history = useHistory()

    const deleteNote = (id) => {
        fetch(`http://localhost:8080/notes/${id}`, {
            method: "DELETE"
         })
            .then(getNotes())
        }
    
    

    const getNotes = () => {
        fetch("http://localhost:8080/notes?_expand=property")
        .then(res => res.json())
        .then((notesArray) => {
            setNotes(notesArray)
        })
    }


    const getUsers = () => {
        fetch("http://localhost:8080/users/")
        .then(res => res.json())
        .then((usersArray) => {
            setUsers(usersArray)
        })

    }



    // call FN to get all notes from DB via API Fetch
    useEffect(
        () => {
           getNotes()
           getUsers()
        },
        []
    )
            // add button at top of page to CREATE NEW NOTE
            // display simple notes list
            // add button under each note to EDIT
            // add button under each note to DELETE            

    return (
        
        <>
              <hr className="rounded"></hr> 
              <img src={logo} className="App-logo" alt="logo" />
              <hr className="rounded"></hr>
              
                <h2>Create a New Note</h2>
                <article className="newNote">
                    <button onClick={() => {                
                        history.push(`NoteForm`)
                            }}>Create New Note</button> 
                            <br></br> 
                            <hr className="rounded"></hr>  
                </article>                     
            {
            
            notes.map(
                (note) => {
                    return <div key={`noteObj--${note.id}`}>
                        <article className="noteCard">
                            Date created: {note.date} <br></br>
                            Property Location: {note.property.address} <br></br>                            
                            Note: {note.note} <br></br>

                            {
                    users.map(
                    (user) => {
                        if (note.mgrId === user.id){
                        return <div key={`managerName--${user.id}`}>
                            <article className="managerName">
                            Property Manager: {user.name}<br></br>
                            </article>
                        </div>
                        }                      
                    })   
                         
                }

                            <br></br>
                            <button onClick={() => {
                                history.push(`EditNote/${note.id}`)
                            }}>Edit Note</button> 
                            
                            <button onClick={() => {
                                deleteNote(note.id)                                
                            }}>Delete Note</button>
                            
                        </article>
                        </div>                   
                }
            ) 
            }
                
        </>
    )    
}