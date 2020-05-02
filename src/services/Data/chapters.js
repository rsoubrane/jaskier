import { db } from "../Firebase/firebase";
import { v1 as uuid } from "uuid";
import { submitAddPage } from "./pages";

export const addChapter = async (newChapter, username) => {
	let res = "";
	const uid = uuid();
	const data = {
		status: 1,
		story_name: newChapter.story_name,
		story_slug: newChapter.story_slug,
		story_id: newChapter.story_id,
		chapter_id: uid,
		chapter_name: newChapter.name,
		chapter_slug: newChapter.slug,
		chapter_image: newChapter.image,
		chapter_description: newChapter.description,
		user_created: username,
		user_updated: "",
		date_created: new Date(),
		date_updated: "",
	};

	const chapterInfos = {
		story_id: newChapter.story_id,
		story_slug: newChapter.story_slug,
		chapter_id: uid,
		chapter_slug: newChapter.slug,
	};

	const newPage = {
		page_number: 1,
		page_image: null,
		page_text: "Page d'introduction",
		page_options: [
			{ id: 1, text: "Choix 1" },
			{ id: 2, text: "Choix 2" },
			{ id: 3, text: "Choix 3" },
		],
	};

	await submitAddPage(chapterInfos, newPage);

	await db
		.collection("chapters")
		.doc(uid)
		.set(data)
		.then((res = "success"), console.log("New chapter successfully created"))
		.catch((error) => (res = error));

	return res;
};

export const editChapter = async (chapter_id, newChapter, username) => {
	let res = "";
	const data = {
		chapter_name: newChapter.name,
		chapter_slug: newChapter.slug,
		chapter_image: newChapter.image,
		chapter_description: newChapter.description,
		user_updated: username,
		date_updated: new Date(),
	};

	await db
		.collection("chapters")
		.doc(chapter_id)
		.set(data, { merge: true })
		.then((res = "success"), console.log(`Chapter successfully edited`))
		.catch((error) => (res = error));

	return res;
};

export const removeChapter = async (chapter_id) => {
	await db.collection("chapters").doc(chapter_id).delete();

	return console.log(`Chapter ${chapter_id} successfully deleted !`);
};

export const getChapters = async (storySlug) => {
	console.log("chapterSlug: ", storySlug);
	let chapters = [];
	await db
		.collection("chapters")
		.where("story_slug", "==", storySlug)
		.get()
		.then((querySnapshot) => {
			querySnapshot.docs.forEach((doc) => {
				chapters.push(doc.data());
			});
		});
	return chapters;
};

export const getChapter = async (chapterSlug) => {
	let chapter = "";
	await db
		.collection("chapters")
		.where("chapter_slug", "==", chapterSlug)
		.get()
		.then((querySnapshot) => {
			querySnapshot.docs.forEach((doc) => {
				chapter = doc.data();
			});
		});
	return chapter;
};
