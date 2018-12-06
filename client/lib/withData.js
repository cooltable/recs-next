import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

function createClient({ headers }) {
	return new ApolloClient({
		uri: 'http://localhost:4000',
		request: operation => {
			operation.setContext({
				fetchOptions: {
					credentials: 'include',
				},
				headers,
			});
		},
	});
}

export default withApollo(createClient);
