import React from "react";

//Utils
import { Route, Switch } from "react-router-dom";
import { store } from "react-notifications-component";

//Services
import { Auth } from "../services/AuthService";

//Components
import LoadingScreen from "../components/Loaders/LoadingScreen";
import Navigation from "../components/Navigation";

//Pages
import Story from "../pages/Story";
import StoryAdd from "../pages/Story/add";
import Chapter from "../pages/Chapter";

//Routes
import * as routes from "../routes.js";

class Admin extends React.Component {
	state = {
		loading: true,
		campaigns: false
	};

	componentDidMount() {
		this.getStorys();
	}

	getRoutes = routes => {
		if (localStorage.getItem("user")) {
			const userAccess = JSON.parse(localStorage.getItem("user")).allow[0];
			return routes.map((prop, key) => {
				if (prop.layout === "/admin" && userAccess === prop.allow) {
					return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
				} else {
					return null;
				}
			});
		}
	};

	getRoutesStory = () => {
		let routes = [];
		if (this.state.campaigns) {
			this.state.campaigns.forEach((prop, key) => {
				routes.push(
					<Route
						key={key}
						exact
						path={"/admin/campaign/" + prop.slug}
						render={() => <Story id={prop.id} slug={prop.slug} refresh={this.getStorys} />}
					/>
				);
				routes.push(
					<Route
						key={key}
						exact
						path={"/admin/campaign/" + prop.slug + "/survey/add"}
						render={() => <StoryAdd campaign={prop} />}
					/>
				);
				routes.push(this.getRoutesChapter(prop));
			});
		}
		return routes;
	};

	getRoutesChapter = campaign => {
		let routes = [];
		routes.push(
			<Route
				exact
				path={`/admin/campaign/${campaign.slug}/survey/:surveySlug`}
				render={props => <Chapter {...props} />}
			/>
		);
		return routes;
	};

	callNotification = (type, title, message) => {
		store.addNotification({
			title: title,
			message: message,
			type: type,
			insert: "top",
			container: "bottom-right",
			animationIn: ["animated", "fadeIn"],
			animationOut: ["animated", "fadeOut"],
			dismiss: { duration: 5000 },
			dismissable: { click: true }
		});
	};

	render() {
		return (
			<LoadingScreen isVisible={this.state.loading}>
				<div className='main-content' ref='mainContent'>
					<Navigation {...this.props} />
					<Switch>
						{this.getRoutes(routes)}
						{this.getRoutesStory()}
					</Switch>
				</div>
			</LoadingScreen>
		);
	}
}

export default Admin;
