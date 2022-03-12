import React from "react";
import { Route } from "react-router-dom"
import { PropertiesList } from "./Properties/PropertiesList";
import { UsersList } from "./Users/UsersList";
import { PropertyManagement } from "./Properties/PropertyManagement";
import { PropertyForm } from "./Properties/PropertyManagementForm";
import { MaintenanceRequestsList } from "./MaintRequests/MaintRequestsList"
import { MaintRequestForm } from "./MaintRequests/MaintRequestForm";
import { UserForm } from "./Users/UserForm";
import { EditProperty } from "./Properties/PropertyEdit";
import { EditRequest } from "./MaintRequests/MaintEdit";
import { EditUser } from "./Users/UserEdit";

export const ApplicationViews = () => {
    return (
        <>
                       
            <Route exact path="/">
                <PropertiesList />
            </Route>

            <Route exact path="/userManagement">
                <UsersList />
            </Route>

            <Route exact path="/propertyManagement">
                <PropertyManagement />
            </Route>

            <Route exact path="/PropertyForm">
                <PropertyForm />
            </Route>

            <Route exact path="/maintRequests">
                <MaintenanceRequestsList />
            </Route>

            <Route exact path="/UserForm">
                <UserForm />
            </Route>

            <Route exact path="/MaintRequestForm">
                <MaintRequestForm />
            </Route>

            <Route exact path="/EditProperty/:propertyId(\d+)">
                <EditProperty />
            </Route>

            <Route exact path="/EditRequest/:requestId(\d+)">
                <EditRequest />
            </Route>

            <Route exact path="/EditUser/:userId(\d+)">
                <EditUser />
            </Route>


        </>
    )
}
