import React, { useState } from "react";

//Utils
import { Row } from "reactstrap";
import cloneDeep from "lodash/cloneDeep";
import { DragDropContext } from "react-beautiful-dnd";

//Components
import List from "../../components/Chapters/Pages/List";
import Editor from "../../components/Chapters/Pages/Editor";

//Utils
import { submitAdd, submitEdit, submitRemove } from "../../services/data";

export default function ChaptersDetails(props) {
	const [chapter] = useState(props.chapter);
	const [pages, setPages] = useState(chapter.pages);
	const [selectedPage, setSelectedPage] = useState(pages[0]);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const [isBlockEditorOpen, setIsBlockEditorOpen] = useState(true);

	const handleBlockEditor = index => {
		if (isBlockEditorOpen === false) {
			triggerBlockEditor();
			setSelectedPage({});
		}
		if (selectedPage === pages[index]) {
			triggerBlockEditor();
			setSelectedPage({});
		} else {
			setSelectedPage(pages[index]);
			setSelectedIndex(index);
		}
	};
	const triggerBlockEditor = () => {
		setIsBlockEditorOpen(!isBlockEditorOpen);
	};

	const addPage = (indexPage, pageToDuplicate) => {
		if (indexPage == null) indexPage = pages.length;

		const copyPages = cloneDeep(pages);

		let newPage = "";
		if (pageToDuplicate) {
			newPage = {
				id: pages.length + 1,
				text: pageToDuplicate.text,
				type: pageToDuplicate.type,
				options: pageToDuplicate.options,
				isRequired: pageToDuplicate.isRequired
			};
		} else {
			newPage = {
				id: pages.length + 1,
				text: "Votre nouvelle page :",
				image: "",
				options: [
					{ id: 1, text: "Choix 1" },
					{ id: 2, text: "Choix 2" },
					{ id: 3, text: "Choix 3" }
				],
				type: 1,
				isRequired: true
			};
		}
		copyPages.splice(indexPage + 1, 0, newPage);
		copyPages.map((v, index) => ({ ...v, order: index + 1 }));
		setPages(copyPages);

		submitAdd(newPage, indexPage);
	};

	const removePage = indexPage => {
		const copyPages = cloneDeep(pages);
		if (indexPage === 0) setSelectedIndex(0);
		if (indexPage === pages.length - 1) setSelectedIndex(pages.length - 2);
		copyPages.splice(indexPage, 1);
		setSelectedPage(copyPages[selectedIndex]);
		setPages(copyPages);
		submitRemove(indexPage);
	};

	const submitChanges = (updatedPage, idPage) => {
		editPage(updatedPage, idPage);
	};
	const cancelChanges = idPage => {
		editPage(selectedPage, idPage);
	};

	const editPage = pageToUpdate => {
		const copyPages = cloneDeep(pages);
		const updatedPage = cloneDeep(pageToUpdate);

		const newQuestion = (copyPages[selectedIndex] = {
			text: updatedPage.text,
			type: updatedPage.type,
			options: updatedPage.options,
			image: updatedPage.image
		});

		setPages(copyPages);

		submitEdit(newQuestion, selectedIndex + 1);
	};

	const onDragEnd = result => {
		const reorder = (list, startIndex, endIndex) => {
			const result = Array.from(list);
			const [removed] = result.splice(startIndex, 1);
			result.splice(endIndex, 0, removed);
			return result;
		};

		if (result.destination && result.destination.index !== result.source.index) {
			const copyPages = reorder(pages, result.source.index, result.destination.index);

			const currentPage = copyPages[result.destination.index];
			const newPages = copyPages.map((v, index) => ({ ...v, arrange: index + 1 }));

			if (selectedIndex === result.source.index) setSelectedIndex(result.destination.index);
			setPages(newPages);

			submitEdit(currentPage, result.source.index + 1, result.destination.index + 1);
		}
	};

	return (
		<Row className='page_creator mt-4'>
			<DragDropContext onDragEnd={onDragEnd}>
				<List
					pages={pages}
					handleBlockEditor={handleBlockEditor}
					isBlockEditorOpen={isBlockEditorOpen}
					selectedPage={selectedPage}
					selectedIndex={selectedIndex}
					addPage={addPage}
					removePage={removePage}
				/>
			</DragDropContext>

			<Editor
				pages={pages}
				isBlockEditorOpen={isBlockEditorOpen}
				selectedPage={selectedPage}
				selectedIndex={selectedIndex}
				removePage={removePage}
				submitChanges={submitChanges}
				cancelChanges={cancelChanges}
			/>
		</Row>
	);
}
