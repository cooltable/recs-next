import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../queries/User';
import { ALL_RECS_QUERY } from '../queries/Recs';

const SIGN_OUT_MUTATION = gql`
	mutation SIGN_OUT_MUTATION {
		signout {
			message
		}
	}
`;

const Signout = props => (
	<Mutation mutation={SIGN_OUT_MUTATION}>{signout => props.children(signout)}</Mutation>
);

export default Signout;
