import React from "react";

//Utils
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

//Assets
import logo from "../../assets/img/logo.png";
import loading from "../../assets/img/loading.gif";

export default function LoadingScreen(props) {
	return (
		<ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
			{props.isVisible ? (
				<div className='loader-page'>
					<div className='content'>
						<img src={logo} width='450' alt='Logo' />
						<img src={loading} alt='Loading' height='180' />
					</div>
				</div>
			) : (
				props.children
			)}
		</ReactCSSTransitionGroup>
	);
}
