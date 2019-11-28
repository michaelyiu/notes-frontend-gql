import React, { useContext } from 'react';
import { useForm } from '../../hooks';
import { Redirect } from 'react-router';

import { useMutation } from '@apollo/react-hooks';
import { SIGNIN_MUTATION } from "../../gql/Mutations/auth";

import { AuthContext } from './../../contexts/AuthContext';

import TextFieldGroup from "../common/TextFieldGroup";

const Login = () => {
	const { values, handleChange, handleSubmit } = useForm(() => {
		signIn()
	}, {
		email: '',
		password: ''
	});

	const { isAuthenticated, toggleAuth } = useContext(AuthContext);

	const [signIn, { loading, data, error }] = useMutation(
		SIGNIN_MUTATION,
		{
			variables: values,
			onCompleted(data) {
				if (data && data.signIn)
					toggleAuth();
			},

		}
	);

	let errors;
	if (!loading && error) {
		errors = error.graphQLErrors[0].extensions.exception.errors;
	}

	// Store token if login is successful
	if (data) {
		window.localStorage.setItem('token', data.signIn.token)
		window.localStorage.setItem('email', data.signIn.email)
		// Redirect to home page
		return <Redirect to='/notes' />
	}

	/*if authenticated and cant retrieve token, we toggle the auth back to false to reset. 
	  if we CAN retrieve the token then we're authenticated
	*/
	if (isAuthenticated && !window.localStorage.getItem('token')) {
		toggleAuth();
	}
	else if (isAuthenticated) {
		return <Redirect to='/notes' />

	}

	return (
		<div className="login">
			<div className="container">
				<div className="row">
					<div className="col-8">
						<h1 className="display-4 text-center">Log In</h1>
						<p className="text-center">
							Sign into your account
						</p>
						<form onSubmit={handleSubmit}>
							<TextFieldGroup
								placeholder="Email Address"
								name="email"
								type="email"
								value={values.email}
								onChange={handleChange}
								error={errors && errors.email ? errors.email : null}
							/>

							<TextFieldGroup
								placeholder="Password"
								name="password"
								type="password"
								value={values.password}
								onChange={handleChange}
								error={errors && errors.password ? errors.password : null}
							/>

							<input type="submit" className="btn-submit col-2" />

						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;