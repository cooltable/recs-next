import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
	query {
		me {
			id
			email
			username
			receivedFriendRequests {
				from {
					username
				}
				status
				id
			}
			friends {
				id
				username
			}
			sentRecs {
				id
				title
				description
				comments {
					id
					text
					author {
						id
						username
					}
				}
			}
			recievedRecs {
				id
				title
				description
				comments {
					id
				}
			}
		}
	}
`;

const User = props => (
	<Query {...props} query={CURRENT_USER_QUERY}>
		{payload => {
			return props.children(payload);
		}}
	</Query>
);

export default User;
export { CURRENT_USER_QUERY };
