import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
	query {
		me {
			id
			email
			username
		}
	}
`;

const User = props => (
	<Query {...props} query={CURRENT_USER_QUERY}>
		{payload => {
			console.log(payload.data);
			return props.children(payload);
		}}
	</Query>
);

export default User;
export { CURRENT_USER_QUERY };
