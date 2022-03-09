import React from "react";
import { Route } from "react-router-dom"
import { PropertiesList } from "./Properties/PropertiesList";
import { UsersList } from "./Users/UsersList";
import { PropertyManagement } from "./Properties/PropertyManagement";


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


        </>
    )
}
