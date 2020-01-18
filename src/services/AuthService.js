import React from "react";
import { Route, Redirect } from "react-router-dom";

export const AUTH_TOKEN = localStorage.getItem("user", false);

export const Auth = {
	isAuthenticated: AUTH_TOKEN ? true : false,
	authenticate(cb) {
		this.isAuthenticated = true;
		setTimeout(cb, 100);
	},
	signout(cb) {
		this.isAuthenticated = false;
		localStorage.removeItem("user");
		window.location.reload();
		setTimeout(cb, 100);
	}
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				Auth.isAuthenticated === true ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/signin",
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
};
