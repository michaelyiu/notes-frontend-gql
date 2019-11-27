import React, { createContext, useState, useEffect } from 'react';


export const NoteContext = createContext();

const NotesContextProvider = (props) => {

	const [notes, setNotes] = useState(() => {
		const localData = localStorage.getItem('notes');
		return localData ? JSON.parse(localData) : [];
	})
	const [pendingNote, setPendingNote] = useState(false);

	const [filter, setFilter] = useState('');

	const addNote = (note) => {
		if (note)
			setNotes([note, ...notes])
	}

	const findPostAndUpdate = (post_id, newPost) => {
		const currentPostIndex = notes.indexOf(findPostById(post_id));
		notes[currentPostIndex] = newPost;
	}

	const findPostById = (post_id) => {
		return notes.find(({ id }) => id === post_id);
	}

	const deleteNote = (post_id) => {
		setNotes(notes.filter(exp => exp.id !== post_id))
	}

	const clearNotes = () => {
		setNotes([]);
	}



	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes))
	}, [notes])

	return (
		<NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, clearNotes, pendingNote, setPendingNote, findPostById, findPostAndUpdate, filter, setFilter }}>
			{props.children}
		</NoteContext.Provider>
	)
}

export default NotesContextProvider
