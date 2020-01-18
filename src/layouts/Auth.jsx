import React from "react";

//Utils
import { Container, Row, Col, Card, CardBody } from "reactstrap";

//Components
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";

export default function Auth(props) {
	return (
		<Container className='page-signing'>
			<Row className='h-100'>
				<Col sm='10' md='9' lg='7' className='mx-auto'>
					<Card className='card-signing w-100'>
						<CardBody>{props.location.pathname === "/signin" ? <SignIn /> : <SignUp />}</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
