import React, { useState } from "react";

//Utils
import { Button, Card, CardBody, FormGroup, Form, Container, Row, Col, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";

//Components
import Header from "../../components/Headers/Header";
import FormInput from "../../components/Forms/Form";

// Assets
import bgDefault from "../../assets/img/bg-campaign.png";
import profile from "../../assets/img/profile.png";

export default function ChapterAdd() {
	const history = useHistory();

	const [user] = useState({ username: "rsoubrane" });
	const [errors] = useState(false);
	const [disableForm, setDisableForm] = useState(false);

	const handleChange = e => {};

	const submitChapter = () => {
		if (!disableForm) {
			setDisableForm(true);
		}
	};

	const previewStyle = {
		display: "block",
		maxWidth: 300,
		maxHeight: 200
	};

	return (
		<>
			<Header background={bgDefault} title='Ajouter un chapitre' />
			<Container fluid>
				<Row>
					<Col className='order-xl-2 mb-5 mb-xl-0' xl='4' md='12'>
						<Card className='card-profile shadow'>
							<Row className='justify-content-center'>
								<Col className='order-lg-2' lg='3'>
									<div className='card-profile-image'>
										<img alt='...' className='rounded-circle' src={profile} />
									</div>
								</Col>
							</Row>
							<CardBody className='pt-0 pt-md-4'>
								<Row>
									<Col>
										<div className='text-center mt-8'>
											<h3>{user.username}</h3>
											<div className='h5 font-weight-300'>
												<i className='ni location_pin mr-2' />
												Créateur du chapitre
											</div>
										</div>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
					<Col className='order-xl-1' xl='8'>
						<Form>
							<Card className='bg-secondary shadow'>
								<CardBody>
									<h6 className='heading-small text-muted mb-4'>Informations</h6>
									<div className='pl-lg-4'>
										<Row>
											<Col lg='12'>
												<FormInput.InputText
													label='Nom du chapitre'
													placeholder='Nom du chapitre'
													id='name'
													name='name'
													change={handleChange}
													error={errors ? errors["name"] : false}
												/>
											</Col>
										</Row>
										<Row>
											<Col lg='12'>
												<FormInput.InputTextArea
													label='Description du chapitre'
													placeholder='Description du chapitre'
													id='description'
													name='description'
													change={handleChange}
													error={errors ? errors["description"] : false}
												/>
											</Col>
										</Row>
									</div>
									<hr className='my-4' />
									<h6 className='heading-small text-muted mb-4'>Design du chapitre</h6>
									<div className='pl-lg-4'>
										<Row>
											<Col lg='4'>
												<FormGroup>
													<label className='form-control-label' htmlFor='input-username'>
														Image du chapitre
													</label>
													<img alt='Preview' src={bgDefault} style={previewStyle} />
												</FormGroup>
											</Col>
											<Col lg='8' md='12'>
												<FormGroup>
													<label className='form-control-label' htmlFor='input-username'>
														Changer d'image
													</label>
												</FormGroup>
											</Col>
										</Row>
									</div>
								</CardBody>
								<CardFooter className='bg-white border-0'>
									<Row className='align-items-center'>
										<Col className='text-right' xs='12'>
											<Button
												color='danger'
												onClick={() => history.goBack()}
												size='md'
												disabled={disableForm}>
												Annuler
											</Button>
											<Button
												color='primary'
												onClick={() => submitChapter()}
												size='md'
												disabled={disableForm}>
												Créer le chapitre
											</Button>
										</Col>
									</Row>
								</CardFooter>
							</Card>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
}
