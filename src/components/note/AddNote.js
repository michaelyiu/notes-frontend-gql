import React, { useContext } from 'react';
import { useForm } from '../../hooks';

import { useMutation } from '@apollo/react-hooks';
import { ADD_NOTE } from '../../gql/Mutations/notes';

import { NoteContext } from '../../contexts/NoteContext';

const AddNote = () => {
	const { values, handleChange, handleSubmit } = useForm(() => {
		if (values.title === '' && values.body === '') {
			setPendingNote(false);
		}
		addNoteGQL(values);
	}, {
		title: '',
		body: ''
	})

	const { addNote, pendingNote, setPendingNote } = useContext(NoteContext);

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

	return (
		<form onSubmit={handleSubmit} className={"pending-note-container " + (pendingNote ? 'slideNoteDown' : null)}>
			<input type='text'
				className="new-note-title"
				placeholder="Title"
				name="title"
				value={values.title}
				onChange={handleChange}
			/>
			<textarea type='text'
				className="new-note-body"
				placeholder="Body"
				name="body"
				value={values.body}
				onChange={handleChange}
			/>
			<div className="btn-group">
				<input type="submit" className="btn-submit col-2" />
				<input type="button" onClick={() => {
					setPendingNote(false);
				}} className="btn-cancel col-2" value="Cancel" />
			</div>
		</form>
	)
}

export default AddNote;