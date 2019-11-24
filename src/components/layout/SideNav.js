import React from 'react';
import { Link, useHistory } from "react-router-dom";

const SideNav = () => {



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
			{guestLinks}
		</React.Fragment>

	)
}

export default SideNav;
