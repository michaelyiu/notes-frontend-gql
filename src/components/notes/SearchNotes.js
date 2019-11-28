import React, { useContext } from 'react';
import { useForm } from '../../hooks';
import { NoteContext } from '../../contexts/NoteContext';

const SearchNotes = () => {
	const { values, handleChange, handleSubmit } = useForm(() => {
		setFilter(values.filter)
		values.filter = '';
	}, {
		filter: ''
	})

	const { setFilter } = useContext(NoteContext);
	// form sets the filter onSubmit
	return (
		<form onSubmit={handleSubmit}>
			<input type="text" className="search-notes" placeholder="Search notes.." name="filter" onChange={handleChange} />
			<button className="search-submit" type="submit"><i className="fa fa-search"></i></button>
		</form>
	)
}

export default SearchNotes;