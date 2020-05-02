import React, { useState, useEffect } from "react";

//Utils
import { Button, Card, CardBody, CardFooter, Row, Col } from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import cloneDeep from "lodash/cloneDeep";

//Components
import FormInput from "../../Forms/Form";
import Option from "./Option";

export default function Editor(props) {
	const isBlockEditorOpen = props.isBlockEditorOpen;
	const selectedPage = props.selectedPage;
	const selectedIndex = props.selectedIndex;

	const [pageId, setPageId] = useState(selectedPage.page_id);
	const [setPageNumber] = useState(selectedPage.page_number);
	const [pageText, setPageText] = useState(selectedPage.page_text);
	const [pageOptions, setPageOptions] = useState(selectedPage.page_options);
	const [pageImage, setPageImage] = useState(selectedPage.page_image);

	const [errors] = useState(false);

	const removePage = props.removePage;

	const [redirectList, setRedirectList] = useState([]);

	useEffect(() => {
		const options = new Array(props.pages.length).fill().map((e, i) => {
			return { value: i + 1, label: i + 1 };
		});

		setRedirectList(options);
	}, [props.pages]);

	useEffect(() => {
		if (props.selectedPage.page_id !== pageId) {
			setPageId(props.selectedPage.page_id);
			setPageNumber(props.selectedPage.page_number);
			setPageText(props.selectedPage.page_text);
			setPageOptions(props.selectedPage.page_options);
			setPageImage(props.selectedPage.page_image);
		}
	}, [
		props.selectedPage.page_id,
		props.selectedPage.page_number,
		props.selectedPage.page_text,
		props.selectedPage.page_options,
		props.selectedPage.page_image,
		pageId,
	]);

	const handleChangeText = (e) => {
		setPageText(e.target.value);
	};

	const handleChangeOptions = (e) => {
		let id = e.target.id;
		let value = e.target.value;
		const copyOptions = cloneDeep(pageOptions);
		copyOptions[id].text = value;
		setPageOptions(copyOptions);
	};

	const handleChangeRedirect = (option, id) => {
		console.log("option: ", option);
		const copyOptions = cloneDeep(pageOptions);
		copyOptions[id - 1].redirectTo = option;
		setPageOptions(copyOptions);
	};

	const addOption = (indexOption) => {
		const copyOptions = cloneDeep(pageOptions).slice();
		const newOption = {
			id: copyOptions.length + 1,
			text: "Nouvelle option ...",
		};
		copyOptions.splice(indexOption + 1, 0, newOption);

		setPageOptions(copyOptions);
	};

	const duplicateOption = (optionToDuplicate, indexOption) => {
		const copyOptions = cloneDeep(pageOptions).slice();

		optionToDuplicate.id = copyOptions.length + 1;
		copyOptions.splice(indexOption + 1, 0, optionToDuplicate);

		setPageOptions(copyOptions);
	};

	const removeOption = (indexOption) => {
		const copyOptions = cloneDeep(pageOptions);
		copyOptions.splice(indexOption, 1);

		setPageOptions(copyOptions);
	};

	const handleChangeImage = (e) => {
		e.preventDefault();

		var file = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setPageImage(reader.result);
		};
	};

	const removeImage = () => {
		setPageImage("");
	};

	const cancelChanges = (idPage) => {
		revertValues();
		props.cancelChanges(idPage);
	};

	const submitChanges = () => {
		props.submitChanges(
			{
				page_id: pageId,
				page_text: pageText,
				page_image: pageImage,
				page_options: pageOptions,
			},
			pageId
		);
	};

	const revertValues = () => {
		setPageText(selectedPage.page_text);
		setPageOptions(selectedPage.page_options);
		setPageImage(selectedPage.page_image);
	};

	const onDragEnd = (result) => {
		const reorder = (list, startIndex, endIndex) => {
			const result = Array.from(list);
			const [removed] = result.splice(startIndex, 1);
			result.splice(endIndex, 0, removed);
			return result;
		};
		if (result.destination && result.destination.index !== result.source.index) {
			const options = reorder(pageOptions, result.source.index, result.destination.index);
			setPageOptions(options);
		}
	};

	const toggleConfirmation = (functionToToggle, functionParam) => {
		if (window.confirm("Voulez-vous vraiment supprimer la page ?")) {
			functionToToggle(functionParam);
		}
	};

	console.log("pageOptions: ", pageOptions);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Col lg='6' className={`mb-5 creator_edit ${!isBlockEditorOpen ? "open" : null}`}>
				{pageOptions ? (
					<form onSubmit={() => submitChanges()}>
						<Card className={`bg-secondary shadow card_creator_edit ${!isBlockEditorOpen ? "open" : null}`}>
							<CardBody>
								<h6 className='heading-small text-muted mb-4 text-left'>Editer la page</h6>
								<Row>
									<Col xs='12'>
										<div className='container_page_editor'>
											<FormInput.InputTextArea
												label='Text :'
												id='label'
												rows={2}
												maxlength={250}
												value={pageText}
												change={handleChangeText}
												error={errors ? errors["name"] : false}
											/>

											<Droppable droppableId='optionsList'>
												{(provided) => (
													<>
														<div
															className='pages_options_list'
															{...provided.droppableProps}
															ref={provided.innerRef}>
															<label className='form-control-label'>
																Options ({pageOptions.length}) :
															</label>
															{pageOptions.map((option, key) => (
																<div key={option.id} className='list_option'>
																	<Draggable
																		draggableId={option.id.toString()}
																		index={key}>
																		{(provided) => (
																			<>
																				<Option.Choices
																					index={key}
																					option={option}
																					pageOptions={pageOptions}
																					add={addOption}
																					duplicate={duplicateOption}
																					remove={removeOption}
																					change={handleChangeOptions}
																					id={option.id}
																					redirectList={redirectList}
																					changeRedirect={
																						handleChangeRedirect
																					}
																					provided={provided}
																				/>
																			</>
																		)}
																	</Draggable>
																</div>
															))}
														</div>
														{provided.placeholder}
													</>
												)}
											</Droppable>

											<div className='mt-3'>
												<FormInput.Image
													label='Sélectionner une image'
													type='file'
													className='input-file'
													id='imgUpload'
													name='imgUpload'
													accept='image/*'
													pageImage={pageImage}
													removeImage={removeImage}
													change={handleChangeImage}
													disabled='true'
												/>
											</div>
										</div>
									</Col>
								</Row>
							</CardBody>

							<CardFooter className='bg-white border-0'>
								<Row className='align-items-center'>
									<Col xs='8'>
										<Button color='primary' size='md' onClick={() => submitChanges()}>
											Modifier la page
										</Button>

										<Button
											color='danger'
											size='md'
											className='ml-0 my-2'
											onClick={() => cancelChanges(selectedIndex)}>
											Annuler modification
										</Button>
									</Col>
									<Col xs='4' className='text-right'>
										<Button
											color='danger'
											size='sm'
											onClick={() => toggleConfirmation(removePage, selectedIndex)}>
											Supprimer la page
										</Button>
									</Col>
								</Row>
							</CardFooter>
						</Card>
					</form>
				) : null}
			</Col>
		</DragDropContext>
	);
}
