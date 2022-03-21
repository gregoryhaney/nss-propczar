import Reactform from "react";
import { Link } from "react-router-dom"
import "./NavBar.css"
import { useEffect, useState } from "react";


/*
    the FN "NavBar" is broken into conditionals to check the
    current user's role. If the user role is 'manager', select
    LINK items are listed. If the user role is 'owner', all 
    LINK items are listed. Otherwise, only a couple of the LINK items
    get listed.  
*/

export const NavBar = () => {
    const currentLoggedInUser = localStorage.getItem("propczar_user")
    const [ users, setUsers ] = useState([])

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
            
            let role = ""
            for (const user of users) {  
                if (parseInt(currentLoggedInUser) === user.id) {
                    role = user.role
                }
            }

    if (role === "manager") {        
    return (
        <>
            
            <ul className="navbar">

                <li className="navbar__item active">
                    <Link className="nav__link" to="/">Home</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/propertyManagement">Property Management</Link>
                </li>        

                <li className="navbar__item">
                    <Link className="navbar__link" to="/maintRequests">Maintenance Requests</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/Notes">Mgr's Notes</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("propczar_user")
                        }
                    }
                >Logout</Link>
                </li>
            </ul>
        </>    
    )

    } else 
        
    if (role === "owner") { 
    return ( 
        <> 
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="nav__link" to="/">Home</Link>
                </li>

                <li className="navbar__item">
                 <Link className="navbar__link" to="/userManagement">User Management</Link>
                </li> 

                <li className="navbar__item">
                 <Link className="navbar__link" to="/PropertyForm">Create Property</Link>
                </li>


                <li className="navbar__item">
                    <Link className="navbar__link" to="/propertyManagement">Property Management</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/maintRequests">Maintenance Requests</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/Notes">Mgr's Notes</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("propczar_user")
                        }
                    }
                >Logout</Link>
                </li>                
            </ul>
        </>
    )
    }  

        return (
        <>
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="nav__link" to="/">Home</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/maintRequests">View My Maintenance Requests</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/MaintRequestForm">Create NewMaintenance Request</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("propczar_user")
                        }
                    }
                >Logout</Link>
                </li>
            </ul>
        </>
    )
}

// the LINK component has one job: to generate anchor tags
// the "TO" provides the HREF attribute
