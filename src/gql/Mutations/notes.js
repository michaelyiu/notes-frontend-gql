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

export {
	ADD_NOTE
};