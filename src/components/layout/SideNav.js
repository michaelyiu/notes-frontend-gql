import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from '../../contexts/AuthContext';
import { NoteContext } from '../../contexts/NoteContext';
import { NavContext } from '../../contexts/NavContext';
import SearchNotes from '../notes/SearchNotes';

const SideNav = () => {

	const { isAuthenticated, toggleAuth } = useContext(AuthContext);
	const { setPendingNote } = useContext(NoteContext);
	const { navBack, setNavBack } = useContext(NavContext);

	let history = useHistory();

	//clear localstorage and all states on log out
	const onLogoutClick = e => {
		e.preventDefault();
		setPendingNote(false);
		localStorage.clear();
		toggleAuth();
		history.push("/login");
	}

	/* navBack state from NavContext for conditional rendering between 'Back' and 'Add Note'
	*	When Add note is clicked, form will pop up showing AddNote component
	*/
	const authLinks = (
		<nav id="menu">
			<header>
				<Link className="nav-link" to="/" onClick={() => setNavBack(false)}>
					MyNotes
				</Link>
			</header>
			<ul className="navbar-nav" onClick={() => setNavBack(false)}>
				<li className="nav-item">
					{
						navBack ? (
							<div className="nav-item" onClick={() => {
								history.push('/notes');
							}}>
								Back
							</div>
						) : (
								<div className="nav-item" onClick={() => setPendingNote(true)}>
									Add Note
								</div>
							)
					}

				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/notes">
						Notes
        	</Link>
				</li>
				<li className="nav-item">
					<SearchNotes />
				</li>
				<li className="nav-item">
					<a
						href="/#"
						onClick={onLogoutClick}
						className="nav-link"
					>
						Logout
        </a>
				</li>
				<li className="nav-item last-item">
					<p>
						Logged in as: {localStorage.getItem('email')}
					</p>
				</li>
			</ul>
		</nav >
	)

	const guestLinks = (
		<nav id="menu">
			<header>
				<Link className="nav-link" to="/">
					MyNotes
				</Link>
			</header>
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" to="/register">
						Sign Up
        </Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Login
        	</Link>
				</li>
			</ul>
		</nav>
	);

	// conditionally render navbars depending if you're logged in or not
	return (
		<React.Fragment>
			{isAuthenticated ? authLinks : guestLinks}
		</React.Fragment>

	)
}

export default SideNav;
