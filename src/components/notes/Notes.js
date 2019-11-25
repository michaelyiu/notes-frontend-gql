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

		addNoteGQL(values);

	}, {
		title: '',
		body: ''
	})

	const [addNoteGQL] = useMutation(
		ADD_NOTE,
		{
			variables: values,
			onCompleted() {
				setPendingNote(false);
				addNote(values);
			}
		}
	)

	const { notes, setNotes, addNote, pendingNote, setPendingNote } = useContext(NoteContext);
	const { loading, data, error } = useQuery(GET_NOTES);

	useEffect(() => {
		if (data && data.notes) {
			const date = moment.parseZone(data.notes.date).format("LLL");
			console.log(data.notes);
			setNotes(data.notes)
		}
	}, [data])

	if (loading) return <Spinner />

	const onEditClick = (noteId) => {
		console.log('on edit click', noteId)
	}

	const onDeleteClick = (noteId) => {
		console.log('on delete click', noteId)
	}

	return (
		<div className="notes-page">

			<form onSubmit={handleSubmit} className={"pending-note-container " + (pendingNote ? 'slideNoteDown' : null)}>
				<input type='text'
					className="note-title"
					placeholder="Title"
					name="title"
					value={values.title}
					onChange={handleChange}
				/>
				<input type='text'
					className="note-body"
					placeholder="Body"
					name="body"
					value={values.body}
					onChange={handleChange}
				/>
				{/* maybe hide this button? */}
				<button type="submit" value="Submit">Submit</button>
			</form>
			<div>
				{notes.length > 0 ? notes.map(note => (
					<div key={note.id} className={"note-container"}>
						<div className="note-contents">
							<p className="note-title">{note.title}</p>
							<p className="note-body"><span>{moment(note.date).format("LLL")}</span>{note.body}</p>
						</div>
						<div className="note-options">
							<span onClick={() => onEditClick(note.id)}>
								<i className="fas fa-pencil-alt"></i>
							</span>
							<span onClick={() => onDeleteClick(note.id)}>
								<i className="fas fa-trash-alt"></i>
							</span>
						</div>
					</div>
				)) : "Your notes will show up here!"}
			</div>
		</div>
	)
}

export default Notes;