import React, { useState } from "react";

//Utils
import { Row } from "reactstrap";
import cloneDeep from "lodash/cloneDeep";

//Components
import List from "../../components/Chapters/Pages/List";
import Editor from "../../components/Chapters/Pages/Editor";

export default function ChaptersDetails(props) {
	const [chapter] = useState(props.chapter);
	const [pages, setPages] = useState(chapter.pages);
	const [selectedPage, setSelectedPage] = useState(pages[0]);

	const [isBlockEditorOpen, setIsBlockEditorOpen] = useState(true);

	const handleBlockEditor = idPage => {
		const index = pages.findIndex(x => x.id === idPage);

		if (isBlockEditorOpen === false) {
			triggerBlockEditor();
			setSelectedPage({});
		}
		if (selectedPage === pages[index]) {
			triggerBlockEditor();
			setSelectedPage({});
		} else {
			setSelectedPage(pages[index]);
		}
	};
	const triggerBlockEditor = () => {
		setIsBlockEditorOpen(!isBlockEditorOpen);
	};

	const findIndex = idPage => {
		const index = pages.findIndex(x => x.id === idPage);
		return index;
	};

	const addPage = idPage => {
		let index;
		if (typeof idPage == "number") {
			index = findIndex(idPage);
		} else {
			index = pages.length;
		}
		const copyPages = cloneDeep(pages);
		copyPages.splice(index + 1, 0, {
			id: pages.length + 1,
			label: "Votre nouvelle page :",
			image: "",
			options: [
				{ id: 1, option: "Choix 1" },
				{ id: 2, option: "Choix 2" },
				{ id: 3, option: "Choix 3" }
			],
			type: 1,
			isRequired: true
		});
	};

	const duplicatePage = (pageToDuplicate, idPage) => {
		const index = findIndex(idPage);

		const duplicatedPage = cloneDeep(pageToDuplicate);

		const pageList = pages.slice();
		pageList.splice(index + 1, 0, {
			id: pages.length + 1,
			label: duplicatedPage.label,
			type: duplicatedPage.type,
			options: duplicatedPage.options,
			isRequired: duplicatedPage.isRequired
		});

		setPages(pageList);
	};

	const removePage = idPage => {
		const index = findIndex(idPage);

		const copyPages = cloneDeep(pages);
		copyPages.splice(index, 1);
		setPages(copyPages);
		setSelectedPage({});

		triggerBlockEditor();
	};

	const submitChanges = (updatedPage, idPage) => {
		editPage(updatedPage, idPage);
	};
	const cancelChanges = idPage => {
		editPage(selectedPage, idPage);
	};
	const editPage = (updatedPage, idPage) => {
		const index = findIndex(idPage);

		const copyUpdatedPage = cloneDeep(updatedPage);

		const copyList = cloneDeep(pages).slice();
		copyList[index].label = copyUpdatedPage.label;
		copyList[index].type = copyUpdatedPage.type;
		copyList[index].isRequired = copyUpdatedPage.isRequired;
		copyList[index].options = copyUpdatedPage.options;
		copyList[index].image = copyUpdatedPage.image;

		setPages(copyList);
	};

	return (
		<>
			<Row className='page_creator mt-4'>
				<List
					pages={pages}
					addPage={addPage}
					handleBlockEditor={handleBlockEditor}
					isBlockEditorOpen={isBlockEditorOpen}
					selectedPage={selectedPage}
					duplicatePage={duplicatePage}
				/>

				<Editor
					isBlockEditorOpen={isBlockEditorOpen}
					selectedPage={selectedPage}
					removePage={removePage}
					submitChanges={submitChanges}
					cancelChanges={cancelChanges}
				/>
			</Row>
		</>
	);
}
