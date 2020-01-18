import React, { useState, useEffect } from "react";

//Utils
import { Button, Card, CardBody, FormGroup, Form, Container, Row, Col, CardFooter } from "reactstrap";
import { Redirect, useParams } from "react-router-dom";
import ReactDropzone from "react-dropzone";

//Components
import Header from "../../components/Headers/Header";
import FormInput from "../../components/Forms/Form";
import LoadingScreen from "../../components/Loaders/LoadingScreen";

//Services
import { getStory } from "../../services/Data/stories";
import { addChapter } from "../../services/Data/chapters";

// Assets
import bgDefault from "../../assets/img/bg-campaign.png";

export default function ChapterAdd() {
	const username = "romain";

	const [story, setStory] = useState();
	const [chapter, setChapter] = useState({});
	const [redirect, setRedirect] = useState(false);
	const [disabledForm, setDisabledForm] = useState(true);
	const [loading, setLoading] = useState(false);
	const [errors] = useState(false);

	let { storySlug } = useParams();

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const story = await getStory(storySlug);
				setStory(story);
				if (story) setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [storySlug]);

	const handleChange = e => {
		let slug = "";
		if (e.currentTarget.name === "name") {
			slug = e.currentTarget.value
				.toLowerCase()
				.replace(/ /g, "-")
				.replace(/[^\w-]+/g, "");
		} else if (chapter.slug) slug = chapter.slug;
		setChapter({
			...chapter,
			[e.currentTarget.name]: e.currentTarget.value,
			slug
		});
		if (chapter.name && chapter.description) setDisabledForm(false);
	};

	const onPreviewDrop = files => {
		if (files.length) {
			let reader = new FileReader();
			reader.onload = e => {
				setChapter({
					...chapter,
					image: e.target.result
				});
			};
			reader.readAsDataURL(files[0]);
		} else {
			alert("Veuillez insérer une Image");
		}
	};

	const removeImage = () => {
		setChapter({
			...chapter,
			image: ""
		});
	};

	const submitChapter = async () => {
		setLoading(true);
		const newChapter = {
			story_name: story.story_name,
			story_slug: story.story_slug,
			story_id: story.story_id,
			name: chapter.name,
			slug: chapter.slug,
			image: chapter.image || "",
			description: chapter.description
		};
		const res = await addChapter(newChapter, username);
		if (res === "success") {
			setLoading(false);
			setRedirect(true);
		}
	};

	const previewStyle = {
		display: "block",
		width: "100%"
	};

	return (
		<>
			{redirect ? (
				<Redirect to={`/admin/story/${storySlug}/chapter/${chapter.slug}`} />
			) : (
				<LoadingScreen isVisible={loading}>
					{story ? (
						<Header headTitle={story.story_name} title='Ajouter un chapitre' background={bgDefault} />
					) : null}
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
											<Row>
												<Col lg='5'>
													<FormGroup className='pl-lg-4'>
														<label className='form-control-label' htmlFor='input-username'>
															Image du chapitre
														</label>

														{chapter.image ? (
															<>
																<img
																	alt='Preview'
																	src={chapter.image}
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
														onClick={() => submitChapter()}
														size='md'>
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
				</LoadingScreen>
			)}
		</>
	);
}
