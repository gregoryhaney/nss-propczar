import Reactform from "react";
import { Link } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="nav__link" to="/">Home</Link>
            </li>
        
            <li className="navbar__item">
                <Link className="navbar__link" to="/userManagement">User Management</Link>
            </li> 

            <li className="navbar__item">
                <Link className="navbar__link" to="/propertyManagement">Property Management</Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="/PropertyForm">Owner: Create Property</Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="/maintRequests">Maintenance Requests</Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="/MaintRequestForm">Tenant: Create Maintenance Request</Link>
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
        
    )
}


// the LINK component has one job: to generate anchor tags
// the "TO" provides the HREF attribute