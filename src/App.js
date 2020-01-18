import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Constants
import * as ROUTES from "./routes";

//Utils
import axios from "axios";
import jwtDecode from "jwt-decode";
import { logoutUser } from "./services/Data/user";

//Components
import Navigation from "./components/Navigation";

//Layouts
import AdminLayout from "./layouts/Admin.jsx";
import AuthLayout from "./layouts/Auth.jsx";

//Pages
import Home from "./pages/Home";
import Story from "./pages/Story";
import StoryAdd from "./pages/Story/add";
import Chapter from "./pages/Chapter";
import ChapterAdd from "./pages/Chapter/add";
import Game from "./pages/Game";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Account from "./pages/Account";

//Styles
import "./assets/scss/style.scss";

const token = localStorage.getItem("Token");
//Check if token exists
if (token) {
	const decodedToken = jwtDecode(token);
	//Check if user token still valid
	if (decodedToken.exp * 1000 < Date.now()) {
		logoutUser();
		window.location.href = ROUTES.SIGN_IN;
	} else {
		//Return the token as header
		axios.defaults.headers.common["Authorization"] = token;
	}
}

const App = () => (
	<Router>
		<div>
			{/* <Navigation /> */}
			<Switch>
				<Route exact path={ROUTES.HOME} component={Home} />
				<Route exact path={ROUTES.NEW_STORY} component={StoryAdd} />
				<Route exact path={`${ROUTES.STORY}/:storySlug`} component={Story} />
				<Route exact path={ROUTES.NEW_CHAPTER} component={ChapterAdd} />
				<Route exact path={`${ROUTES.CHAPTER}/:chapterSlug`} component={Chapter} />
				<Route exact path={`${ROUTES.GAME}/:storySlug`} component={Game} />

				<Route exact path={ROUTES.SIGN_IN} render={props => <AuthLayout {...props} />} />
				<Route exact path={ROUTES.SIGN_UP} render={props => <AuthLayout {...props} />} />
				{/* <Route path={ROUTES.ADMIN} component={Admin} /> */}
				<Route path={ROUTES.ACCOUNT} component={Account} />
			</Switch>
		</div>
	</Router>
);
export default App;
