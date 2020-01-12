import { auth, db } from "../utils/Firebase/firebase";
import axios from "axios";

export const registerUser = (username, email, password, confirmPassword) => {
	let token, userId;
	db.doc(`/users/${username}`)
		.get()
		.then(doc => {
			if (doc.exists) {
				return `This handle is already taken`;
			} else {
				return auth.createUserWithEmailAndPassword(email, password);
			}
		})
		.then(data => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then(idToken => {
			token = idToken;
			const userCredentials = {
				userId,
				createdAt: new Date().toISOString(),
				username,
				email,
				isAdmin: false
			};
			localStorage.setItem("Token", token);
			return db.doc(`/users/${username}`).set(userCredentials);
		})
		.catch(err => {
			console.error(err);
			if (err.code === "auth/email-already-in-use") {
				return `Email is already in use`;
			} else {
				return "Something went wrong, please try again";
			}
		});
};

export const loginUser = (email, password) => {
	auth.signInWithEmailAndPassword(email, password)
		.then(data => {
			return data.user.getIdToken();
		})
		.then(token => {
			localStorage.setItem("Token", token);
			return token;
		})
		.catch(err => {
			console.error(err);
			return "Wrong credentials, please try again";
		});
};

export const logoutUser = () => {
	localStorage.removeItem("Token");
	auth.signOut()
		.then(delete axios.defaults.headers.common["Authorization"])
		.catch(err => {
			console.error(err);
			return "Something went wrong, please try again";
		});
};

export const getUserData = () => {
	var user = auth.currentUser;

	if (user) {
		console.log(user);
		// User is signed in.
	} else {
		// No user is signed in.
	}
};
