import { db } from "../utils/Firebase/firebase";
import uuid from "uuid/v1";

//Constants
import * as ROUTES from "../constants/routes";

export const getPages = async chapter => {
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
		page_id: uid,
		chapter_id: chapterInfos.chapter_id,
		status: 1,
		user_created: "romain",
		user_updated: "",
		date_created: new Date(),
		date_updated: "",
		page_number: newPage.page_number,
		page_type: newPage.page_type,
		page_image: newPage.page_image,
		page_text: newPage.page_text,
		page_options: newPage.page_options
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
