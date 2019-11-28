import React, { useContext } from 'react'
import { Link } from "react-router-dom";

import { useMutation } from '@apollo/react-hooks';
import { DELETE_NOTE } from '../../gql/Mutations/notes';

import { NavContext } from '../../contexts/NavContext';
import { NoteContext } from '../../contexts/NoteContext';

const moment = require('moment');

const Note = (props) => {
	const { note } = props;
	const { setNavBack } = useContext(NavContext);
	const { deleteNote, setPendingNote } = useContext(NoteContext);

	const [deleteNoteGQL] = useMutation(
		DELETE_NOTE,
		{
			onCompleted(data) {
				if (data && data.deleteNote)
					deleteNote(data.deleteNote);
			}
		}
	);

	const onDeleteClick = (noteId) => {
		deleteNoteGQL({ variables: { id: noteId } })
	};

	return (
		// onEditClick, states are set to reset the AddNote pending state
		// Back button shows up on the navbar
		<div key={note.id} className={"note-container"}>
			<Link to={`/edit-note/${note.id}`} onClick={() => {
				setPendingNote(false);
				setNavBack(true);
			}
			}>
				<div className="note-contents">
					<div className="note-block">
						<p className="note-title">{note.title}</p>
						<p className="note-time">{moment(note.updated_at).fromNow()}</p>
					</div>
					<p className="note-body">{note.body}</p>
				</div>
			</Link>
			<div className="note-options">
				<span onClick={() => onDeleteClick(note.id)}>
					<i className="fas fa-trash-alt"></i>
				</span>
			</div>
		</div>

	)
}

export default Note;