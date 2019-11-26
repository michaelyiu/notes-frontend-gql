import React, { createContext, useState } from 'react';

export const NavContext = createContext();

const NavContextProvider = (props) => {
	const [navBack, setNavBack] = useState(false);

	return (
		<NavContext.Provider value={{ navBack, setNavBack }}>
			{props.children}
		</NavContext.Provider>
	)
}

export default NavContextProvider
