import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const SEARCH_USERS_QUERY = gql`
	query SEARCH_USERS_QUERY($searchTerm: String!) {
		allUsers(query: $searchTerm) {
			id
			name
			username
			email
		}
	}
`;

// const Users = props => (
// 	<Query {...props} query={ALL_USERS_QUERY}>
// 		{payload => props.children(payload)}
// 	</Query>
// );

//export default Users;
export { SEARCH_USERS_QUERY };
