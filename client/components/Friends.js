import User, { CURRENT_USER_QUERY } from '../queries/User';
import { RESPOND_REQUEST_MUTATION } from '../mutations/FriendRequest';
import { Mutation } from 'react-apollo';

const Friends = () => (
	<User>
		{({ data }) => (
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				{data.me && !data.me.friends.length ? (
					<div style={{ marginRight: '30px' }}>Ewps u don have friends</div>
				) : (
					<div style={{ marginRight: '30px' }}>
						<h3>My Friends</h3>
						{data.me.friends.map(friend => <li>{friend.username}</li>)}
					</div>
				)}
				<div>
					{data.me && data.me.receivedFriendRequests.length ? (
						<div>
							<h3>Friend Requests</h3>
							{data.me.receivedFriendRequests.map(request => (
								<Mutation
									mutation={RESPOND_REQUEST_MUTATION}
									refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
								>
									{respond => (
										<div>
											<p>{request.from.username}</p>
											<button
												onClick={() =>
													respond({
														variables: {
															id: request.id,
															status: 'ACCEPTED',
														},
													})}
											>
												Add
											</button>
											<button>Ignore</button>
										</div>
									)}
								</Mutation>
							))}
						</div>
					) : (
						<h3>No new friend requests</h3>
					)}
				</div>
			</div>
		)}
	</User>
);

export default Friends;
