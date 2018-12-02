import getUserId from '../utils/getUserId';

const Query = {
	me(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		return prisma.query.user(
			{
				where: {
					id: userId,
				},
			},
			info,
		);
	},
	users(parent, args, { prisma }, info) {
		const opArgs = {
			first: args.first,
			skip: args.skip,
			after: args.after,
			orderBy: args.orderBy,
		};

		if (args.query) {
			opArgs.where = {
				OR: [
					{
						name_contains: args.query,
					},
				],
			};
		}
		return prisma.query.users(opArgs, info);
	},
	myFriendRequests(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const opArgs = {
			first: args.first,
			skip: args.skip,
			after: args.after,
			orderBy: args.orderBy,
			where: {
				to: {
					id: userId,
				},
			},
		};

		return prisma.query.friendRequests(opArgs, info);
	},
	myRecs(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const opArgs = {
			first: args.first,
			skip: args.skip,
			after: args.after,
			orderBy: args.orderBy,
			where: {
				toUser: {
					id: userId,
				},
			},
		};

		if (args.query) {
			opArgs.where.OR = [
				{
					type: args.query,
				},
			];
		}

		return prisma.query.recs(opArgs, info);
	},
};

export default Query;
