import { auth, db } from "../utils/Firebase/firebase";
import axios from "axios";

//Constants
import * as ROUTES from "../constants/routes";

export const getStories = () => {
	const stories = [];
	db.collection("stories")
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

export const getChapter = chapterSlug => {
	let chapter = "";
	db.collection("chapters")
		.where("chapter_slug", "==", chapterSlug)
		.get()
		.then(querySnapshot => {
			querySnapshot.docs.forEach(doc => {
				chapter = doc.data();
			});
		});
	return chapter;
};

export const submitAdd = (newPage, indexPage) => {
	newPage["arrange"] = indexPage + 2;
	console.log("New Page Added");
};

export const submitEdit = (newPage, indexPage, indexArrange) => {
	console.log(`Page ${indexPage} Edited`);
	console.log("newPage: ", newPage);
};

export const submitRemove = indexPage => {
	console.log(`Page ${indexPage} Removed`);
};
