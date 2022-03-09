/*
    The purposes of this component are:
        1. perform the CRUD operations in
        the DB based on results from the form collected in the
        "PropertyManagementForm.js" component. 
        2. 
    
*/

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { PropertyForm } from "./PropertyManagementForm.js"


const editProperty = (id) => {
    PropertyForm()
}


export const PropertyManagement = () => {
    const [property, setProperty] = useState([])
    const [properties, setProperties] = useState([])
    const history = useHistory()

    // const editProperty = (property.id) => {
    //     PropertyForm()
    // }

    useEffect(
        () => {
            fetch("http://localhost:8080/properties")
            .then(res => res.json())
            .then((propertiesArray) => {
                setProperties(propertiesArray)
            })
        },
        []
    )


    


return (
    <>
    {
        properties.map(
            (property) => {
                return <div key={`property--${property.id}`}>
                    <p>{property.address}
                    <button onClick={() => {
                            editProperty(property.id)
                         }}>Edit Property</button> 
                    </p>

                </div>
            }
        )        
    }
    </>
)




}