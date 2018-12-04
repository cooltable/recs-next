import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ALL_RECS_QUERY = gql`
	query {
		myRecs(orderBy: type_ASC) {
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
			response
			type
			priority
			rating
			image
			createdAt
			status
			fromUser {
				id
				username
			}
		}
	}
`;

const Recs = props => (
	<Query {...props} query={ALL_RECS_QUERY}>
		{payload => props.children(payload)}
	</Query>
);

export default Recs;
export { ALL_RECS_QUERY };
