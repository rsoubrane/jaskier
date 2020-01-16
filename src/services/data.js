import { db } from "../utils/Firebase/firebase";
import uuid from "uuid/v1";

//Constants
import * as ROUTES from "../constants/routes";

export const getStories = async () => {
	const stories = [];
	await db
		.collection("stories")
		.where("status", "==", 1)
		.get()
		.then(querySnapshot => {
			querySnapshot.docs.forEach(doc => {
				stories.push(doc.data());
			});
		});
	return stories;
};

export const getUserStories = async () => {
	const stories = [];
	await db
		.collection("stories")
		.where("status", "==", 1)
		.where("user_created", "==", "romain")
		.get()
		.then(querySnapshot => {
			querySnapshot.docs.forEach(doc => {
				stories.push(doc.data());
			});
		});
	return stories;
};

export const getChapters = async storySlug => {
	let chapters = [];
	await db
		.collection("chapters")
		.where("story_slug", "==", storySlug)
		.get()
		.then(querySnapshot => {
			querySnapshot.docs.forEach(doc => {
				chapters.push(doc.data());
			});
		});
	return chapters;
};

export const getChapter = async chapterSlug => {
	let chapter = "";
	await db
		.collection("chapters")
		.where("chapter_slug", "==", chapterSlug)
		.get()
		.then(querySnapshot => {
			querySnapshot.docs.forEach(doc => {
				chapter = doc.data();
			});
		});
	return chapter;
};

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
