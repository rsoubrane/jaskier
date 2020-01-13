import React, { useState, useEffect } from "react";

//Utils
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

//Firebase
import { auth, db } from "../utils/Firebase/firebase";

export default function Home() {
	const [user, setUser] = useState();
	const [username, setUsername] = useState();
	const [userId, setUserId] = useState();
	const [stories, setStories] = useState([]);

	//ComponentDidMount
	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) setUserId(user.uid);
		});

		const getUser = async () => {
			let user = "";
			await db
				.collection("users")
				.where("userId", "==", userId)
				.get()
				.then(querySnapshot => {
					querySnapshot.docs.forEach(doc => {
						user = doc.data();
					});
					setUser(user);
					setUsername(user.username);
				});
		};

		const getStories = async () => {
			const stories = [];
			await db
				.collection("stories")
				.where("status", "==", 1)
				.get()
				.then(querySnapshot => {
					querySnapshot.docs.forEach(doc => {
						stories.push(doc.data());
					});
					setStories(stories);
				});
			return stories;
		};

		if (userId) getUser();
		getStories();
	}, [userId]);

	return (
		<Container fluid>
			<h1>Home Page</h1>
			<hr />

			{console.log("user: ", user)}

			{user ? <h2>Welcome {user.username}</h2> : null}

			{stories
				? stories.map(story => (
						<div key={story.id}>
							<Link to={`/game/${story.slug}`}>{story.name}</Link>
							<br />
						</div>
				  ))
				: null}
		</Container>
	);
}
