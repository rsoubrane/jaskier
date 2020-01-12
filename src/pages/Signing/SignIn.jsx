import React, { useState } from "react";

//Firebase
import { loginUser } from "../../utils/handlers";

//Utils
import { Link } from "react-router-dom";
import { validateLoginData } from "../../utils/validators";

//Constants
import * as ROUTES from "../../constants/routes";

const SignIn = props => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState("");

	const isInvalid = password === "" || email === "";

	const handleOnChange = () => {
		const checkUser = {
			email,
			password
		};
		setErrors(validateLoginData(checkUser));
	};

	async function handleOnSubmit() {
		try {
			await loginUser(email, password);
			props.history.push(ROUTES.HOME);
		} catch (error) {
			setErrors(error);
		}
	}

	return (
		<div>
			<h1>SignIn</h1>

			<form onChange={() => handleOnChange()} onSubmit={e => e.preventDefault() && false}>
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
				<button disabled={isInvalid} type='submit' onClick={() => handleOnSubmit()}>
					Sign In
				</button>
				{errors && <p>{errors.message}</p>}
			</form>

			<p>
				Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
			</p>
		</div>
	);
};

export default SignIn;
