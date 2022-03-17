/*
    The purposes of this component are:
    1. generate the HTML (JSX) that will list the users.
    2. provide a "Create New User" button at the top of the page
        a. it will go to route: "/UserForm"
    3. provide an "Edit User" and "Delete User" button
    for each user.
        a. "Edit User" goes to route "/EditUser" 
        b. "Delete User" performs the "deleteUser" FN within this component
*/

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export const UsersList = () => {
    const [users, setUsers] = useState([])
  
    const deleteUser = (id) => {
        if (id === 1) {
            window.alert("Cannot delete the Property Owner")
        } else {
            fetch(`http://localhost:8080/users/${id}`, {
            method: "DELETE"
         })
            .then(getUsers())
        }
    }

    const history = useHistory()

    const getUsers = () => {
        fetch("http://localhost:8080/users")
        .then(res => res.json())
        .then((usersArray) => {
            setUsers(usersArray)
        })
    }


    // call FN to get all users from DB via API Fetch
    useEffect(
        () => {
           getUsers()
        },
        []
    )
            // add button at top of page to CREATE NEW USER
            // display simple user list
            // add button under each user to EDIT
            // add button under each user to DELETE            

    return (
        
        <>
              <hr className="rounded"></hr> 
                <h1>PropCzar</h1>
                <hr className="rounded"></hr>
              
                <h2>Create a New User</h2>
                <article className="newUser">
                    <button onClick={() => {                
                        history.push(`UserForm`)
                            }}>Create New User</button> 
                            <br></br> 
                            <hr className="rounded"></hr>  
                </article>                     
        {
            
            users.map(
                (user) => {
                    return <div key={`userObj--${user.id}`}>
                        <article className="userCard">
                            <p>
                            User Name: {user.name} <br></br>
                            Role: {user.role}<br></br>
                            <br></br>
                            <button onClick={() => {
                                history.push(`EditUser/${user.id}`)
                            }}>Edit User</button> 
                            
                            <button onClick={() => {
                                deleteUser(user.id) 
                                history.push(`userManagement/`)                               
                            }}>Delete User</button>
                                
                            </p>
                        </article>
                        </div>                   
                }
            ) 
        }
        </>
    )
}
