/*
    The purpose of this component is generate the HTML (JSX)
    that will list the users.
    
*/
import React, { useEffect, useState } from "react"

export const UsersList = () => {
    const [users, setUsers] = useState([])

    // get all users from DB via API Fetch
    useEffect(
        () => {
            fetch("http://localhost:8080/users")
            .then(res => res.json())
            .then((usersArray) => {
                setUsers(usersArray)
            })
        },
        []
    )



    return (
        <>
        {
            users.map(
                (user) => {
                    return <div key={`userObj--${user.id}`}>
                        <p>{user.name} has the role of {user.role}.</p>

                    </div>
                }
            )

        
        }
        </>
    )
}