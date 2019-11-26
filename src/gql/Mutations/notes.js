import { gql } from "apollo-boost";

const ADD_NOTE = gql`
	mutation createNote($title: String!, $body: String!) {
		createNote(title: $title, body: $body) {
			id
			title
			body
		}
	}
`;

const EDIT_NOTE = gql`
	mutation editNote($id: ID!, $title: String!, $body: String!) {
		editNote(id: $id, title: $title, body: $body){
			id
			title
			body
		}
	}
`;

const DELETE_NOTE = gql`
	mutation deleteNote($id: ID!){
		deleteNote(id: $id)
	}
`;

export {
	ADD_NOTE,
	EDIT_NOTE,
	DELETE_NOTE
};