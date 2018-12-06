import React, { Component } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_USERS_QUERY } from '../queries/Users';
import { CURRENT_USER_QUERY } from '../queries/User';
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
			? res.data.allUsers.filter(user => user.id !== me.id)
			: [];

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
												<button>Add friend</button>
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
