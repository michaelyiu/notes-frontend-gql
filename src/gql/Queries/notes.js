import { gql } from "apollo-boost";

const GET_NOTES = gql`
	query($filter: String) {
		notes(filter: $filter){
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