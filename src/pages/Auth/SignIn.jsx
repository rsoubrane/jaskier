import React, { useState } from "react";

//Firebase
import { loginUser } from "../../services/Data/user";

//Utils
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, FormFeedback, CardTitle } from "reactstrap";

//Constants
import * as ROUTES from "../../routes";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState("");
	const [validate, setValidate] = useState({
		emailState: ""
	});

	const validateEmail = e => {
		const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (emailRex.test(e.target.value)) {
			validate.emailState = "has-success";
		} else {
			validate.emailState = "has-danger";
		}
		setValidate(validate);
	};

	const submitForm = async e => {
		e.preventDefault();
		let errors = await loginUser(email, password);
		console.log("errors: ", errors);
	};

	return (
		<>
			<CardTitle className='text-center'>Connexion</CardTitle>
			<Form className='form-signing' onSubmit={e => submitForm(e)}>
				<FormGroup>
					<Input
						type='email'
						name='email'
						id='email'
						placeholder='Email address'
						autoComplete='off'
						value={email}
						valid={validate.emailState === "has-success"}
						invalid={validate.emailState === "has-danger"}
						onChange={e => {
							validateEmail(e);
							setEmail(e.target.value);
						}}
					/>
					<FormFeedback valid>Email valide</FormFeedback>
					<FormFeedback>Votre email n'est pas valide</FormFeedback>
				</FormGroup>

				<FormGroup>
					<Input
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
				</FormGroup>

				<div className='custom-control custom-checkbox mb-3'>
					<input type='checkbox' className='custom-control-input' id='customCheck1' />
					<label className='custom-control-label' for='customCheck1'>
						Remember password
					</label>
				</div>
				<hr className='my-4' />
				<button className='btn btn-md btn-primary btn-block text-uppercase' type='submit'>
					Connexion
				</button>

				{errors && <p>{errors.message}</p>}
				<p className='text-center mt-4'>
					Pas encore de compte ? <br />
					<Link to={ROUTES.SIGN_UP}>Inscrivez-vous !</Link>
				</p>
			</Form>
		</>
	);
};

export default SignIn;
