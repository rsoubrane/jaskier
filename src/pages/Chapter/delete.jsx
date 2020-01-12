import React, { useState } from "react";

//Utils
import { Button, Card, CardBody, Form, Container, Row, Col, CardFooter } from "reactstrap";
import { Redirect } from "react-router-dom";

export default function ChapterDelete(props) {
	const [disableForm, setDisableForm] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const submitChapter = () => {
		if (!disableForm) {
			setDisableForm(true);
			setRedirect(true);
		}
	};

	return (
		<>
			{redirect ? (
				<Redirect to={"/admin"} />
			) : (
				<Container fluid>
					<Row>
						<Col className='order-xl-1' xl='8'>
							<Form>
								<Card className='bg-secondary shadow'>
									<CardBody>
										<h6 className='heading-small text-muted mb-4'>
											Etes-vous sûr de vouloir supprimer définitivement ce chapitre ?
										</h6>
									</CardBody>
									<CardFooter className='bg-white border-0'>
										<Row className='align-items-center'>
											<Col className='text-right' xs='12'>
												<Button
													color='danger'
													onClick={props.returnChapter}
													size='md'
													disabled={disableForm}>
													Retour
												</Button>
												<Button
													color='primary'
													onClick={() => submitChapter()}
													size='md'
													disabled={disableForm}>
													Supprimer le chapitre
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
