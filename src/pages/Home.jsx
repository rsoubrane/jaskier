import React from "react";

import { auth } from "../utils/Firebase/firebase";
import { Link } from "react-router-dom";

export default function Home() {
	auth.onAuthStateChanged(function(user) {
		if (user) {
			console.log("user is in");
		} else {
			console.log("user is out");
		}
	});
	return (
		<div>
			<h1>Home Page</h1>
			<hr />

			<Link to='/admin/story'>Go to story</Link>
		</div>
	);
}
