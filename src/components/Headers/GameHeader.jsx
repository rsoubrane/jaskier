import React from "react";
import { Container, Row, Col } from "reactstrap";

export default class GameHeader extends React.Component {
	render() {
		let height = 250;
		return (
			<div
				className='header pb-6 pt-5 pt-lg-12 d-flex align-items-center'
				style={{
					minHeight: height + "px",
					backgroundImage: "url(" + this.props.background + ")",
					backgroundSize: "cover",
					backgroundPosition: "center"
				}}>
				<span className='mask bg-gradient-default opacity-7' />
				<Container className='align-items-center' fluid>
					<Row>
						<Col>
							<h1 className='display-2 text-white text-center'>{this.props.title}</h1>
							{this.props.children}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
