/*
    The purposes of this component are:
        1. list each property's street address with 
        two action buttons: "Edit Property" && "Delete Property"
        2. perform the DELETE operations in
        the DB if the "Delete Property" button
        is clicked on the route "/propertyManagement". 
        3. pass the user to the route "/EditProperty"
        when the "Edit Property" button for an address is clicked    
*/

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import logo from '/Users/gregoryhaney/workspace/propczar/src/propczar.png'

export const PropertyManagement = () => {
    const history = useHistory()
    const [properties, setProperties] = useState([])
    
    // FN to process the DELETE API call when the user
    // clicks the "DELETE" button for an address
            const deleteProperty = (id) => {        
                    fetch(`http://localhost:8080/properties/${id}`, {
                    method: "DELETE"
                })
                    .then(getProperties())
            }
    // FN to fetch all properties to display to the user    
            const getProperties = () => {
            
                    fetch("http://localhost:8080/properties")
                    .then(res => res.json())
                    .then((propertiesArray) => {
                        setProperties(propertiesArray)
                    })
            }

        
    
        // get all properties from DB via API Fetch
        useEffect(
            () => {
               getProperties()
            },
            []
        )    


    return (
        <>
                <hr className="rounded"></hr> 
                <img src={logo} className="App-logo" alt="logo" />
                <hr className="rounded"></hr>
        {
            properties.map(
                (property) => {
                    return <div key={`property--${property.id}`}>
                        <article className="userCard">
                        <p>{property.address} <br></br>
                        <br></br>
                        <button onClick={() => {
                               
                                history.push(`EditProperty/${property.id}`)
                            }}>Edit Property</button> 

                        <button onClick={() => {
                                deleteProperty(property.id)                            
                            }}>Delete Property</button>
                        </p>
                        </article>

                    </div>
                }
            )        
        }
        </>
    )
}
