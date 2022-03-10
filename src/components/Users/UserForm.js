import React, { useState } from "react"
import { useHistory } from "react-router-dom";

export const UserForm = () => {   

    const [user, updateUser] = useState({
        name: "",
        email: "",
        role: ""
    });
    const history = useHistory()

        const newUser = (evt) => {
            evt.preventDefault()

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