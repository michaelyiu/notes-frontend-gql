import React, { useContext, useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_NOTES } from "../../gql/Queries/notes";
import { NoteContext } from '../../contexts/NoteContext';

import Note from "./Note";

import Spinner from '../common/Spinner';
import AddNote from './AddNote';


const Notes = () => {


	const { notes, setNotes } = useContext(NoteContext);



	const { loading, data } = useQuery(GET_NOTES);

	useEffect(() => {
		if (data && data.notes) {
			setNotes(data.notes)
		}
	}, [setNotes, data])

	if (loading) return <Spinner />

	return (
		<div className="notes-page">
			<AddNote />
			<div className="notes-list">
				{notes.length > 0 ? notes.map(note => <Note key={note.id} note={note} />) : "Your notes will show up here!"}
			</div>
		</div>
	)
}

export default Notes;