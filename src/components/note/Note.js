import React, { useContext } from 'react';
import { useForm } from '../../hooks';
import { useParams, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';


import { useMutation } from '@apollo/react-hooks';
import { EDIT_NOTE } from '../../gql/Mutations/notes';

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

import { NoteContext } from '../../contexts/NoteContext';

const moment = require('moment');

const Note = () => {
	const { findPostById, findPostAndUpdate } = useContext(NoteContext);
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
		<form onSubmit={handleSubmit}>
			<TextFieldGroup
				placeholder="Title"
				name="title"
				type="title"
				value={values.title}
				onChange={handleChange}
			// error={errors && errors.email ? errors.email : null}
			/>

			<TextAreaFieldGroup
				placeholder="Body"
				name="body"
				type="body"
				value={values.body}
				onChange={handleChange}
			// error={errors && errors.password ? errors.password : null}
			/>
			<p>Last edited: {moment(postToEdit.updated_at).format("LLL")}</p>
			<input type="submit" className="btn btn-info btn-block col-2" />
		</form>
	)
}

export default Note;