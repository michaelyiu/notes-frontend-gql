import { gql } from "apollo-boost";

const GET_NOTES = gql`
	query {
		notes{
			id
    	title
			body
			user
			created_at
			updated_at
		}
  }
`
export {
	GET_NOTES
};