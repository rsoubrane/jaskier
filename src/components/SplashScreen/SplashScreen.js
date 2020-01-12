import React, { Component } from "react";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class SplashScreen extends Component {
	render() {
		return (
			<ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
				{this.props.isVisible ? (
					<div className='splash-screen'>
						<div className={"content"}>
							<div className={"splash-screen-loading"}>
								<img src={"https://www.mycloud.ma/img/loading.gif"} alt={"Loading"} height={"180"} />
							</div>
						</div>
					</div>
				) : (
					<div>{this.props.children}</div>
				)}
			</ReactCSSTransitionGroup>
		);
	}
}
