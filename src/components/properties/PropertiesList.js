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
            fetch("http://localhost:8080/properties?_expand=user")
            .then(res => res.json())
            .then((propertiesArray) => {
                setProperties(propertiesArray)
            })
        },
        []
    )

// INITIAL FUNCTIONALITY:  Show basic HTML for now

        // TODO
        // to get the value for Property Manager, need 
        // a .filter() or .find()

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
                    {  occupiedStatus = "NO"}
                    return <div key={`property--${property.id}`}>
                        <article className="propertyCard">
                            <section className="propertyImage">
                                <img src={property.imageURL} />
                            </section>

                            <section className="propertyData">
                                <p> Address: {property.address}<br></br>
                                    Rent: ${property.rentAmt}<br></br>
                                    Tenant: {property.user.name}<br></br>
                                    Property Manager: {property.mgrId.name}<br></br>
                                    Occupied: {occupiedStatus}<br></br>                                                                     
                                </p>
                            </section>
                        </article> 
                    </div>
                }
            )        
        }
        </>
    )
}

