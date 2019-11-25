import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from '../../contexts/AuthContext';
import { NoteContext } from '../../contexts/NoteContext';

const SideNav = () => {
	const { isAuthenticated, toggleAuth } = useContext(AuthContext);
	const { setPendingNote } = useContext(NoteContext);

	let history = useHistory();

	const test = () => {
		setPendingNote(true);

	}

	const onLogoutClick = e => {
		e.preventDefault();
		localStorage.clear();
		toggleAuth();
		history.push("/login");
	}

	const authLinks = (
		<nav id="menu">
			<header>
				<Link className="nav-link" to="/">
					MyNotes
				</Link>
			</header>
			<ul className="navbar-nav">
				<li className="nav-item">
					<button onClick={test}>
						Add Note
        	</button>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/notes">
						Notes
        	</Link>
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
			</ul>
		</nav>
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

	return (
		<React.Fragment>
			{isAuthenticated ? authLinks : guestLinks}
		</React.Fragment>

	)
}

export default SideNav;
