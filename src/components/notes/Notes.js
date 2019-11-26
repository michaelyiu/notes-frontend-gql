import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useForm } from '../../hooks';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { ADD_NOTE, DELETE_NOTE } from '../../gql/Mutations/notes';
import { GET_NOTES } from "../../gql/Queries/notes";
import { NoteContext } from '../../contexts/NoteContext';
import { NavContext } from '../../contexts/NavContext';

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
			onCompleted(data) {
				if (data && data.createNote) {
					setPendingNote(false);
					addNote(data.createNote);
				}
			}
		}
	)

	const [deleteNoteGQL] = useMutation(
		DELETE_NOTE,
		{
			onCompleted(data) {
				if (data && data.deleteNote)
					deleteNote(data.deleteNote);
			}
		}
	)


	const { notes, setNotes, addNote, deleteNote, pendingNote, setPendingNote } = useContext(NoteContext);
	const { setNavBack } = useContext(NavContext);

	const { loading, data } = useQuery(GET_NOTES);

	useEffect(() => {
		if (data && data.notes) {
			setNotes(data.notes)
		}
	}, [setNotes, data])

	if (loading) return <Spinner />

	const onDeleteClick = (noteId) => {
		deleteNoteGQL({ variables: { id: noteId } })
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
						<Link to={`/note/${note.id}`} onClick={() => {
							setPendingNote(false);
							setNavBack(true);
						}
						}>
							<div className="note-contents">
								<p className="note-title">{note.title}</p>
								<p className="note-body"><span>{moment(note.updated_at).format("LLL")}</span>{note.body}</p>
							</div>
						</Link>
						<div className="note-options">
							{/* <span>
								<Link to={`/note/${note.id}`}>
									<i className="fas fa-pencil-alt"></i>
								</Link>
							</span> */}
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