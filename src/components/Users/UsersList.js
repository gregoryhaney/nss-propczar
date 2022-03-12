/*
    The purpose of this component is generate the HTML (JSX)
    that will list the users.
    
*/
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserForm } from "./UserForm" 

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


    // get all users from DB via API Fetch
    useEffect(
        () => {
           getUsers()
        },
        []
    )

            // display simple user list
            // add button under each user to EDIT
            // add button under each user to DELETE
            // add button at bottom of page to CREATE NEW USER

    return (
        
        <>
              <hr className="rounded"></hr>                         
        {
            
            users.map(
                (user) => {
                    return <div key={`userObj--${user.id}`}>
                        <article className="userCard">
                            <p>{user.name} is a property {user.role}.<br></br>

                            <button onClick={() => {
                                history.push(`EditUser/${user.id}`)
                            }}>Edit User</button> 

                            <button onClick={() => {
                                deleteUser(user.id)                                
                            }}>Delete User</button>
                            </p>
                        </article>
                        </div>                   
                }
            ) 
                   
        }
         <hr className="rounded"></hr>
         <h2>Create a New User</h2>
         <article className="newUser">
            <button onClick={() => {                
                UserForm()
                    }}>Create New User</button>
         </article>
        </>
    )
}
