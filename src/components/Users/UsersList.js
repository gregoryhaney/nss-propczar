/*
    The purpose of this component is generate the HTML (JSX)
    that will list the users.
    
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

    const [user, updateUser] = useState({
        name: "",
        email: "",
        role: ""
    });
    const history = useHistory()

            const createUser = () => {           
                    const newUser = () => {
                     //   evt.preventDefault()
            
                            const buildNewUser = {
                                name: user.name,
                                email: user.email,
                                role: user.role
                            }                   
            
                            const fetchOption = {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(buildNewUser)
                            }
                            return fetch("http://localhost:8080/users", fetchOption)
                                .then(() => {
                                    history.push("/users")
                                })
            
                }
            
                    return (
                            <form className="newUserForm">     
                            <h2 className="newUserForm__title">New User</h2>
            
                            <fieldset>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                            onChange={
                                                (evt) => {
                                                    const copy = {...user}
                                                    copy.name = evt.target.value
                                                    updateUser(copy)
                                                }
                                            }
                                        required autoFocus
                                        type="text"
                                        className="form-control"
                                        placeholder="Full name..."
                                        />
                                </div>
                            </fieldset>
            
            
                            <fieldset>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                            onChange={
                                                (evt) => {
                                                    const copy = {...user}
                                                    copy.email = evt.target.value
                                                    updateUser(copy)
                                                }
                                            }
                                        required autoFocus
                                        type="text"
                                        className="form-control"
                                        placeholder="Email address..."
                                        />
                                </div>
                            </fieldset>
            
            
                            <fieldset>
                                <div className="form-group">
                                    <label htmlFor="role">Role:</label>
                                    <input
                                            onChange={
                                                (evt) => {
                                                    const copy = {...user}
                                                    copy.role = evt.target.value
                                                    updateUser(copy)
                                                }
                                            }
                                        required autoFocus
                                        type="text"
                                        className="form-control"
                                        placeholder="Role (Tenant, Manager, or Owner)..."
                                        />
                                </div>
                            </fieldset>           
            
            
                            <button onClick={newUser} className="btn btn-primary">
                                Add New User
                            </button>
            
                            </form>
                    )
               
            }






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
            // add button adjacent to each user to EDIT
            // add button adjacent to each user to DELETE

    return (
        <>
        {
            users.map(
                (user) => {
                    return <div key={`userObj--${user.id}`}>
                            <p>{user.name} is a {user.role}.

                            <button onClick={() => {
                                updateUser(user.id)
                            }}>Edit User</button> 

                            <button onClick={() => {
                                deleteUser(user.id)
                                
                            }}>Delete User</button>
                            </p>
                        </div>                   
                }
            ) 
                   
        }
        
       <h2>Create a New User</h2>
       <article className="newUser">
            <button onClick={() => {
                    createUser()
                    }}>Create New User</button>
            </article>



        </>
    )
}