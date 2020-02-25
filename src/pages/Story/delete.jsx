import React, { useState } from "react";

//Utils
import { Button, Card, CardBody, Form, Container, Row, Col, CardFooter } from "reactstrap";
import { Redirect } from "react-router-dom";
import { removeStory } from "../../services/Data/stories";

export default function StoryDelete(props) {
	const [disableForm, setDisableForm] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const deleteStory = () => {
		if (!disableForm) {
			removeStory(props.story.story_id);
			setDisableForm(true);
			setRedirect(true);
		}
	};

	return (
		<>
			{redirect ? (
				<Redirect to='/' />
			) : (
				<Container fluid>
					<Row>
						<Col className='order-xl-1' xl='8'>
							<Form>
								<Card className='bg-secondary shadow'>
									<CardBody>
										<h6 className='heading-small text-muted mb-4'>
											Etes-vous sûr de vouloir supprimer définitivement ce jeu ?
										</h6>
									</CardBody>
									<CardFooter className='bg-white border-0'>
										<Row className='align-items-center'>
											<Col className='text-right' xs='12'>
												<Button
													color='danger'
													onClick={props.returnStory}
													size='md'
													disabled={disableForm}>
													Retour
												</Button>
												<Button
													color='primary'
													onClick={() => deleteStory()}
													size='md'
													disabled={disableForm}>
													Supprimer le jeu
												</Button>
											</Col>
										</Row>
									</CardFooter>
								</Card>
							</Form>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
}
