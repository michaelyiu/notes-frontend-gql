import React from 'react';
import { useForm } from '../../hooks';
import { Redirect } from 'react-router';

import { useMutation } from '@apollo/react-hooks';
import { SIGNUP_MUTATION } from "../../gql/Mutations/auth";

import TextFieldGroup from "../common/TextFieldGroup";


const Register = () => {
	const { values, handleChange, handleSubmit } = useForm(() => {
		signUp();
	}, {
		name: '',
		email: '',
		password: '',
		password2: ''
	})

	const [signUp, { loading, data, error }] = useMutation(
		SIGNUP_MUTATION,
		{
			variables: values
		}
	);

	console.log(error);
	// let errors;
	// if (!loading && error) {
	// 	errors = error.graphQLErrors[0].extensions.exception.errors;
	// }
	// console.log()

	if (data) {
		// 	// Redirect to home page
		return <Redirect to='/login' />
	}

	return (
		<div className="register">
			<div className="container">
				<div className="row">
					<div className="col-8">
						<h1 className="text-center">Sign Up</h1>
						<p className="text-center">
							Create your account to start writing notes!
						</p>
						<form onSubmit={handleSubmit} noValidate>
							<TextFieldGroup
								placeholder="Name"
								name="name"
								value={values.name}
								onChange={handleChange}
							// error={errors && errors.name ? errors.name : null}
							/>
							<TextFieldGroup
								placeholder="Email Address"
								name="email"
								type="email"
								value={values.email}
								onChange={handleChange}
							// error={errors && errors.email ? errors.email : null}
							/>
							<TextFieldGroup
								placeholder="Password"
								name="password"
								type="password"
								value={values.password}
								onChange={handleChange}
							// error={errors && errors.password ? errors.password : null}
							/>
							<TextFieldGroup
								placeholder="Confirm Password"
								name="password2"
								type="password"
								value={values.password2}
								onChange={handleChange}
							// error={errors && errors.password2 ? errors.password2 : null}
							/>
							<input type="submit" className="btn btn-info btn-block col-2" />
						</form>

					</div>

				</div>
			</div>
		</div>
	)
}

export default Register;