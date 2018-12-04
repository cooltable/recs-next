import { GraphQLServer } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import prisma from './prisma';

function createServer() {
	return new GraphQLServer({
		typeDefs: './src/schema.graphql',
		resolvers: {
			Query,
			Mutation,
		},
		context: request => ({
			...request,
			prisma,
		}),
	});
}

export default createServer;
