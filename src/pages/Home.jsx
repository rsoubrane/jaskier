import React, { useState, useEffect } from "react";

//Utils
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

//Firebase
import { auth } from "../services/Firebase/firebase";

//Services
import { getUser } from "../services/Data/user";
import { getStories } from "../services/Data/stories";

//Components
import LoadingScreen from "../components/Loaders/LoadingScreen";

export default function Home() {
	const [user, setUser] = useState();
	const [userId, setUserId] = useState();
	const [stories, setStories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) setUserId(user.uid);
		});

		async function fetchData() {
			try {
				const user = await getUser(userId);
				const stories = await getStories();
				setUser(user);
				setStories(stories);
				if (user && stories) setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [userId]);

	return (
		<LoadingScreen isVisible={loading}>
			{user && stories ? (
				<Container fluid>
					<h1>Home Page</h1>
					<hr />

					<h2>Welcome {user.username}</h2>

					{stories.map(story => (
						<div key={story.story_id}>
							<Link to={`/game/${story.story_slug}`}>{story.story_name}</Link>
							<br />
						</div>
					))}
				</Container>
			) : null}
		</LoadingScreen>
	);
}
