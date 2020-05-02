import React, { useState } from "react";

//Firebase
import { registerUser } from "../../services/Data/user";

//Utils
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, CardTitle } from "reactstrap";

//Constants
import * as ROUTES from "../../routes";

export default function SignUp() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState();
	const [validate, setValidate] = useState({
		username: "",
		email: "",
	});

	const validateEmail = (e) => {
		const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (emailRex.test(e.target.value)) validate.email = "has-success";
		else validate.email = "has-danger";
		setValidate(validate);
	};

	const handleKeyPress = (event) => {
		// [Enter] should not submit the form when choosing an address.
		if (event.keyCode === 13) {
			event.preventDefault();
		}
	};

	const submitForm = async () => {
		let res = await registerUser(username, email, password, confirmPassword);
		if (res) setErrors(res.message);
		if (errors) console.log("ERRORS", errors);
	};

	return (
		<>
			<CardTitle className='text-center'>Créer un compte</CardTitle>
			<Form className='form-signing' onKeyPress={handleKeyPress} onSubmit={(e) => e.preventDefault()}>
				<FormGroup>
					<Input
						type='text'
						id='username'
						name='username'
						placeholder="Nom d'utilisateur"
						autoComplete='off'
						autoFocus
						value={username}
						onKeyPress={handleKeyPress}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						type='email'
						name='email'
						id='email'
						placeholder='Email address'
						autoComplete='off'
						value={email}
						onChange={(e) => {
							validateEmail(e);
							setEmail(e.target.value);
						}}
					/>
				</FormGroup>

				<FormGroup>
					<Input
						type='password'
						name='password'
						id='password'
						placeholder='Entrer un mot de passe'
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						type='password'
						name='confirmPassword'
						id='confirmPassword'
						placeholder='Confirmer le mot de passe'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</FormGroup>

				<hr className='my-4' />
				<button
					className='btn btn-md btn-primary btn-block text-uppercase'
					type='submit'
					onClick={(e) => submitForm(e)}>
					Créer un compte
				</button>

				{errors && <p>{errors.message}</p>}
				<p className='text-center mt-4'>
					Déjà un compte ? <br />
					<Link to={ROUTES.SIGN_IN}>Connectez-vous !</Link>
				</p>
			</Form>
		</>
	);
}
