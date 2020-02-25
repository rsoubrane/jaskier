import { db } from "../Firebase/firebase";
import uuid from "uuid/v1";

export const addStory = async (newStory, username) => {
	let res = "";
	const uid = uuid();
	const data = {
		status: 1,
		user_created: username,
		user_updated: "",
		date_created: new Date(),
		date_updated: "",
		story_id: uid,
		story_name: newStory.name,
		story_slug: newStory.slug,
		story_image: newStory.image,
		story_description: newStory.description
	};

	await db
		.collection("stories")
		.doc(uid)
		.set(data)
		.then((res = "success"), console.log("New story successfully created"))
		.catch(error => (res = error));

	return res;
};

export const editStory = async (story_id, newStory, username) => {
	let res = "";
	const data = {
		status: 1,
		user_updated: username,
		date_updated: new Date(),
		story_name: newStory.name,
		story_slug: newStory.slug,
		story_image: newStory.image,
		story_description: newStory.description
	};

	await db
		.collection("stories")
		.doc(story_id)
		.set(data, { merge: true })
		.then((res = "success"), console.log(`Story successfully edited`))
		.catch(error => (res = error));

	return res;
};

export const removeStory = async story_id => {
	await db
		.collection("stories")
		.doc(story_id)
		.delete();

	return console.log(`Story ${story_id} successfully deleted !`);
};

export const getStories = async () => {
	const stories = [];
	await db
		.collection("stories")
		.where("status", "==", 1)
		.orderBy("date_created", "asc")
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
		.orderBy("date_created", "asc")
		.get()
		.then(querySnapshot => {
			querySnapshot.docs.forEach(doc => {
				stories.push(doc.data());
			});
		});
	return stories;
};

export const getStory = async storySlug => {
	let story = "";
	await db
		.collection("stories")
		.where("story_slug", "==", storySlug)
		.get()
		.then(querySnapshot => {
			querySnapshot.docs.forEach(doc => {
				story = doc.data();
			});
		});
	return story;
};
