import React from "react";

//Utils
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

//Assets
import loading from "../../assets/img/loading.gif";

export default function LoadingSpinner(props) {
	return (
		<ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
			{props.isVisible ? (
				<div className='loader-spinner'>
					<div className='content'>
						<img src={loading} alt='Loading' height='180' />
					</div>
				</div>
			) : (
				props.children
			)}
		</ReactCSSTransitionGroup>
	);
}
