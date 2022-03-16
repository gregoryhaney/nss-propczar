/*
    The purpose of this component is to provide the
    form to be used by a tenant to create a new
    maintenance request.
    This is called by route: "/MaintRequestForm"
*/

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

export const MaintRequestForm = () => {
        const [properties, setProperties] = useState([])
        const [request, updateRequest] = useState({
        title: "",
        description: ""        
    });
    
    const history = useHistory()
    const currentLoggedInUser = localStorage.getItem("propczar_user")
    
        // build the object that will be sent via API when form is submitted
            // use the preventDefault to prevent default browser behavior
            // after the form is submitted
        const addNewRequest = (evt) => {
            evt.preventDefault()

         // calculate & format today's date
         // it will be auto-filled into new tickets
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();                            
            today = yyyy + '-' + mm + '-' + dd   

                const newRequest = {
                    title: request.title,
                    description: request.description,
                    propertyId: request.propertyId,
                    dateOpened: today,
                    dateClosed: "",
                    openStatus: "false",  // false = ticket is open
                    repairNotes: ""
                }
        
            const fetchOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newRequest)
            }
            return fetch("http://localhost:8080/maintrequests", fetchOption)
                .then(() => {

                    // use the useHistory hook to take user back
                    // to the list of maint requests after the update to the DB
                    // this is done with the 'history' variable that was set above
                    history.push("/maintRequests")
                })
            }
        
            // fetch the property to use in the form's dropdown
            // this fetch is qualified with the variable "currentLoggedInUser",
            // which is set to the value from localStorage for "propczar_user".
            // it shows only the user's address in the dropdown to prevent
            // the user from opening maint requests on other tenants' properties
            useEffect(
                () => {
                    fetch(`http://localhost:8080/properties?userId=${currentLoggedInUser}`)
                    .then(res => res.json())
                    .then((propertiesArray) => {
                        setProperties(propertiesArray)
                    })
                },
                []
            )

    /*
        The 'return' block contains the three-part form for submitting a
        maintenance request. For each field, state is copied and
        modifications are done to the copy.
            a. Brief Title is a free-form text box
            b. Detailed Request Description is a free-form text box
            c. Select the address is a drop-down list of properties
    */

    return (
        <>
                <hr className="rounded"></hr> 
                <h1>PropCzar</h1>
                <hr className="rounded"></hr> 
            <form className="newRequestForm">
            <h2 className="newRequestForm__title">Create New Maintenance Request</h2>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Brief Title:</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...request}
                                    copy.title = evt.target.value
                                    updateRequest(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Brief title/subject..."
                            />
                    </div>
                </fieldset>



                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Detailed Request Description:</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...request}
                                    copy.description = evt.target.value
                                    updateRequest(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Detailed description of the request..."
                            />
                    </div>
                </fieldset>



                <fieldset>
                <div className="form-group">
                    <label htmlFor="pickProperty">Select the Address:</label>
                    <select defaultValue={'0'}
                        onChange={
                            (evt) => {
                                const copy = {...request}
                                copy.propertyId = evt.target.value
                                updateRequest(copy)
                    }}>
                        <option value="0">Choose...</option>
                            {properties.map(property => {
                                return <option key={`properties--${property.id}`} value={property.id}>
                                    {property.address}
                                    </option>                        
                            })}   
                    </select>
                </div>
            </fieldset>


            <br></br>
            <button onClick={addNewRequest} className="btn btn-primary">
                Submit Request
            </button>
        </form>
        </>
    )

}
