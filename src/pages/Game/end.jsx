import React, { Component } from "react";

//Utils
import { Row, Card, CardBody, Form, Col, Button } from "reactstrap";
import BG from "../../assets/img/bg-campaign.png";
import LogoFD from "../../assets/img/logo.png";

export default class ScreenEnd extends Component {
	render() {
		return (
			<Form className='container_game mt--7'>
				<Card className='bg-secondary shadow'>
					<CardBody className='live_quiz_end' style={{ background: `url(${BG})` }}>
						<Row className='justify-content-center align-items-center'>
							<Col>
								<div className='img-logo'>
									<img src={LogoFD} alt='logo' />
								</div>
							</Col>
							<Col>
								<div className='end-text'>
									<h1>Merci pour votre participation !</h1>
								</div>
							</Col>
						</Row>
						<Row className='justify-content-center align-items-center text-center'>
							<Col>
								<Button color='secondary'>Laisser une note</Button>
							</Col>
							<Col>
								<div className='end-text'>
									<Button color='primary'>Rejouer</Button>
								</div>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Form>
		);
	}
}
