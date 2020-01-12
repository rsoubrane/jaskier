import React, { useState } from "react";

//Firebase
import { registerUser } from "../../utils/handlers";

//Utils
import { Link } from "react-router-dom";
import { validateSignupData } from "../../utils/validators";

//Constants
import * as ROUTES from "../../constants/routes";

const SignUp = props => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState("");

	const isInvalid = password !== confirmPassword || password === "" || email === "" || username === "";

	const handleOnChange = () => {
		const checkUser = {
			username,
			email,
			password,
			confirmPassword
		};

		setErrors(validateSignupData(checkUser));
	};

	async function handleOnSubmit() {
		try {
			await registerUser(username, email, password, confirmPassword);
			props.history.push(ROUTES.HOME);
		} catch (error) {
			setErrors(error);
		}
	}

	return (
		<div>
			<h1>SignUp</h1>

			<form onChange={() => handleOnChange()} onSubmit={e => e.preventDefault() && false}>
				<label htmlFor='username'>Username</label>
				<input
					id='username'
					name='username'
					autoComplete='off'
					autoFocus
					value={username}
					onChange={e => setUsername(e.target.value)}
					error={errors.username}
				/>
				<label htmlFor='email'>Email Address</label>
				<input
					id='email'
					name='email'
					autoComplete='off'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					autoComplete='off'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<label htmlFor='confirmPassword'>Confirm Password</label>
				<input
					type='password'
					name='confirmPassword'
					id='confirmPassword'
					autoComplete='off'
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
				<button disabled={isInvalid} type='submit' onClick={() => handleOnSubmit()}>
					Sign Up
				</button>
				{errors && <p>{errors.message}</p>}
			</form>

			<p>
				Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
			</p>
		</div>
	);
};

export default SignUp;
