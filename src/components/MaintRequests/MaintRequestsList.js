/*
    The purpose of this component is generate the HTML (JSX)
    that will list the maintenance requests.
    This is called by route: "/maintRequests"
    
*/
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

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

                        let open = ""
                    if (request.openStatus === true || request.openStatus === "true") {
                        open = " ** YES ** "
                    } else {
                        open = " NO "
                    }

                    return <div className="maintrequest" key={`maintrequest--${request.id}`}>
                        <article className="maintRequestCard">                      
                        <p> Address: {request.property.address}<br></br>
                            Title: {request.title}.<br></br>
                            Description: {request.description}<br></br>
                            Still Open? {open}<br></br>
                            When Opened: {request.dateOpened}<br></br>  
                            When Closed: {request.dateClosed}<br></br>
                            Repair Notes: {request.repairNotes}<br></br> 
                            <br></br>
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
