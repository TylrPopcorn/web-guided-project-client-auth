import React from 'react';
import { Route, Redirect, } from "react-router-dom"

/*
1. Render a <Route /> and pass the props through it.
2. Check if the user is authenticated. 
    If so, 
        it renders the "component" prop.
    Else, 
        Redirect the user to /login
*/

const privateRoute = ({ component: Component, ...props }) => {
    return <Route
        {...props} //route props
        render={(rest) => {
            if (localStorage.getItem('token')) {
                //user is authenticated -> render the component.
                return <Component {...rest} {...props} />
            } else {
                //user is not authenticated -> redirect to login
                // return <h1> You is not allowed her bro! </h1>
                return <Redirect to="/login" />
            }
        }}
    />
}


export default privateRoute