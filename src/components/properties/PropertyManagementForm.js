/*
    The purpose of this component is to provide the
    form to be used for modifying or deleting existing properties,
    or adding a new property to the inventory.

    The actual updates to the DB will be handled by the
    component "PropertyManagement.js"

*/

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { UsersList } from "../Users/UsersList";

export const PropertyForm = (id) => {
    const [properties, setProperties] = useState([])

    const [property, updateProperty] = useState({
        tenantId: "",
        address: "",
        mgrId: "",
        rentAmt: "",
        occupied: false
    });
    const history = useHistory()



    useEffect(
        () => {
            fetch("http://localhost:8080/properties")
            .then(res => res.json())
            .then((propertiesArray) => {
                setProperties(propertiesArray)
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
                    tenantId: property.tenantId,
                    address: property.address,
                    mgrId: property.mgrId,
                    rentAmt: property.rentAmt,
                    occupied: property.occupied
                }
        
            const fetchOption = {
                method: "POST",
                headers: {
                    "Content-Type": "applications/json"
                },
                body: JSON.stringify(newProperty)
            }
            return fetch("http://localhost:8080/properties", fetchOption)
                .then(() => {
                    history.push("/properties")
                })
            }
        

    return (
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
                    <label htmlFor="managerAssigned">Manager:</label>
                    <select defaultValue={'0'}
                        onChange={
                            (evt) => {
                                const copy = {...property}
                                copy.mgrId = parseInt(evt.target.value)
                                updateProperty(copy)
                    }}>
                        <option value="0">Select the manager...</option>
                            {properties.map(property => {
                                return <option value={property.mgrId}>
                                    {UsersList.name}
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
                                copy.tenantId = parseInt(evt.target.value)
                                updateProperty(copy)
                    }}>
                        <option value="0">Select the tenant...</option>
                            {properties.map(property => {
                                return <option value={property.tenantId}>
                                    {property.name}
                                    </option>                        
                            })}   
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



            <button onClick={addNewProperty} className="btn btn-primary">
                Add Property
            </button>
        </form>

    )


}