/*
    The purposes of this component are:
        1. perform the CRUD operations in
        the DB based on results from the form collected in the
        "PropertyManagementForm.js" component. 
        2. 
    
*/

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export const PropertyManagement = () => {
    const history = useHistory()
    const [properties, setProperties] = useState([])
    

            const deleteProperty = (id) => {        
                    fetch(`http://localhost:8080/properties/${id}`, {
                    method: "DELETE"
                })
                    .then(getProperties())
            }
        
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
        {
            properties.map(
                (property) => {
                    return <div key={`property--${property.id}`}>
                        <article className="userCard">
                        <p>{property.address} <br></br>

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
