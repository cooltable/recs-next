import { GraphQLServer } from 'graphql-yoga';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import prisma from './prisma';

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers: {
		Query,
		Mutation,
	},
	context(request) {
		return {
			prisma,
			request,
		};
	},
});

server.start(() => {
	console.log('The server is up!');
});
