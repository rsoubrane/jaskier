import { db } from "../Firebase/firebase";
import uuid from "uuid/v1";

export const addChapter = async (newChapter, username) => {
	let res = "";
	const uid = uuid();
	const data = {
		status: 1,
		story_id: newChapter.story_id,
		story_name: newChapter.story_name,
		story_slug: newChapter.story_slug,
		chapter_id: uid,
		chapter_name: newChapter.name,
		chapter_slug: newChapter.slug,
		chapter_image: newChapter.image,
		chapter_description: newChapter.description,
		user_created: username,
		user_updated: "",
		date_created: new Date(),
		date_updated: ""
	};

	await db
		.collection("chapters")
		.doc(uid)
		.set(data)
		.then((res = "success"), console.log("New chapter successfully created"))
		.catch(error => (res = error));

	return res;
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
