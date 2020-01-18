import React, { useState, useEffect, useParams } from "react";

//Components
import FormInput from "../../components/Forms/Form";
import LazyLoad from "../../components/Loaders/LazyLoad";

//Assets
import LogoFD from "../../assets/img/logo.png";

//Utils
import { Button, Card, CardBody, Form, Row, Col } from "reactstrap";
import { components } from "react-select";

//Services
import { db } from "../../services/Firebase/firebase";

const { Option } = components;

export default function Game(props) {
	const question = props.currentQuestion;

	const type = props.questionType;

	const current = question.id;
	const total = props.totalQuestion;

	const checkSelected = props.checkSelected;
	const selectedAnswers = props.selectedAnswers;
	const [selected, setSelected] = useState(selectedAnswers);

	useEffect(() => {
		if (selected !== selectedAnswers) {
			setSelected(props.selectedAnswers);
		}
	});

	const handleSelect = option => {
		checkSelected({ value: option.id, label: option.option });
	};

	const previous = () => {
		returnQuestionAnswer(current, selected);
		setSelected([]);
		props.previousQuestion();
	};

	const next = () => {
		returnQuestionAnswer(current, selected);
		setSelected([]);
		props.nextQuestion();
	};

	const returnQuestionAnswer = (question, answers) => {
		console.log(`Answers to question ${question} are : ${answers}`);
	};

	return (
		<>
			<Form className='container_answer mt--7'>
				<Card className='bg-secondary shadow'>
					<CardBody className='question_details'>
						<Row>
							<Col xs={`${question.image ? 6 : 12}`} className='question_label'>
								{question.label}
								<Row className='question_bottom'>
									<div className='question_type'>{type}</div>
									{question.isRequired === true ? (
										<div className='question_isRequired'>Obligatoire</div>
									) : null}
								</Row>
							</Col>

							<Col xs='6' className={`question_image ${question.image ? "d-block" : "d-none"}`}>
								{question.image ? <LazyLoad imageId={question.image} /> : null}
							</Col>
						</Row>

						<Row className='question_options mt-5'>
							{type === "Liste déroulante" ? (
								<>
									<Col xs='6' className='option_select'>
										<FormInput.SingleSelect
											label='Liste déroulante : '
											id='reponse'
											name='reponse'
											option={props => <Option {...props}>{props.data.option}</Option>}
											value={Object.values(selected).length ? selected : "Choisissez une réponse"}
											options={Object.values(question.options)}
											change={handleSelect}
											placeholder={"Choissez une réponse"}
										/>
									</Col>
								</>
							) : (
								<>
									{question.options.map((option, index) => (
										<Col xs='3' className='option_card' key={index}>
											<Card
												onClick={() => checkSelected(index)}
												className={`${
													Object.values(selected).includes(index) ? "selected" : null
												}`}>
												<h4>{option.option}</h4>
											</Card>
										</Col>
									))}
								</>
							)}
						</Row>

						<Row className='buttons_actions align-items-center mt-5'>
							<Col className='text-left'>
								<Button
									className={`${current === 1 ? "invisible" : "visible"}`}
									color='danger'
									onClick={() => previous()}
									size='md'>
									Retour
								</Button>
							</Col>
							<Col className='text-center'>
								<img className='img-fluid w-75' src={LogoFD} alt='logo' />
							</Col>
							<Col className='text-right'>
								<Button
									color='primary'
									disabled={!selected.length && question.isRequired}
									onClick={() => next()}
									size='md'>
									Répondre
								</Button>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Form>
			<Row className='mt-4 justify-content-center'>
				<div className='question_count'>
					<span>{current} </span> sur <span> {total}</span>
				</div>
			</Row>
		</>
	);
}
