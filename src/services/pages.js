import { db } from "../utils/Firebase/firebase";
import uuid from "uuid/v1";

export const getPages = async chapter => {
	console.log("chapter: ", chapter);
	const pages = [];
	await db
		.collection("pages")
		.where("chapter_id", "==", chapter.chapter_id)
		.get()
		.then(querySnapshot => {
			querySnapshot.docs.forEach(doc => {
				pages.push(doc.data());
			});
		});
	return pages;
};

export const submitAddPage = async (chapterInfos, newPage, indexPage) => {
	const uid = uuid();
	let data = {
		status: 1,
		story_id: chapterInfos.story_id,
		story_slug: chapterInfos.story_slug,
		chapter_id: chapterInfos.chapter_id,
		chapter_slug: chapterInfos.chapter_slug,
		page_id: uid,
		page_number: indexPage + 1,
		page_type: newPage.page_type,
		page_image: newPage.page_image || null,
		page_text: newPage.page_text,
		page_options: newPage.page_options,
		user_created: "romain",
		user_updated: "",
		date_created: new Date(),
		date_updated: ""
	};

	await db
		.collection("pages")
		.doc(uid)
		.set(data);

	console.log("New Page Added");
};

export const submitEditPage = (newPage, indexPage, indexArrange) => {
	console.log(`Page ${indexPage} Edited`);
	console.log("newPage: ", newPage);
};

export const submitRemovePage = indexPage => {
	console.log(`Page ${indexPage} Removed`);
};
