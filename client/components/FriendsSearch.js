import React, { Component } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_USERS_QUERY } from '../queries/Users';
import debounce from 'lodash.debounce';

class FriendsSearch extends Component {
	state = {
		items: [],
		loading: false,
	};

	onChange = debounce(async (e, client) => {
		console.log(e.target);
		this.setState({ loading: true });
		const res = await client.query({
			query: SEARCH_USERS_QUERY,
			variables: { searchTerm: e.target.value },
		});

		let searchField = res.data.allUsers.length ? res.data.allUsers : [];

		this.setState({
			items: searchField,
			loading: false,
		});

		console.log(res.data);
	}, 350);
	render() {
		resetIdCounter();
		return (
			<div>
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
										console.log(client);
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
											<li key={item.id}>{item.username}</li>
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
