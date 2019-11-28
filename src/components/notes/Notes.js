import React, { useContext, useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_NOTES } from "../../gql/Queries/notes";
import { NoteContext } from '../../contexts/NoteContext';

import Note from "./Note";

import Spinner from '../common/Spinner';
import AddNote from '../note/AddNote';
import { NoteNotFound } from '../common/NoteNotFound';


const Notes = () => {
	const { notes, setNotes, filter } = useContext(NoteContext);

	const { loading, data } = useQuery(GET_NOTES, {
		variables: { filter },
		fetchPolicy: 'network-only'
	});

	// watches the filter state from the NoteContext, data from the query hook and setNotes, will rerender if state changes
	useEffect(() => {
		if (data && data.notes) {
			setNotes(data.notes)
		}
	}, [setNotes, data, filter])

	if (loading) return <Spinner />

	// 
	return (
		<div className="notes-page">
			<AddNote />
			<div className="notes-list">
				{notes.length > 0 ? notes.map(note => <Note key={note.id} note={note} />) : <NoteNotFound />}
			</div>
		</div>
	)
}

export default Notes;