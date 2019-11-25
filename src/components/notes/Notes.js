import React, { useContext, useEffect } from 'react';
import { useForm } from '../../hooks';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { ADD_NOTE } from '../../gql/Mutations/notes';
import { GET_NOTES } from "../../gql/Queries/notes";
import { NoteContext } from '../../contexts/NoteContext';

import TextFieldGroup from '../common/TextFieldGroup';
import Spinner from '../common/Spinner';

const moment = require('moment');

const Notes = () => {
	const { values, handleChange, handleSubmit } = useForm(() => {
		addNote(values);
	}, {
		title: '',
		body: ''
	})

	const [addNote] = useMutation(
		ADD_NOTE,
		{
			variables: values
		}
	)

	const { notes, setNotes, pendingNote } = useContext(NoteContext);
	// const [notes, setNotes] = useState([]);
	const { loading, data, error } = useQuery(GET_NOTES);

	const newNoteInput = (
		<form onSubmit={handleSubmit}>
			<TextFieldGroup
				placeholder="Title"
				name="title"
				value={values.title}
				onChange={handleChange}
			/>
			<TextFieldGroup
				placeholder="Body"
				name="body"
				value={values.body}
				onChange={handleChange}
			/>
			{/* maybe hide this button? */}
			<button type="submit" value="Submit">Submit</button>
		</form>
	)


	useEffect(() => {
		if (data && data.notes) {
			// const date = new Date(data.notes.date);
			const date = moment.parseZone(data.notes.date).format("LLL");
			console.log(data.notes);
			// console.log(date);
			setNotes(data.notes)
		}
	}, [data])

	if (loading) return <Spinner />

	return (
		<div className="notes-page">

			{pendingNote ? newNoteInput : null}
			<div>
				{notes.length > 0 ? notes.map(note => (
					<div key={note.id} className="note-container">
						<p className="note-title">{note.title}</p>
						<p className="note-body"><span>{moment(note.date).format("LLL")}</span>{note.body}</p>
					</div>
				)) : "Your notes will show up here!"}
			</div>
		</div>
	)
}

export default Notes;