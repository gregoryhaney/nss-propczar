/*
    The purpose of this component is to provide the
    form for adding a new property to the inventory.

    The is called by the route: "/PropertyForm"
*/

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

export const PropertyForm = () => {
    const [users, setUsers] = useState([])
    const [property, updateProperty] = useState({})
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8080/users")
            .then(res => res.json())
            .then((usersArray) => {
                setUsers(usersArray)
            })
        },
        []
    )

        // build the object that will be sent via API when form is submitted
            // use the preventDefault to prevent default browser behavior
            // after the form is submitted
        const addNewProperty = (evt) => {
            evt.preventDefault()
            
                const newProperty = {
                    userId: property.userId,
                    address: property.address,
                    mgrId: property.mgrId,
                    rentAmt: property.rentAmt,
                    occupied: property.occupied,
                    imageURL: property.imageURL
                }
        
            const fetchOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProperty)
            }
            return fetch("http://localhost:8080/properties", fetchOption)
                .then(() => {
                    history.push("/propertyManagement")
                })
            }
        

    return (
        <>
            <hr className="rounded"></hr> 
                <h1>PropCzar</h1>
                <hr className="rounded"></hr>
            <form className="newPropertyForm">
            <h2 className="newPropertyForm__title">Add New Property to the Inventory</h2>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="address">Street Address:</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...property}
                                    copy.address = evt.target.value
                                    updateProperty(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Street address..."
                            />
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
                    <label htmlFor="managerAssigned">Manager:</label><br></br>
                    <select defaultValue={'0'}
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.mgrId = parseInt(evt.target.value)
                                updateProperty(copy)
                    }}>
                        <option value="0">Select the manager...</option>
                            {users.map(mgruser => {  
                                if ((mgruser.role).toLowerCase() === "owner" || (mgruser.role).toLowerCase() === "manager") {                              
                                return <option value={mgruser.id}>
                                    {mgruser.name}
                        </option>
                                                
                            }})}   
                    </select>
                </div>
                </fieldset>



            <fieldset>
                <div className="form-group">
                    <label htmlFor="tenant">Tenant:</label><br></br>
                    <select defaultValue={'0'}
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.userId = parseInt(evt.target.value)
                                updateProperty(copy)
                    }}>
                        <option value="0">Select the tenant...</option>
                            {users.map(user => {
                                if (user.role === "tenant") {
                                return <option value={user.id}>
                                    {user.name}
                                  
                                    </option>                        
                            }})}   
                    </select>
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

            <fieldset>
                    <div className="form-group">
                        <label htmlFor="imageURL">URL for Image:</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...property}
                                    copy.imageURL = evt.target.value
                                    updateProperty(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="example: https://images.pexels.com/photos/8484848484848......"
                            />
                    </div>
                </fieldset>


            <br></br>
            <button onClick={addNewProperty} className="btn btn-primary">
                Add Property
            </button>
        </form>
        </>
    )

}