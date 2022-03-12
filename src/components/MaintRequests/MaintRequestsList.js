/*
    The purpose of this component is generate the HTML (JSX)
    that will list the maintenance requests.
    
*/
import React, { useEffect, useState } from "react"

import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"



export const MaintenanceRequestsList = () => {
    const [requests, setRequests] = useState([])
    const history = useHistory()

            const deleteRequest = (id) => {        
                fetch(`http://localhost:8080/maintrequests/${id}`, {
                method: "DELETE"
            })
                .then(getRequests())
            }

            const getRequests = () => {

                fetch("http://localhost:8080/maintrequests?_expand=property")
                .then(res => res.json())
                .then((requestsArray) => {
                    setRequests(requestsArray)
                })
            }



            // get all requests from DB via API Fetch
            useEffect(
                () => {
                getRequests()
                },
            []
            )   

    

    return (
        <>
        <hr className="rounded"></hr> 
        {
            requests.map(
                (request) => {
                    return <div className="maintrequest" key={`maintrequest--${request.id}`}>
                        <article className="maintRequestCard">                      
                        <p> Address: {request.property.address}<br></br>
                            Title: {request.title}.<br></br>
                            Description: {request.description}<br></br>
                            Still Open?: {request.openStatus}<br></br>
                            When Opened: {request.dateOpened}<br></br>  
                            When Closed: {request.dateClosed}<br></br>
                            Repair Notes: {request.repairNotes}<br></br> 

                            <button onClick={() => {
                                history.push(`EditRequest/${request.id}`)
                            }}>Edit Request</button> 

                            <button onClick={() => {
                                deleteRequest(request.id)                            
                            }}>Delete Request</button>
                        </p>
                        </article>
                        </div>                     
                          }
            )        
        }
        </>
    )
}
