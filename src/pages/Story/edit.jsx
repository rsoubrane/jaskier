import React, { useState } from "react";

//Utils
import { Button, Card, CardBody, FormGroup, Form, Container, Row, Col, CardFooter } from "reactstrap";
import { Redirect } from "react-router-dom";
import ReactDropzone from "react-dropzone";

//Components
import FormInput from "../../components/Forms/Form";
import LoadingSpinner from "../../components/Loaders/LoadingSpinner";

//Services
import { editStory } from "../../services/Data/stories";

// Assets
import bgDefault from "../../assets/img/bg-campaign.png";

export default function StoryEdit(props) {
	const username = "romain";

	const [story, setStory] = useState(props.story);
	const [redirect, setRedirect] = useState(false);
	const [disabledForm, setDisabledForm] = useState(true);
	const [loading, setLoading] = useState(false);
	const [errors] = useState(false);

	const handleChange = e => {
		let slug = "";
		if (e.currentTarget.name === "name") {
			slug = e.currentTarget.value
				.toLowerCase()
				.replace(/ /g, "-")
				.replace(/[^\w-]+/g, "");
		} else if (story.slug) slug = story.slug;
		setStory({
			...story,
			[e.currentTarget.name]: e.currentTarget.value,
			slug
		});
		if (story.name && story.description) setDisabledForm(false);
	};

	const onPreviewDrop = files => {
		if (files.length) {
			let reader = new FileReader();
			reader.onload = e => {
				setStory({
					...story,
					image: e.target.result
				});
			};
			reader.readAsDataURL(files[0]);
		} else {
			alert("Veuillez insérer une Image");
		}
	};

	const removeImage = () => {
		setStory({
			...story,
			image: ""
		});
	};

	const submitStory = async () => {
		console.log("story: ", story);
		setLoading(true);
		const newStory = {
			name: story.name,
			slug: story.slug,
			image: story.image || "",
			description: story.description
		};
		const res = await editStory(story.story_id, newStory, username);
		if (res === "success") {
			setLoading(false);
			setRedirect(true);
		}
	};

	const previewStyle = {
		display: "block",
		width: "80%"
	};

	return (
		<>
			{redirect ? (
				<Redirect to={`/admin/story/${story.slug}`} />
			) : (
				<LoadingSpinner isVisible={loading}>
					<Container fluid className='mt--7'>
						<Row>
							<Col>
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
															change={handleChange}
															error={errors ? errors["name"] : false}
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
															change={handleChange}
															error={errors ? errors["description"] : false}
														/>
													</Col>
												</Row>
											</div>
											<hr className='my-4' />
											<h6 className='heading-small text-muted mb-4'>Design du jeu</h6>
											<Row>
												<Col lg='5'>
													<FormGroup className='pl-lg-4'>
														<label className='form-control-label' htmlFor='input-username'>
															Image du jeu
														</label>

														{story.image ? (
															<>
																<img
																	alt='Preview'
																	src={story.image}
																	style={previewStyle}
																/>
																<Button color='danger' onClick={removeImage}>
																	Supprimer l'image
																</Button>
															</>
														) : (
															<img alt='Preview' src={bgDefault} style={previewStyle} />
														)}
													</FormGroup>
												</Col>
												<Col lg='7' md='12'>
													<FormGroup>
														<label className='form-control-label' htmlFor='input-username'>
															Changer d'image
														</label>
														<ReactDropzone accept='image/*' onDrop={onPreviewDrop}>
															{({ getRootProps, getInputProps }) => (
																<section className={"drop_csv"}>
																	<div
																		className={"drop_csv_enter"}
																		{...getRootProps()}>
																		<div className={"drop_csv_border"}>
																			<input {...getInputProps()} />
																			<span
																				className={
																					"fa fa-cloud-upload-alt"
																				}></span>
																			<strong>DRAG & DROP</strong>
																			<Button
																				className='btn btn-secondary btn-outlined'
																				onClick={e => e.preventDefault()}>
																				OU SELECTIONNER UNE IMAGE
																			</Button>
																		</div>
																	</div>
																</section>
															)}
														</ReactDropzone>
													</FormGroup>
												</Col>
											</Row>
										</CardBody>
										<CardFooter className='bg-white border-0'>
											<Row className='align-items-center'>
												<Col className='text-right' xs='12'>
													<Button color='danger' onClick={() => setRedirect(true)} size='md'>
														Annuler
													</Button>
													<Button
														color='primary'
														disabled={disabledForm}
														onClick={() => submitStory()}
														size='md'>
														Modifier le jeu
													</Button>
												</Col>
											</Row>
										</CardFooter>
									</Card>
								</Form>
							</Col>
						</Row>
					</Container>
				</LoadingSpinner>
			)}
		</>
	);
}
