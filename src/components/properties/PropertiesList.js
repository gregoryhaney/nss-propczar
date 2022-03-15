/*
    The purpose of this component is generate the HTML (JSX)
    that will list the properties. It will be the main
    view for the home page for the owner view.
    
*/
import React, { useEffect, useState } from "react"

export const PropertiesList = () => {
    const [properties, setProperties] = useState([])
    const [ users, setUsers ] = useState([])
    
   
    const currentLoggedInUserId = parseInt(localStorage.getItem("propczar_user"))

    // get all properties from DB via API Fetch
    const getProperties = () => {    
            fetch("http://localhost:8080/properties?_expand=user")
            .then(res => res.json())
            .then((propertiesArray) => {
                setProperties(propertiesArray)
            })
    }

    const getUsers = () => {
        fetch("http://localhost:8080/users/")
        .then(res => res.json())
        .then((usersArray) => {
            setUsers(usersArray)
        })

    }

    useEffect(
        () => {
           getProperties()
           getUsers()
        },
        []
    )



    return (
        <>
        <hr className="rounded"></hr> 
        {
            properties.map(
                (property) => {
                    
                    let occupiedStatus = ""
                    if (property.occupied === true || property.occupied === 'true') {
                         occupiedStatus = "YES"
                    } else
                    {  occupiedStatus = "** NO **"}

                                       
                    return <div key={`property--${property.id}`}>
                        <article className="propertyCard">
                            <section className="propertyImage">
                                <img src={property.imageURL} />
                            </section>
                  
                            <section className="propertyData">
                                    Address: {property?.address}<br></br>
                                    Rent: ${property?.rentAmt}<br></br>
                                    Tenant: {property?.user.name}<br></br>

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
                            </section>
                        </article> 
                    </div>
                }
            )        
        }
        </>
    )
}
