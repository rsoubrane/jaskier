import React from "react";
import { Container, Row, Col } from "reactstrap";

export default function Header(props) {
	let height = 300 + (props.description ? 50 : 0) + (props.children ? 50 : 0);

	return (
		<>
			<div
				className='header pb-6 pt-5 pt-lg-12 d-flex align-items-center'
				style={{
					minHeight: height + "px",
					backgroundImage: "url(" + props.background + ")",
					backgroundSize: "cover",
					backgroundPosition: "center"
				}}>
				<span className='mask bg-gradient-default opacity-7' />
				<Container className='align-items-center' fluid>
					<Row>
						<Col lg='10' md='12'>
							{props.headtitle ? (
								<div className='h4 mb-0 text-white text-uppercase d-none d-lg-inline-block'>
									{props.headtitle}
								</div>
							) : null}
							<h1 className='display-2 text-white'>{props.title}</h1>
							{props.description ? <p className='text-white mt-0 mb-5'>{props.description}</p> : null}
							{props.children}
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}
