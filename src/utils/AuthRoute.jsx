import React from "react";

//React Router
import { Route, Redirect } from "react-router-dom";

//Check if user needs to be redirected or if we can display the component
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route {...rest} render={props => (authenticated === true ? <Redirect to='/' /> : <Component {...props} />)} />
);

export default AuthRoute;
