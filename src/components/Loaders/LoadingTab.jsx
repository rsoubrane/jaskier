import React from "react";

//Utils
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

//Assets
import logo from "../../assets/img/logo.png";
import loading from "../../assets/img/loading.gif";

export default function LoadingTab(props) {
	return props.isVisible ? (
		<ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
			<div className='loader-tab'>
				<div className='content'>
					<img src={logo} width='450' alt='Logo Free Center' />
					<img src={loading} alt='Loading' height='180' />
				</div>
			</div>
		</ReactCSSTransitionGroup>
	) : (
		props.children
	);
}
