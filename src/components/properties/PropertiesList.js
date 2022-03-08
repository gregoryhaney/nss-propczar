/*
    The purpose of this component is generate the HTML (JSX)
    that will list the properties. It will be the main
    view for the home page for the owner view.
    
*/
import React, { useEffect, useState } from "react"

export const PropertiesList = () => {
    const [properties, setProperties] = useState([])

    // get all properties from DB via API Fetch
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

// INITIAL FUNCTIONALITY:  Show basic HTML for now

    return (
        <>
        {
            properties.map(
                (property) => {
                    return <div key={`propertyObj--${property.id}`}>
                        <p>Property at {property.address} rents for ${property.rentAmt}.</p>

                    </div>
                }
            )        
        }
        </>
    )
}