import { auth, db } from "../Firebase/firebase";

//Constants
import * as ROUTES from "../../routes";

export const registerUser = async (username, email, password, confirmPassword) => {
	let token, userId;
	let res = "";

	await auth.createUserWithEmailAndPassword(email, password).catch(err => {
		console.log("err: ", err);
		res = err.message;
		return res;
	});

	// await db
	// 	.collection("users")
	// 	.get()
	// 	.then(doc => {
	// 		if (doc.exists) res = `This handle is already taken`;
	// 		else auth.createUserWithEmailAndPassword(email, password);
	// 	})
	// 	.then(data => {
	// 		userId = data.user.uid;
	// 		data.user.getIdToken();
	// 	})
	// 	.then(idToken => {
	// 		token = idToken;
	// 		const userCredentials = {
	// 			userId,
	// 			createdAt: new Date().toISOString(),
	// 			username,
	// 			email,
	// 			role: "user"
	// 		};
	// 		localStorage.setItem("Token", token);
	// 		db.doc(`/users/${username}`).set(userCredentials);

	// 		document.location.href = ROUTES.HOME;
	// 	})
	// 	.catch(err => {
	// 		res = err.message;
	// 	});
	return res;
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
	auth.signOut().catch(err => {
		console.error(err);
		return "Something went wrong, please try again";
	});
};

export const getUser = async userId => {
	let user = {};
	await db
		.collection("users")
		.where("userId", "==", userId)
		.get()
		.then(querySnapshot => {
			querySnapshot.docs.forEach(doc => {
				user = doc.data();
			});
		});
	return user;
};
