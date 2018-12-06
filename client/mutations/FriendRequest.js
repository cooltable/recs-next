import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_FRIEND_MUTATION = gql`
	mutation createFriendRequest($user: ID!) {
		createFriendRequest(data: { to: $user }) {
			to {
				id
			}
			status
		}
	}
`;

const RESPOND_REQUEST_MUTATION = gql`
	mutation respondFriendRequest($id: ID!, $status: ReqStatusType!) {
		respondFriendRequest(id: $id, status: $status) {
			message
		}
	}
`;

const FriendRequestMutation = props => (
	<Mutation mutation={ADD_FRIEND_MUTATION} variables={{ username: props.username }}>
		{addFriend => {
			console.log(addFriend);
			return props.children(addFriend);
		}}{' '}
	</Mutation>
);

export default FriendRequestMutation;

export { ADD_FRIEND_MUTATION, RESPOND_REQUEST_MUTATION };
