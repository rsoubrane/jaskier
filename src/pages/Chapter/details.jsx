import React, { useState, useEffect } from "react";

//Utils
import { Row } from "reactstrap";
import cloneDeep from "lodash/cloneDeep";
import { DragDropContext } from "react-beautiful-dnd";

//Components
import List from "../../components/Chapters/Pages/List";
import Editor from "../../components/Chapters/Pages/Editor";
import LoadingTab from "../../components/Loaders/LoadingTab";

//Utils
import { submitAddPage, submitEditPage, submitRemovePage } from "../../services/pages";

export default function ChaptersDetails(props) {
	const [chapter] = useState(props.chapter);
	const [pages, setPages] = useState(props.pages);
	const [selectedPage, setSelectedPage] = useState(props.pages[0]);
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
				page_id: pages.length + 1,
				page_number: indexPage + 2,
				page_text: pageToDuplicate.page_text,
				page_type: pageToDuplicate.page_type,
				page_options: pageToDuplicate.page_options
			};
		} else {
			newPage = {
				page_id: pages.length + 1,
				page_number: indexPage + 2,
				page_text: "Votre nouvelle page :",
				page_image: "",
				page_options: [
					{ id: 1, text: "Choix 1" },
					{ id: 2, text: "Choix 2" },
					{ id: 3, text: "Choix 3" }
				],
				page_type: 1
			};
		}
		console.log("newPage: ", newPage);
		copyPages.splice(indexPage + 1, 0, newPage);
		copyPages.map((v, index) => ({ ...v, page_number: index + 1 }));
		setPages(copyPages);

		submitAddPage(chapter, newPage, indexPage);
	};

	const removePage = indexPage => {
		const copyPages = cloneDeep(pages);
		copyPages.splice(indexPage, 1);

		if (indexPage === 0) setSelectedIndex(0);
		if (indexPage === copyPages.length - 1 && selectedIndex === copyPages.length)
			setSelectedIndex(copyPages.length - 2);
		setPages(copyPages);
		setSelectedPage(pages[selectedIndex]);
		submitRemovePage(indexPage);
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
			page_text: updatedPage.page_text,
			page_type: updatedPage.page_type,
			page_options: updatedPage.page_options,
			page_image: updatedPage.page_image
		});

		setPages(copyPages);

		submitEditPage(newQuestion, selectedIndex + 1);
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
			const newPages = copyPages.map((v, index) => ({ ...v, page_number: index + 1 }));

			if (selectedIndex === result.source.index) {
				if (copyPages.length <= 2 && selectedIndex === 0) setSelectedIndex(1);
				else if (copyPages.length <= 2 && selectedIndex === 1) setSelectedIndex(0);
				else setSelectedIndex(result.destination.index);
			}
			console.log("newPages: ", newPages);
			setPages(newPages);

			submitEditPage(currentPage, result.source.index + 1, result.destination.index + 1);
		}
	};

	return (
		<Row className='page_creator mt-3'>
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
