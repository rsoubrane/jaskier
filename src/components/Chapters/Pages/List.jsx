import React, { useState } from "react";

//Utils
import { Button, Card, CardBody, Row, Col } from "reactstrap";
import { Form } from "reactstrap";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

//Components
import Page from "./Page";

export default function PagesList(props) {
	const [pages, setPages] = useState(props.pages);

	const addPage = props.addPage;
	const isBlockEditorOpen = props.isBlockEditorOpen;

	const onDragEnd = result => {
		const reorder = (list, startIndex, endIndex) => {
			const result = Array.from(list);
			const [removed] = result.splice(startIndex, 1);
			result.splice(endIndex, 0, removed);
			return result;
		};
		if (result.destination && result.destination.index !== result.source.index) {
			const newPages = reorder(pages, result.source.index, result.destination.index);
			setPages(newPages);
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Col className={`mb-3 creator_pages ${isBlockEditorOpen ? "open" : "offset-3"}`} lg={6} xs='12'>
				<Form>
					<Card className='bg-secondary shadow'>
						<CardBody>
							<h6 className='heading-small text-muted mb-4 text-left'>Pages</h6>
							<Droppable droppableId='pageList'>
								{provided => (
									<div className='row' {...provided.droppableProps} ref={provided.innerRef}>
										{pages
											? pages.map((page, index) => (
													<Page pageDetails={page} key={index} index={index} {...props} />
											  ))
											: null}
										{provided.placeholder}
									</div>
								)}
							</Droppable>

							<Row className='align-items-center'>
								<Col xs='12' className='text-center mt-3'>
									<Button color='primary' onClick={addPage} size='md'>
										Ajouter une page
									</Button>
								</Col>
							</Row>
						</CardBody>
					</Card>
				</Form>
			</Col>
		</DragDropContext>
	);
}
