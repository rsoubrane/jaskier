import React, { useState } from "react";

//Firebase
import { loginUser } from "../../services/user";

//Utils
import { Link } from "react-router-dom";
import { Container, Col, Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from "reactstrap";

//Constants
import * as ROUTES from "../../constants/routes";

const SignIn = props => {
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

	const submitForm = e => {
		e.preventDefault();
		let errorsTTT = loginUser(email, password);
		console.log("loginUser(email, password): ", loginUser(email, password));
		console.log("errorsTTT: ", errorsTTT);
	};
	// 	const submitForm = async e => {
	// 	e.preventDefault();
	// 	try {
	// 		let errorsTTT = await loginUser(email, password);
	// 		console.log("errorsTTT: ", errorsTTT);
	// 	} catch (error) {
	// 		console.log("error: ", error);
	// 		setErrors(error);
	// 	}
	// 	console.log("errors: ", errors);
	// };

	return (
		<Container fluid>
			<h2>Sign In</h2>

			<Form className='form' onSubmit={e => submitForm(e)}>
				<Col>
					<FormGroup>
						<Label>Email Address</Label>
						<Input
							type='email'
							name='email'
							id='email'
							placeholder='myemail@email.com'
							autoComplete='off'
							value={email}
							valid={validate.emailState === "has-success"}
							invalid={validate.emailState === "has-danger"}
							onChange={e => {
								validateEmail(e);
								setEmail(e.target.value);
							}}
						/>
						<FormFeedback valid>That's a tasty looking email you've got there.</FormFeedback>
						<FormFeedback>
							Uh oh! Looks like there is an issue with your email. Please input a correct email.
						</FormFeedback>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label for='password'>Password</Label>
						<Input
							type='password'
							name='password'
							id='password'
							placeholder='password'
							value={password}
							onChange={e => {
								setPassword(e.target.value);
							}}
						/>
					</FormGroup>
				</Col>
				<Button>Sign In</Button>
			</Form>

			{errors && <p>{errors.message}</p>}

			<p>
				Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
			</p>
		</Container>
	);
};

export default SignIn;
