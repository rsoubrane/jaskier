import { auth, db } from "../utils/Firebase/firebase";
import axios from "axios";

//Constants
import * as ROUTES from "../constants/routes";

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
				role: "user"
			};
			localStorage.setItem("Token", token);
			return db.doc(`/users/${username}`).set(userCredentials);
		})
		.then((document.location.href = ROUTES.HOME))
		.catch(err => {
			console.error(err);
			if (err.code === "auth/email-already-in-use") {
				return `Email is already in use`;
			} else {
				return "Something went wrong, please try again";
			}
		});
};

export const loginUser = async (email, password) => {
	await auth
		.signInWithEmailAndPassword(email, password)
		.then(data => {
			return data.user.getIdToken();
		})
		.then(token => {
			localStorage.setItem("Token", token);
			document.location.href = ROUTES.HOME;
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

export const getUserData = userId => {
	let user = {};
	db.collection("users")
		.where("userId", "==", userId)
		.get()
		.then(querySnapshot => {
			querySnapshot.docs.forEach(doc => {
				user = doc.data();
				console.log("user: ", user);
			});
		});
	return user;
};
