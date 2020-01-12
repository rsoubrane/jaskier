import React from "react";

import { Draggable } from "react-beautiful-dnd";
import { Col } from "reactstrap";

import { MdAdd as Add, MdFormatAlignCenter as Handle, MdContentCopy as Duplicate } from "react-icons/md";

export default function Page(props) {
	const pageDetails = props.pageDetails;
	const selectedPage = props.selectedPage;

	const handleBlockEditor = props.handleBlockEditor;

	const addPage = props.addPage;
	const duplicatePage = props.duplicatePage;
	//Keep for further thinking
	// const removePage = props.removePage;

	const types = ["Choix simple", "Choix multiple", "Vrai/Faux", "Liste déroulante"];

	return (
		<Draggable draggableId={pageDetails.id.toString()} index={props.index}>
			{provided => (
				<div
					className={`row align-items-center mb-3 container_page ${
						pageDetails.id === selectedPage.id ? "selected" : null
					}`}
					{...provided.draggableProps}
					ref={provided.innerRef}>
					<Col xs='10' className='page_details' onClick={() => handleBlockEditor(pageDetails.id)}>
						<span className='font-weight-bold'>{props.index + 1} :</span>
						<span className='page_label'> {pageDetails.text}</span>

						<div className='page_bottom text-center'>
							<div className='page_type'>{types[pageDetails.type - 1]}</div>

							<div className='page_options'>{pageDetails.options.length} options</div>

							{pageDetails.image ? <div className='page_image'>Image</div> : null}
						</div>
					</Col>

					<Col xs='1' className='order-lg-first page_handle' {...provided.dragHandleProps}>
						<Handle />
					</Col>

					<Col xs='1' className='h-100 page_icons'>
						<div className='icon_container'>
							<Add onClick={() => addPage(pageDetails.id)} className='icon' />
						</div>

						<div className='icon_container'>
							<Duplicate onClick={() => duplicatePage(pageDetails, pageDetails.id)} className='icon' />
						</div>
					</Col>
				</div>
			)}
		</Draggable>
	);
}
