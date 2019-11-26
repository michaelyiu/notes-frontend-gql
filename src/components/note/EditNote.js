import React, { useContext } from 'react';
import { useForm } from '../../hooks';
import { useParams, useHistory } from 'react-router-dom';


import { useMutation } from '@apollo/react-hooks';
import { EDIT_NOTE } from '../../gql/Mutations/notes';

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

import { NoteContext } from '../../contexts/NoteContext';
import { NavContext } from '../../contexts/NavContext';

const moment = require('moment');

const EditNote = () => {
	const { findPostById, findPostAndUpdate } = useContext(NoteContext);
	const { setNavBack } = useContext(NavContext);
	const { id } = useParams();
	const postToEdit = findPostById(id);

	let history = useHistory();

	const { values, handleChange, handleSubmit } = useForm(() => {
		editNoteGQL(values);
		history.push('/notes');
	}, {
		id: postToEdit.id,
		title: postToEdit.title,
		body: postToEdit.body
	});

	const [editNoteGQL] = useMutation(
		EDIT_NOTE,
		{
			variables: values,
			onCompleted(data) {
				if (data && data.editNote) {
					findPostAndUpdate(data.editNote)
				}
			}
		}
	)

	return (
		<div className="edit-note-container">
			<form onSubmit={handleSubmit} className="edit-note-form">
				<h3>Edit Note</h3>
				<TextFieldGroup
					className="edit-note-title"
					placeholder="Title"
					name="title"
					type="title"
					value={values.title}
					onChange={handleChange}
				// error={errors && errors.email ? errors.email : null}
				/>

				<TextAreaFieldGroup
					className="edit-note-body"
					placeholder="Body"
					name="body"
					type="body"
					value={values.body}
					onChange={handleChange}
				// error={errors && errors.password ? errors.password : null}
				/>
				<p>Last edited: {moment(postToEdit.updated_at).format("LLL")}</p>
				<input type="submit" className="btn-submit col-2" />
				<input type="button" onClick={() => {
					setNavBack(false);
					history.push('/notes')
				}} className="btn-cancel col-2" value="Cancel" />

			</form >

		</div>
	)
}

export default EditNote;