import React, { useState } from "react";

//Utils
import { Row } from "reactstrap";
import cloneDeep from "lodash/cloneDeep";
import { DragDropContext } from "react-beautiful-dnd";

//Components
import List from "../../components/Chapters/Pages/List";
import Editor from "../../components/Chapters/Pages/Editor.jsx";

//Utils
import { submitAddPage, submitEditPage, submitRemovePage } from "../../services/Data/pages";

export default function ChaptersDetails(props) {
	const [chapter] = useState(props.chapter);
	const [pages, setPages] = useState(props.pages);
	const [selectedPage, setSelectedPage] = useState(props.pages[0]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isBlockEditorOpen, setIsBlockEditorOpen] = useState(true);

	const handleBlockEditor = (index) => {
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

	const addPage = (indexPage) => {
		if (indexPage < selectedIndex) {
			setSelectedIndex(selectedIndex + 1);
		}
		if (typeof indexPage != "number") indexPage = pages.length - 1;

		let copyPages = cloneDeep(pages);

		const newPage = {
			page_id: pages.length + 1,
			page_number: indexPage + 2,
			page_text: "Votre nouvelle page :",
			page_image: "",
			page_options: [
				{ id: 1, text: "Choix 1" },
				{ id: 2, text: "Choix 2" },
				{ id: 3, text: "Choix 3" },
			],
		};
		copyPages.splice(indexPage + 1, 0, newPage);
		copyPages.map((v, index) => ({ ...v, page_number: index + 1 }));
		setPages(copyPages);

		submitAddPage(chapter, newPage, indexPage);
	};

	const duplicatePage = (pageToDuplicate, indexPage) => {
		if (indexPage < selectedIndex) setSelectedIndex(selectedIndex + 1);
		if (typeof indexPage != "number") indexPage = pages.length;

		const duplicatedPage = cloneDeep(pageToDuplicate);
		let copyPages = cloneDeep(pages);

		const newPage = {
			page_id: pages.length + 1,
			page_number: indexPage + 2,
			page_text: duplicatedPage.page_text,
			page_image: duplicatedPage.page_image,
			page_options: duplicatedPage.page_options,
		};
		copyPages.splice(indexPage + 1, 0, newPage);
		copyPages.map((v, index) => ({ ...v, page_number: index + 1 }));
		setPages(copyPages);
		submitAddPage(chapter, newPage, indexPage);
	};

	const removePage = (indexPage) => {
		const copyPages = cloneDeep(pages);
		const page_id = pages[indexPage].page_id;
		copyPages.splice(indexPage, 1);

		if (indexPage === 0) setSelectedIndex(0);
		if (indexPage === copyPages.length - 1 && selectedIndex === copyPages.length)
			setSelectedIndex(copyPages.length - 2);
		setPages(copyPages);
		setSelectedPage(pages[selectedIndex]);
		submitRemovePage(page_id);
	};

	const submitChanges = (updatedPage, idPage) => {
		editPage(updatedPage, idPage);
	};
	const cancelChanges = (idPage) => {
		editPage(selectedPage, idPage);
	};

	const editPage = (pageToUpdate) => {
		const copyPages = cloneDeep(pages);
		const updatedPage = cloneDeep(pageToUpdate);

		const newPage = (copyPages[selectedIndex] = {
			page_id: selectedPage.page_id,
			page_number: selectedIndex + 1,
			page_text: updatedPage.page_text,
			page_options: updatedPage.page_options,
			page_image: updatedPage.page_image,
		});

		setPages(copyPages);

		submitEditPage(newPage, selectedIndex + 1);
	};

	const onDragEnd = (result) => {
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
					duplicatePage={duplicatePage}
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
