import React, { createContext, useState, useEffect } from 'react'


export const NoteContext = createContext();

const NotesContextProvider = (props) => {

	const [notes, setNotes] = useState(() => {
		const localData = localStorage.getItem('notes');
		return localData ? JSON.parse(localData) : [];
	})
	const [pendingNote, setPendingNote] = useState(false);

	const addNote = (note) => {
		if (note)
			setNotes([note, ...notes])
	}

	// const findExpAndUpdate = (exp_id, newExp) => {
	// 	const currentExpIndex = notes.indexOf(findExpById(exp_id));
	// 	notes[currentExpIndex] = newExp;
	// }

	// const findExpById = (exp_id) => {
	// 	return notes.find(({ id }) => id === exp_id);
	// }

	const deleteNote = (exp_id) => {
		setNotes(notes.filter(exp => exp.id !== exp_id))
	}

	const clearNotes = () => {
		setNotes([]);
	}



	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes))
	}, [notes])

	return (
		<NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, clearNotes, pendingNote, setPendingNote }}>
			{props.children}
		</NoteContext.Provider>
	)
}

export default NotesContextProvider
