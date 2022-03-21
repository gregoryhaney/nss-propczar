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
import logo from '../propczar.png'

export const UsersList = () => {
    const [users, setUsers] = useState([])
  

    // variable to get current user so his/her role can be determined
        // role determines what properties the user gets to view
        const currentLoggedInUserId = parseInt(localStorage.getItem("propczar_user"))
        let currentUserRole = ""

    // iterate through all users until current user is found, then
        // determine role of currently logged-in user
        for (const user of users) {
            if (currentLoggedInUserId === user.id) {
                currentUserRole = user.role
            }
        }

    // FN to perform DELETE API method when a user clicks the DELETE
    // button for a particular user.
    // Prevent the deletion of the property owner using conditionals
    const deleteUser = (role, id) => {
        if ((role).toLowerCase() === 'owner') {
            window.alert("Cannot delete the Property Owner")
        } else {
            fetch(`http://localhost:8080/users/${id}`, {
            method: "DELETE"
         })
            .then(getUsers())
            .then(() => {
                history.push('userManagement/')
            })
        }
    }

    const history = useHistory()


    // FN to retrieve all users via API fetch from DB
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
            // button at top of page to CREATE NEW USER
            // display simple user list
            // button under each user to EDIT
            // button under each user to DELETE            

    return (
        
        <>
              <hr className="rounded"></hr> 
              <img src={logo} className="App-logo" alt="logo" />
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
                                deleteUser(user.role, user.id)                               
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
