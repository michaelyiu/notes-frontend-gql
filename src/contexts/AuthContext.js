import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
	//Get initial state of the app to whatever is in the localStorage
	const [isAuthenticated, setAuth] = useState(() => {
		const localData = localStorage.getItem('isAuthenticated');
		return localData ? JSON.parse(localData) : false;
	});
	const [currentUser, setCurrentUser] = useState(() => {
		const localData = localStorage.getItem('currentUser');
		return localData ? JSON.parse(localData) : {};
	})
	//Methods to change states
	const toggleAuth = () => {
		setAuth(!isAuthenticated)
	}
	const addCurrentUser = (user) => {
		setCurrentUser(user);
	}
	const clearCurrentUser = () => {
		setCurrentUser({})
	}

	// Kinda like the event listeners for the state variables, when changes happen, useEffect kicks in.
	// Can be combined into one and the second variable can be [isAuthenticated, currentUser]
	useEffect(() => {
		localStorage.setItem('isAuthenticated', isAuthenticated)
	}, [isAuthenticated])
	useEffect(() => {
		localStorage.setItem('currentUser', JSON.stringify(currentUser))
	}, [currentUser])

	return (
		<AuthContext.Provider value={{ isAuthenticated, toggleAuth, currentUser, addCurrentUser, clearCurrentUser }}>
			{props.children}
		</AuthContext.Provider>
	)

}

export default AuthContextProvider;
