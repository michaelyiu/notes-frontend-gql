import { gql } from "apollo-boost";

const GET_NOTES = gql`
	query {
		notes{
			id
    	title
			body
			user
			date
		}
  }
`
export {
	GET_NOTES
};