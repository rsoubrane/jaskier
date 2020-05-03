import { db } from "../Firebase/firebase";
import { v1 as uuid } from "uuid";

export const getPages = async (chapter) => {
	const pages = [];
	await db
		.collection("pages")
		.where("chapter_id", "==", chapter.chapter_id)
		.orderBy("page_number", "asc")
		.get()
		.then((querySnapshot) => {
			querySnapshot.docs.forEach((doc) => {
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
		page_number: newPage.page_number,
		page_image: newPage.page_image || null,
		page_text: newPage.page_text,
		page_options: newPage.page_options,
		user_created: "romain",
		date_created: new Date(),
	};
	await db.collection("pages").doc(uid).set(data);
	console.log(`Page ${uid} Added`);
};

export const submitEditPage = async (newPage, indexPage) => {
	let data = {
		page_id: newPage.page_id,
		page_image: newPage.page_image || null,
		page_text: newPage.page_text,
		page_options: newPage.page_options,
		user_updated: "romain",
		date_updated: new Date(),
	};
	await db.collection("pages").doc(newPage.page_id.toString()).set(data, { merge: true });
	console.log(`Page ${indexPage} Edited`);
};

export const submitRemovePage = async (page_id) => {
	await db.collection("pages").doc(page_id).delete();
	return console.log(`Page ${page_id} Removed`);
};
