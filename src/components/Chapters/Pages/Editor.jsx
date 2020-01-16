import React, { useState, useEffect } from "react";

//Utils
import { Button, Card, CardBody, CardFooter, Row, Col } from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import cloneDeep from "lodash/cloneDeep";

//Components
import FormInput from "../../Forms/Form";
import Option from "./Option";

export default function PageEditor(props) {
	const isBlockEditorOpen = props.isBlockEditorOpen;
	const selectedPage = props.selectedPage;
	const selectedIndex = props.selectedIndex;

	const types = ["Choix simple", "Choix multiple", "Vrai/Faux", "Liste déroulante"];

	const [pageId, setPageId] = useState(selectedPage.page_id);
	const [pageNumber, setPageNumber] = useState(selectedPage.page_number);
	const [pageText, setPageText] = useState(selectedPage.page_text);
	const [pageType, setPageType] = useState(types[selectedPage.page_type - 1]);
	const [pageTypeId, setPageTypeId] = useState(selectedPage.page_type);
	const [pageOptions, setPageOptions] = useState(selectedPage.page_options);
	const [pageImage, setPageImage] = useState(selectedPage.page_image);

	const options = [
		{ id: 1, icon: "ni ni-bullet-list-67", label: "Choix simple" },
		{ id: 2, icon: "ni ni-check-bold", label: "Choix multiple" },
		{ id: 3, icon: "ni ni-bold-right", label: "Vrai/Faux" },
		{ id: 4, icon: "ni ni-tag", label: "Liste déroulante" }
	];

	const [errors] = useState(false);

	const removePage = props.removePage;

	useEffect(() => {
		if (props.selectedPage.page_number !== pageNumber) {
			setPageId(props.selectedPage.page_id);
			setPageNumber(props.selectedPage.page_number);
			setPageText(props.selectedPage.page_text);
			setPageType(types[props.selectedPage.page_type - 1]);
			setPageTypeId(props.selectedPage.page_type);
			setPageOptions(props.selectedPage.page_options);
			setPageImage(props.selectedPage.page_image);
		}
	}, [
		props.selectedPage.page_id,
		props.selectedPage.page_number,
		props.selectedPage.page_text,
		props.selectedPage.page_image,
		props.selectedPage.page_type,
		props.selectedPage.page_options,
		types,
		pageNumber
	]);

	const handleChangeText = e => {
		setPageText(e.target.value);
	};

	const handleChangeType = option => {
		let copyOptions = cloneDeep(pageOptions).slice();

		if (pageType !== option.label) {
			if (pageType === "Vrai/Faux") {
				copyOptions = [
					{ id: 1, text: "Choix 1" },
					{ id: 2, text: "Choix 2" },
					{ id: 3, text: "Choix 3" }
				];
			}
			setPageType(option.label);
			setPageTypeId(option.id);
			if (option.label === "Vrai/Faux") {
				copyOptions = [
					{ id: 1, text: "Vrai" },
					{ id: 2, text: "Faux" }
				];
			}
		}
		setPageOptions(copyOptions);
	};

	const handleChangeOptions = e => {
		e.preventDefault();

		let id = e.target.id;
		let value = e.target.value;
		const copyOptions = cloneDeep(pageOptions);
		copyOptions[id].option = value;
		setPageOptions(copyOptions);
	};

	const addOption = indexOption => {
		const copyOptions = cloneDeep(pageOptions).slice();
		const newOption = {
			id: copyOptions.length + 1,
			text: "Nouvelle option ..."
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

	const removeOption = indexOption => {
		const copyOptions = cloneDeep(pageOptions);
		copyOptions.splice(indexOption, 1);

		setPageOptions(copyOptions);
	};

	const handleChangeImage = e => {
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

	const cancelChanges = idPage => {
		revertValues();
		props.cancelChanges(idPage);
	};

	const submitChanges = () => {
		props.submitChanges(
			{
				page_id: pageId,
				page_text: pageText,
				page_type: pageTypeId,
				page_image: pageImage,
				page_options: pageOptions
			},
			pageId
		);
	};

	const revertValues = () => {
		setPageText(selectedPage.page_text);
		setPageType(types[selectedPage.page_type - 1]);
		setPageOptions(selectedPage.page_options);
		setPageImage(selectedPage.page_image);
	};

	const onDragEnd = result => {
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
											<Row>
												<Col xs='8' lg='7'>
													<FormInput.SingleSelect
														label='Type de page : '
														id='type'
														name='type'
														value={types[pageTypeId - 1]}
														options={options}
														change={handleChangeType}
														removeImage={removeImage}
														placeholder={pageType}
													/>
												</Col>
											</Row>

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
												{provided => (
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
																	{pageType === "Vrai/Faux" ? (
																		<Option.Boolean
																			index={key}
																			option={option}
																			pageOptions={pageOptions}
																			handleChange={handleChangeOptions}
																			provided={provided}
																		/>
																	) : (
																		<Draggable
																			draggableId={option.id.toString()}
																			index={key}>
																			{provided => (
																				<Option.Choices
																					index={key}
																					option={option}
																					pageOptions={pageOptions}
																					add={addOption}
																					duplicate={duplicateOption}
																					remove={removeOption}
																					change={handleChangeOptions}
																					provided={provided}
																				/>
																			)}
																		</Draggable>
																	)}
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
