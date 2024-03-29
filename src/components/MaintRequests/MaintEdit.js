/*
    The purpose of this component is to perform 
    a DB update for a maintenance request.
    The FN "EditRequests" is called when the user clicks
    the "Edit Request" button from the "MaintRequests.js"
    component. 
    This is called by the route: "/EditRequest"    
*/

import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import logo from '../propczar.png'
 
export const EditRequest = () => {
    const history = useHistory()
    const id = useParams()  
   
    const [ requestToEdit, setRequestToEdit ] = useState([])
    const [ request, updateRequest ] = useState({})   
    
    
    const getRequestToEdit = () => {
        fetch(`http://localhost:8080/maintrequests/${id.id}`)
            .then(res => res.json())
            .then((editRequestArray) => {
                setRequestToEdit(editRequestArray)
        })
    }

    
    // get the request from DB via API Fetch
    useEffect(
        () => {
            getRequestToEdit()
        },
        []
    )
        
        // edRequest object builder
        const edRequest = {
            title: request.title,
            description: request.description,
            dateOpened: request.dateOpened,
            dateClosed: request.dateClosed,
            openStatus: request.openStatus,           // false means ticket is OPEN
            repairNotes: request.repairNotes
        }

        const makeTheUpdate = () => {
        // PATCH action of edited request object
        const fetchOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(edRequest)
        }
        return fetch(`http://localhost:8080/maintrequests/${id.id}`, fetchOption)
            .then(() => {
                history.push("/maintRequests")
            })      

        }


        return (
            <>
                <hr className="rounded"></hr> 
                <img src={logo} className="App-logo" alt="logo" />
                <hr className="rounded"></hr>
                <form className="editRequestForm">
                <h2 className="editRequestForm__title">Edit an Existing Maintenance Request</h2>
    

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
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
                                placeholder = {requestToEdit.title}
                                />
                        </div>
                    </fieldset>
    
    
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
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
                                placeholder = {requestToEdit.description}
                                />
                        </div>
                    </fieldset>



                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="dateOpened">Date Opened:</label>
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = {...request}
                                        copy.dateOpened = evt.target.value
                                        updateRequest(copy)
                                    }
                                }
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder = {requestToEdit.dateOpened}
                                />
                        </div>
                    </fieldset>


                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="dateClosed">Date Closed:</label>
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = {...request}
                                        copy.dateClosed = evt.target.value
                                        updateRequest(copy)
                                    }
                                }
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder = {requestToEdit.dateClosed}
                                />
                        </div>
                    </fieldset>

                    
                    <fieldset>
                        <div className="form-group">
                           <label htmlFor="openStatus">Request Ticket Status:</label><br></br>
                               <select className="openStatus" id="openStatus" 
                                value={requestToEdit.openStatus}
                             onChange={
                                (evt) => {
                                    const copy = {...request}
                                    copy.openStatus = evt.target.value
                                    updateRequest(copy)
                                }
                            }>
                            <option value="true">Closed</option>
                            <option value="false">Open</option>      
                             </select>
                        </div>
                    </fieldset>

        
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="notes">Repair Notes:</label>
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = {...request}
                                        copy.repairNotes = evt.target.value
                                        updateRequest(copy)
                                    }
                                }
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder = {requestToEdit.repairNotes}
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

