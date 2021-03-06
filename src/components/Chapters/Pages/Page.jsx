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
	const duplicatePage = props.duplicatePage;
	const removePage = props.removePage;

	return (
		<Draggable draggableId={(props.index + 1).toString()} index={props.index}>
			{provided => (
				<div
					className={`row align-items-center mb-3 container_page ${props.selected ? "selected" : null}`}
					{...provided.draggableProps}
					ref={provided.innerRef}>
					<Col xs='10' className='page_details' onClick={() => handleBlockEditor(props.index)}>
						<span className='font-weight-bold'>{props.index + 1} :</span>
						<span className='page_label'> {pageDetails.page_text}</span>

						<div className='page_bottom text-center'>
							<div className='page_options'>{pageDetails.page_options.length} options</div>

							{pageDetails.page_image ? <div className='page_image'>Image</div> : null}
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
							<Duplicate onClick={() => duplicatePage(pageDetails, props.index)} className='icon' />
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
