import React from 'react'
import bear from './bear.gif';

export const NoteNotFound = () => {
	return (
		<div className="noteNotFound">
			<img src={bear} alt="" />
			<p>No notes were found, your notes will show up here</p>
		</div>
	)
}
