/*
    The purpose of this component is generate the HTML (JSX)
    that will list the maintenance requests.
    This is called by route: "/maintRequests"    
*/

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import logo from '../propczar.png'

export const MaintenanceRequestsList = () => {
    const [ requests, setRequests ] = useState([])
    const [ users, setUsers ] = useState([])
    const currentLoggedInUser = parseInt(localStorage.getItem("propczar_user"))
    let currentUserRole = ""
    const history = useHistory()

            // FN to perform the DELETE API method for the specific 
            // maintenance request based on the ID
            const deleteRequest = (id) => {        
                fetch(`http://localhost:8080/maintrequests/${id}`, {
                method: "DELETE"
            })
                .then(getRequests())
            }

            // FN to perform API fetch to get all maintenance requests from the DB
            const getRequests = () => {

                fetch("http://localhost:8080/maintrequests?_expand=property")
                .then(res => res.json())
                .then((requestsArray) => {
                    setRequests(requestsArray)
                })
            }

            // FN to perform API fetch to get all users from the DB
            const getUsers = () => {
                fetch("http://localhost:8080/users")
                .then(res => res.json())
                .then((usersArray) => {
                    setUsers(usersArray)
                })
            }

            // call the above FNs that get all requests and users from DB via API Fetch
            useEffect(
                () => {
                getRequests()
                getUsers()
                },
            []
            )   

        // get role of current user to determine if they're an "OWNER".
        // if so, display all maintenance requests

                for (let user of users) {
                    if (user.id === currentLoggedInUser) {
                        currentUserRole = user.role
                    }
                }

        /* set conditional to check:
                1. if the current user and property manager with
                   the request are equal...if so, display the maintenance request
                2. if the current user has role "OWNER"...if so, display all requests
        */

    return (
        <>
                <hr className="rounded"></hr> 
                <img src={logo} className="App-logo" alt="logo" />
                <hr className="rounded"></hr> 
        {
            requests.map(
                (request) => {
            
            if (request.property.mgrId === currentLoggedInUser || (currentUserRole).toLowerCase() === "owner") {

                        let open = ""
                    if (request.openStatus === false || request.openStatus === "false") {
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
                            <button className="button" onClick={() => {
                                history.push(`EditRequest/${request.id}`)
                            }}>Edit Request</button> 

                            <button className="button" onClick={() => {
                                deleteRequest(request.id)                            
                            }}>Delete Request</button>
                        </p>
                        </article>
                        </div>                     
                          
            } else if (request.property.userId === parseInt(currentLoggedInUser)) {                    

                            let open = ""
                        if (request.openStatus === false || request.openStatus === "false") {
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

                            
                                <button className="button" onClick={() => {
                            if (request.openStatus === "false" || request.openStatus === false) {

                                    history.push(`EditRequest/${request.id}`)
                                } else {window.alert("Cannot edit a closed maintenance request")}
                                }}>Edit Request</button>                              

                            </p>
                            </article>
                            </div>                     
                              }
                            }                        
            )        
        }
        </>
    )
}
