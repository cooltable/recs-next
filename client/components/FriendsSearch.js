import React, { Component } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import { Mutation } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_USERS_QUERY } from '../queries/Users';
import { CURRENT_USER_QUERY } from '../queries/User';
import { ADD_FRIEND_MUTATION } from '../mutations/FriendRequest';
import debounce from 'lodash.debounce';

class FriendsSearch extends Component {
	state = {
		items: [],
		loading: false,
	};

	onChange = debounce(async (e, client) => {
		this.setState({ loading: true });
		const res = await client.query({
			query: SEARCH_USERS_QUERY,
			variables: { searchTerm: e.target.value },
		});
		let { me } = client.cache.readQuery({ query: CURRENT_USER_QUERY });

		let searchField = res.data.allUsers.length
			? res.data.allUsers.reduce((filtered, user) => {
					if (user.id !== me.id) {
						if (me.friends.some(friend => friend.id === user.id)) user.isFriend = true;
						filtered.push(user);
					}
					return filtered;
				}, [])
			: [];
		console.log(searchField);
		this.setState({
			items: searchField,
			loading: false,
		});
	}, 350);
	render() {
		resetIdCounter();
		return (
			<div>
				<h3>Add a new friend</h3>
				<Downshift
					onChange={selection =>
						alert(
							selection
								? `You selected ${itemToString(selection)}`
								: 'selection cleared',
						)}
					itemToString={item => (item === null ? '' : item.name)}
				>
					{({
						getInputProps,
						getMenuProps,
						getItemProps,
						isOpen,
						inputValue,
						highlightedIndex,
					}) => (
						<div>
							<div>
								<ApolloConsumer>
									{client => {
										return (
											<input
												{...getInputProps({
													placeholder: 'Search...',
													onChange: e => {
														e.persist();
														this.onChange(e, client);
													},
												})}
											/>
										);
									}}
								</ApolloConsumer>
							</div>
							<div>
								<ul>
									{isOpen ? (
										this.state.items.map((item, i) => (
											<div key={item.id}>
												<div>{item.username}</div>
												{!item.isFriend && (
													<Mutation
														mutation={ADD_FRIEND_MUTATION}
														variables={{ user: item.id }}
														refetchQueries={[
															{ query: CURRENT_USER_QUERY },
														]}
													>
														{(addFriend, { loading, error }) => (
															<button
																disabled={loading}
																onClick={() =>
																	addFriend()
																		.then(res =>
																			console.log(res),
																		)
																		.catch(err =>
																			console.log(err),
																		)}
															>
																Add friend
															</button>
														)}
													</Mutation>
												)}
											</div>
										))
									) : null}
								</ul>
							</div>
						</div>
					)}
				</Downshift>
			</div>
		);
	}
}

export default FriendsSearch;
