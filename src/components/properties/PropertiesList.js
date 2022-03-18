/*
    The purpose of this component is generate the HTML (JSX)
    that will list the properties. It will be the main
    view for the home page for the owner view.    
*/
import React, { useEffect, useState } from "react"
import logo from '../propczar.png'

export const PropertiesList = () => {
    const [ properties, setProperties ] = useState([])
    const [ users, setUsers ] = useState([])
    const [ notes, setNotes ] = useState([])    
   
    const currentLoggedInUserId = parseInt(localStorage.getItem("propczar_user"))
    let currentUserRole = ""

    // get all properties from DB via API Fetch
    const getProperties = () => {    
            fetch("http://localhost:8080/properties?_expand=user")
            .then(res => res.json())
            .then((propertiesArray) => {
                setProperties(propertiesArray)
            })
    }

    const getUsers = () => {
        fetch("http://localhost:8080/users")
        .then(res => res.json())
        .then((usersArray) => {
            setUsers(usersArray)
        })

    }

    const getNotes = () => {
        fetch("http://localhost:8080/notes")
        .then(res => res.json())
        .then((notesArray) => {
            setNotes(notesArray)
        })

    }

    useEffect(
        () => {
           getProperties()
           getUsers()
           getNotes()
        },
        []
    )

    // determine what the currently logged-in user's role is

            for (const user of users) {
                if (currentLoggedInUserId === user.id) {
                    currentUserRole = user.role
                }
            }
          
/*
    set of conditionals to display properties based on user.role
    first IF block is for the role of "OWNER" - display all properties
    second block is for role "MANAGER" - display restricted to
            properties for which they're the manager
    third block if for role "TENANT" - display only their property
*/

        if ((currentUserRole).toLowerCase() === "owner") {
            return (
                <>
                <hr className="rounded"></hr> 
                <img src={logo} className="App-logo" alt="logo" />
                
                <hr className="rounded"></hr>
                {
                    properties.map(
                        (property) => {
                           
                            let occupiedStatus = ""
                            let tenantName = ""
                            if (property.occupied === true || property.occupied === 'true') {
                                occupiedStatus = "YES"
                                tenantName = property.user.name
                            } else
                            {  occupiedStatus = "** NO **"
                            tenantName = "No Tenant"
                            }
                            
                                            
                            return <div key={`property--${property.id}`}>
                                <article className="propertyCard">
                                    <section className="propertyImage">
                                        <img src={property.imageURL} />
                                    </section>
                        
                                    <section className="propertyData">
                                            Address: {property?.address}<br></br>
                                            Rent: ${property?.rentAmt}<br></br>
                                            Tenant: {tenantName}<br></br>
                                            
                                            {
                                            users.map(
                                            (user) => {
                                                if (property.mgrId === user.id){
                                                return <div key={`propertyData--${user.id}`}>
                                                    <section className="managerName">
                                                    Property Manager: {user.name}<br></br>
                                                    </section>
                                                </div>
                                                }                      
                                            })                                               
                                            }
                                                                                
                                            Occupied: {occupiedStatus}<br></br>  

                                            {
                                            notes.map(
                                            (note) => {
                                                if (property.id === note.propertyId){
                                                return <div key={`propertyNote--${note.id}`}>
                                                    <section className="propNotes">
                                                    Manager Notes: {note.note} on {note.date}<br></br>
                                                    </section>
                                                </div>
                                                }                      
                                            })                                               
                                            }                                                         
                                    </section>
                                </article> 
                            </div>
                        }
                    )        
                }
                </>
            )



        } else if ((currentUserRole).toLowerCase() === "manager"){
            return (
                <>
                <hr className="rounded"></hr> 
                <img src={logo} className="App-logo" alt="logo" />
                <hr className="rounded"></hr>
                {
                    properties.map(
                        (property) => {
                           
                            let occupiedStatus = ""
                            let tenantName = ""
                            if (property.occupied === true || property.occupied === 'true') {
                                occupiedStatus = "YES"
                                tenantName = property.user.name
                            } else
                            {  occupiedStatus = "** NO **"
                            tenantName = "No Tenant"
                            }


                            if (property.mgrId === currentLoggedInUserId) {

                                            
                            return <div key={`property--${property.id}`}>
                                <article className="propertyCard">
                                    <section className="propertyImage">
                                        <img src={property.imageURL} />
                                    </section>
                        
                                    <section className="propertyData">
                                            Address: {property?.address}<br></br>
                                            Rent: ${property?.rentAmt}<br></br>
                                            Tenant: {tenantName}<br></br>

                                            {
                                            users.map(
                                            (user) => {
                                                if (property.mgrId === user.id){
                                                return <div key={`managerName--${user.id}`}>
                                                    <article className="managerName">
                                                    Property Manager: {user.name}<br></br>
                                                    </article>
                                                </div>
                                                }                      
                                            })                                               
                                            }                                    
                                            Occupied: {occupiedStatus}<br></br> 
                                            
                                            {
                                            notes.map(
                                            (note) => {
                                                if (property.id === note.propertyId){
                                                return <div key={`propertyNote--${note.id}`}>
                                                    <section className="propNotes">
                                                    Manager Notes: {note.note} on {note.date}<br></br>
                                                    </section>
                                                </div>
                                                } 
                                            })                                               
                                        }                                                                
                                    </section>
                                </article> 
                            </div>
                            }
                        }
                    )        
                }
                </>
            )


        } else if ((currentUserRole).toLowerCase() === "tenant") {
            return (
                <>
                <hr className="rounded"></hr>
                <img src={logo} className="App-logo" alt="logo" /> 
                <hr className="rounded"></hr>
                {
                    properties.map(
                        (property) => {
                 
                            if (property.userId === currentLoggedInUserId) {
                                  
                            return <div key={`property--${property.id}`}>
                                <article className="propertyCard">
                                    <section className="propertyImage">
                                        <img src={property.imageURL} />
                                    </section>
                        
                                    <section className="propertyData">
                                            Your Address: {property?.address}<br></br>
                                            Your Monthly Rent: ${property?.rentAmt}<br></br>
                                            Tenant (You): {property.user.name}<br></br>

                                            {
                                            users.map(
                                            (user) => {
                                                if (property.mgrId === user.id){
                                                return <div key={`managerName--${user.id}`}>
                                                    <article className="managerName">
                                                    Your Property Manager: {user.name}<br></br>
                                                    </article>
                                                </div>
                                                }                      
                                            })                                               
                                            }                                    
                                           <br></br>                                                           
                                    </section>
                                </article> 
                            </div>
                            }
                        }
                    )        
                }
                </>
            )



        } else 
            return (
                <>
                    <hr className="rounded"></hr> 
                    <article className="unauthorized">                                               
                        <p> You are an UNAUTHORIZED USER</p>                        
                    </article>
                </>         
            )
}
