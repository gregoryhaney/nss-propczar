/*
    The purpose of this component is generate the HTML (JSX)
    that will list the maintenance requests.
    
*/
import React, { useEffect, useState } from "react"

export const MaintenanceRequestsList = () => {
    const [requests, setRequests] = useState([])

    // get all requests from DB via API Fetch
    useEffect(
        () => {
            fetch("http://localhost:8080/maintrequests?_expand=property")
            .then(res => res.json())
            .then((requestsArray) => {
                setRequests(requestsArray)
            })
        },
        []
    )

        // INITIAL FUNCTIONALITY:  Show basic HTML for now

    return (
        <>
        {
            requests.map(
                (request) => {
                    return <div className="maintrequest" key={`maintrequest--${request.id}`}>                        
                        <p> Address: {request.property.address}<br></br>
                            Title: {request.title}.<br></br>
                            Description: {request.description}<br></br>
                            Still Open?: {request.openStatus}<br></br>
                            When Opened: {request.dateOpened}<br></br>  
                            When Closed: {request.dateClosed}<br></br>
                            Repair Notes: {request.repairNotes}<br></br>                                                                   
                        </p>
                        </div>                     
                          }
            )        
        }
        </>
    )
}

