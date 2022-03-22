import React from "react";
import { Route } from "react-router-dom"
import { PropertiesList } from "./Properties/PropertiesList";
import { PropertyManagement } from "./Properties/PropertyManagement";
import { EditProperty } from "./Properties/PropertyEdit";
import { PropertyForm } from "./Properties/PropertyManagementForm";
import { MaintenanceRequestsList } from "./MaintRequests/MaintRequestsList"
import { EditRequest } from "./MaintRequests/MaintEdit";
import { MaintRequestForm } from "./MaintRequests/MaintRequestForm";
import { UsersList } from "./Users/UsersList";
import { EditUser } from "./Users/UserEdit";
import { UserForm } from "./Users/UserForm";
import { NotesList } from "./Notes/NotesList";
import { EditNote } from "./Notes/EditNote";
import { NoteForm } from "./Notes/NotesForm";

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

            <Route exact path="/Notes">
                <NotesList />
            </Route>

            <Route exact path="/NoteForm">
                <NoteForm />
            </Route>

            <Route exact path="/EditNote/:id(\d+)">
                <EditNote />
            </Route>

            <Route exact path="/EditProperty/:id(\d+)">
                <EditProperty />
            </Route>

            <Route exact path="/EditRequest/:id(\d+)">
                <EditRequest />
            </Route>

            <Route exact path="/EditUser/:id(\d+)">
                <EditUser />
            </Route>
        </>
    )
}
