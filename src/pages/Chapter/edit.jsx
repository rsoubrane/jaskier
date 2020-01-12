import React from "react";
import { Button, Card, CardBody, FormGroup, Form, Container, Row, Col, CardFooter } from "reactstrap";

//Components
import FormInput from "../../components/Forms/Form";

// Assets
import bgDefault from "../../assets/img/bg-campaign.png";

class ChapterEdit extends React.Component {
	state = {
		form: {
			name: this.props.chapter.name,
			description: this.props.chapter.description,
			image: this.props.chapter.image ? this.props.chapter.image.base64 : null,
			icon: this.props.chapter.icon
		},
		slug: this.props.slug,
		errors: false,
		chapter: this.props.chapter,
		disableForm: false
	};

	handleChange = e => {
		let id = e.target.id;
		let value = e.target.value;
		let form = this.state.form;
		form[id] = value;
		this.setState({ form: form });
	};

	handleChangeSelect = option => {
		let form = this.state.form;
		form["icon"] = option.value;
		this.setState({
			form: form,
			option: option
		});
	};

	submitChapter = () => {
		if (!this.state.disableForm) {
			this.setState({ disableForm: true }, () => {});
		}
	};

	render() {
		const previewStyle = {
			display: "block",
			maxWidth: 300,
			maxHeight: 200
		};
		return (
			<>
				<Container className='mt--7 mb-5' fluid>
					<Row>
						<Col className='order-xl-1 offset-xl-1' xl='10'>
							<Form>
								<Card className='bg-secondary shadow'>
									<CardBody>
										<h6 className='heading-small text-muted mb-4'>Informations</h6>
										<div className='pl-lg-4'>
											<Row>
												<Col lg='12'>
													<FormInput.InputText
														label='Nom du jeu'
														placeholder='Nom du jeu'
														id='name'
														name='name'
														value={this.state.form.name}
														change={this.handleChange}
														error={this.state.errors ? this.state.errors["name"] : false}
													/>
												</Col>
											</Row>
											<Row>
												<Col lg='12'>
													<FormInput.InputTextArea
														label='Description du jeu'
														placeholder='Description du jeu'
														id='description'
														name='description'
														value={this.state.form.description}
														change={this.handleChange}
														error={
															this.state.errors ? this.state.errors["description"] : false
														}
													/>
												</Col>
											</Row>
										</div>
										<hr className='my-4' />
										<h6 className='heading-small text-muted mb-4'>Design de la Campagne</h6>
										<div className='pl-lg-4'>
											<Row>
												<Col lg='4'>
													<FormGroup>
														<label className='form-control-label' htmlFor='input-username'>
															Image du jeu
														</label>
														{this.state.file ? (
															<img
																alt='Preview'
																src={this.state.file}
																style={previewStyle}
															/>
														) : (
															<img
																alt='Preview'
																src={
																	this.state.form.image
																		? this.state.form.image
																		: bgDefault
																}
																style={previewStyle}
															/>
														)}
													</FormGroup>
												</Col>
												<Col lg='8' md='12'>
													<FormGroup>
														<label className='form-control-label' htmlFor='input-username'>
															Changer d'image
														</label>
														<div className='app'></div>
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
													onClick={this.props.returnChapter}
													size='md'
													disabled={this.state.disableForm}>
													Retour
												</Button>
												<Button
													color='primary'
													onClick={() => this.submitChapter()}
													size='md'
													disabled={this.state.disableForm}>
													Modifier
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
}

export default ChapterEdit;
