/*
    The purpose of this component is to perform 
    an update to the DB for an individual user.
    The FN "EditUser" is called when the user clicks
    the "Edit User" button from the "UsersList.js"
    component. 
    This is called by the route: "/EditUser"    
*/

import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import logo from '/Users/gregoryhaney/workspace/propczar/src/propczar.png'
 
export const EditUser = () => {
    const history = useHistory()    
    const id = useParams()  

    const [ userToEdit, setUserToEdit ] = useState([])
    const [ user, updateUser ] = useState({})   
    
    
    const getUserToEdit = () => {
        fetch(`http://localhost:8080/users/${id.id}`)
            .then(res => res.json())
            .then((editUserArray) => {
                setUserToEdit(editUserArray)
        })
    }

  
    // call the FN to get the user from DB via API Fetch
    useEffect(
        () => {
            getUserToEdit()
        },
        []
    )

        
        // edUser object builder goes here
        const edUser = {
            name: user.name,
            email: user.email,
            role: user.role
        }

        const makeTheUpdate = () => {
        // POST action of edited property object goes here
        const fetchOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(edUser)
        }
        return fetch(`http://localhost:8080/users/${id.id}`, fetchOption)
            .then(() => {
                history.push("/userManagement")
            })
        }


        return (
            <>
                <hr className="rounded"></hr> 
                <img src={logo} className="App-logo" alt="logo" />
                <hr className="rounded"></hr>
                <form className="editUserForm">
                <h2 className="editUserForm__title">Edit an Existing User</h2>
                

                
                    <fieldset>
                        <div className="form-group">
                        
                            <label htmlFor="name">User's Name:</label>
                       
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = {...user}
                                        copy.name = evt.target.value
                                        updateUser(copy)
                                    }
                                }
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder = {userToEdit.name}
                                />
                        </div>
                    </fieldset>
    
    
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="email">User's Email Address:</label>
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = {...user}
                                        copy.email = evt.target.value
                                        updateUser(copy)
                                    }
                                }
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder = {userToEdit.email}
                                />
                        </div>
                    </fieldset>


                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="role">User's Role:</label>
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = {...user}
                                        copy.role = evt.target.value
                                        updateUser(copy)
                                    }
                                }
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder = {userToEdit.role}
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
