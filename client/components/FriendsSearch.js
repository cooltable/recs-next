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
		const res = await client.query({
			query: SEARCH_USERS_QUERY,
			variables: { searchTerm: e.target.value },
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
					{({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
						<div>
							<ApolloConsumer>
								{client => (
									<input
										{...getInputProps({
											placeholder: 'Search...',
											onChange: e => {
												e.persist();
												this.onChange(e, client);
											},
										})}
									/>
								)}
							</ApolloConsumer>
						</div>
					)}
				</Downshift>
			</div>
		);
	}
}

export default FriendsSearch;
