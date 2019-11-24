import React from 'react'
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";




const Hello = () => {
	const HI = gql`
	{
		hello
	}
	`;

	const { data, loading, error } = useQuery(HI);
	console.log(data);
	return (
		<div>
			{data ? data.hello : null}
		</div>
	)
}

export default Hello;