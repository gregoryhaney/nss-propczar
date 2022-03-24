/*
    The purpose of this component is generate the HTML (JSX)
    that will list the properties. It will be the main
    view for the home page for the users.    
*/
import React, { useEffect, useState } from "react"
import logo from '../propczar.png'

export const PropertiesList = () => {
    // variables for state
    const [ properties, setProperties ] = useState([])
    const [ users, setUsers ] = useState([])
    const [ notes, setNotes ] = useState([])    
   
    // variable to get current user so his/her role can be determined
    // role determines what properties the user gets to view
    const currentLoggedInUserId = parseInt(localStorage.getItem("propczar_user"))
    let currentUserRole = ""

    // get all properties & expand the user object from DB via API Fetch
    const getProperties = () => {    
            fetch("http://localhost:8080/properties?_expand=user")
            .then(res => res.json())
            .then((propertiesArray) => {
                setProperties(propertiesArray)
            })
    }

    // FN to get all  'users' objects from the DB via API fetch
    const getUsers = () => {
        fetch("http://localhost:8080/users")
        .then(res => res.json())
        .then((usersArray) => {
            setUsers(usersArray)
        })

    }

    // FN to get all 'notes' objects from DB via API fetch
    const getNotes = () => {
        fetch("http://localhost:8080/notes")
        .then(res => res.json())
        .then((notesArray) => {
            setNotes(notesArray)
        })

    }

    // FN to call API fetches for 'properties', 'users', & 'notes'
    useEffect(
        () => {
           getProperties()
           getUsers()
           getNotes()
        },
        []
    )

    // iterate through all users until current user is found, then
    // determine role of currently logged-in user
            for (const user of users) {
                if (currentLoggedInUserId === user.id) {
                    currentUserRole = user.role
                }
            }
          
/*
    set of conditionals to display properties based on user.role
    a. first IF block is for the role of "OWNER" - display all properties
    b. second IF block is for role "MANAGER" - display restricted to
            properties for which they're the manager
    c. third IF block is for role "TENANT" - display only their property
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
                                            Address: {property?.address}<br></br><br></br>
                                            Rent: ${property?.rentAmt}<br></br><br></br>
                                            Tenant: {tenantName}<br></br><br></br>
                                            
                                            {
                                            users.map(
                                            (user) => {
                                                if (property.mgrId === user.id){
                                                return <div key={`propertyData--${user.id}`}>
                                                    <section className="managerName">
                                                    Property Manager: {user.name}<br></br><br></br>
                                                    </section>
                                                </div>
                                                }                      
                                            })                                               
                                            }
                                                                                
                                            Occupied: {occupiedStatus}<br></br><br></br>  

                                            {
                                            notes.map(
                                            (note) => {
                                                if (property.id === note.propertyId){
                                                return <div key={`propertyNote--${note.id}`}>
                                                    <section className="propNotes">
                                                    Manager Notes: {note.note} on {note.date}<br></br><br></br>
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
