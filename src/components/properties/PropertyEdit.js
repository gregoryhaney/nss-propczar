/*
    The purpose of this component is to perform 
    an update to the DB for an individual property.
    The FN "editProperty" is called when the user clicks
    the "Edit Property" button from the "PropertyManagement.js"
    component.     
*/

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
 
export const EditProperty = () => {
    const history = useHistory()
    const id = useParams()  

    const [ users,setAllUsers ] = useState([])
    const [ propertyToEdit, setPropertyToEdit ] = useState([])
    const [ property, updateProperty ] = useState({
        occupied: false        
    })   
    
    
    const getPropertyToEdit = () => {
        fetch(`http://localhost:8080/properties/${id}_expand=user`)
            .then(res => res.json())
            .then((editPropertyArray) => {
                setPropertyToEdit(editPropertyArray)
        })
    }

    const getAllUsers = () => {
        fetch("http://localhost:8080/users")
            .then(res => res.json())
            .then((allUsersArray) => {
                setAllUsers(allUsersArray)
            })
    }

    // get the property from DB via API Fetch
    useEffect(
        () => {
            getPropertyToEdit()
            getAllUsers()
        },
        []
    )

        
        // editProperty object builder goes here
        const edProperty = {
            mgrId: property.mgrId,
            userId: property.userId,
            rentAmt: property.rentAmt,
            occupied: property.occupied
        }

        const makeTheUpdate = () => {
        // POST action of edited property object goes here
        const fetchOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(edProperty)
        }
        return fetch(`http://localhost:8080/properties/${id}_expand=user`, fetchOption)
            .then(() => {
                history.push("/propertyManagement")
            })
        

        }


        return (
            <>
                <hr className="rounded"></hr> 
                <form className="editPropertyForm">
                <h2 className="editPropertyForm__title">Edit an Existing Property</h2>
    

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="managerAssigned">Manager:</label>
                        <select defaultValue={'0'}
                            onChange={
                                (evt) => {
                                    const copy = {...property}
                                    copy.mgrId = parseInt(evt.target.value)
                                    updateProperty(copy)
                        }}>
                            <option value="0">Select the manager...</option>
                                {users.map(mgruser => {                                
                                    return <option value={mgruser.id}>
                                        {mgruser.name}
                            </option>
                                                    
                                })}   
                        </select>
                    </div>
                    </fieldset>


                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="tenant">Tenant:</label>
                            <select defaultValue={'0'}
                                onChange={
                                    (evt) => {
                                        const copy = {...property}
                                        copy.userId = parseInt(evt.target.value)
                                        updateProperty(copy)
                            }}>
                                <option value="0">Select the tenant...</option>
                                    {users.map(user => {
                                        return <option value={user.id}>
                                            {user.name}
                                            </option>                        
                                    })}   
                            </select>
                        </div>
                    </fieldset>






                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="rentAmt">Monthly Rent Amount:</label>
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = {...property}
                                        copy.rentAmt = evt.target.value
                                        updateProperty(copy)
                                    }
                                }
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Monthly Rent..."
                                />
                        </div>
                    </fieldset>
    
    
                   
        
        
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="occupied">Occupied?</label>
                            <input 
                                onChange={
                                    (evt) => {
                                        const copy = {...property}
                                        copy.occupied = evt.target.checked
                                        updateProperty(copy)
                                    }
                                } 
                                required autoFocus
                                type="checkbox"
                                className="form-control"
                                placeholder="Occupied?"
                                />
                        </div>
                    </fieldset>
        
        
        
                    <button onClick={makeTheUpdate} className="btn btn-primary">
                        Update Property
                    </button>
                </form>
                </>
        )
}
