import React, { useState, useEffect } from "react";

//Components
import FormInput from "../../form/Form";
import LazyLoad from "../../medias/LazyLoad";

//Assets
import LogoFD from "../../../assets/img/free/Logo FD2.png";

//Utils
import { Button, Card, CardBody, Form, Row, Col } from "reactstrap";
import { components } from "react-select";

const { Option } = components;

export default function Answer(props) {
	const page = props.currentPage;

	const type = props.pageType;

	const current = page.id;
	const total = props.totalPage;

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
		returnPageAnswer(current, selected);
		setSelected([]);
		props.previousPage();
	};

	const next = () => {
		returnPageAnswer(current, selected);
		setSelected([]);
		props.nextPage();
	};

	const returnPageAnswer = (page, answers) => {
		console.log(`Answers to page ${page} are : ${answers}`);
	};

	return (
		<>
			<Form className='container_answer mt--7'>
				<Card className='bg-secondary shadow'>
					<CardBody className='page_details'>
						<Row>
							<Col xs={`${page.image ? 6 : 12}`} className='page_label'>
								{page.label}
								<Row className='page_bottom'>
									<div className='page_type'>{type}</div>
									{page.isRequired === true ? (
										<div className='page_isRequired'>Obligatoire</div>
									) : null}
								</Row>
							</Col>

							<Col xs='6' className={`page_image ${page.image ? "d-block" : "d-none"}`}>
								{page.image ? <LazyLoad imageId={page.image} /> : null}
							</Col>
						</Row>

						<Row className='page_options mt-5'>
							{type === "Liste déroulante" ? (
								<>
									<Col xs='6' className='option_select'>
										<FormInput.SingleSelect
											label='Liste déroulante : '
											id='reponse'
											name='reponse'
											option={props => <Option {...props}>{props.data.option}</Option>}
											value={Object.values(selected).length ? selected : "Choisissez une réponse"}
											options={Object.values(page.options)}
											change={handleSelect}
											placeholder={"Choissez une réponse"}
										/>
									</Col>
								</>
							) : (
								<>
									{page.options.map((option, index) => (
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
									disabled={!selected.length && page.isRequired}
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
				<div className='page_count'>
					<span>{current} </span> sur <span> {total}</span>
				</div>
			</Row>
		</>
	);
}
