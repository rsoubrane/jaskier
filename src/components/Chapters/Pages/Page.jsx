import React from "react";

import { Draggable } from "react-beautiful-dnd";
import { Col } from "reactstrap";

import {
	MdAdd as Add,
	MdDelete as Delete,
	MdFormatAlignCenter as Handle,
	MdContentCopy as Duplicate
} from "react-icons/md";

export default function Page(props) {
	const pageDetails = props.pageDetails;

	const handleBlockEditor = props.handleBlockEditor;
	const addPage = props.addPage;
	const removePage = props.removePage;

	const types = ["Choix simple", "Choix multiple", "Vrai/Faux", "Liste déroulante"];
	const questionType = types[pageDetails.type - 1];

	return (
		<Draggable draggableId={(props.index + 1).toString()} index={props.index}>
			{provided => (
				<div
					className={`row align-items-center mb-3 container_page ${props.selected ? "selected" : null}`}
					{...provided.draggableProps}
					ref={provided.innerRef}>
					<Col xs='10' className='page_details' onClick={() => handleBlockEditor(props.index)}>
						<span className='font-weight-bold'>{props.index + 1} :</span>
						<span className='page_label'> {pageDetails.text}</span>

						<div className='page_bottom text-center'>
							<div className='page_type'>{questionType}</div>

							<div className='page_options'>{pageDetails.options.length} options</div>

							{pageDetails.image ? <div className='page_image'>Image</div> : null}
						</div>
					</Col>

					<Col xs='1' className='order-first page_handle' {...provided.dragHandleProps}>
						<Handle />
					</Col>

					<Col xs='1' className='h-100 page_icons'>
						<div className='icon_container'>
							<Add onClick={() => addPage(props.index)} className='icon' />
						</div>
						<div className='icon_container'>
							<Duplicate onClick={() => addPage(props.index, pageDetails)} className='icon' />
						</div>
						<div className='icon_container'>
							<Delete onClick={() => removePage(props.index)} className='icon' />
						</div>
					</Col>
				</div>
			)}
		</Draggable>
	);
}
