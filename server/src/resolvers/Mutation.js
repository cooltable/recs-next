import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';
import getUserId from '../utils/getUserId';
import hashPassword from '../utils/hashPassword';

const Mutation = {
	async createUser(parent, args, { prisma }, info) {
		const password = await hashPassword(args.data.password);

		const user = await prisma.mutation.createUser({
			data: {
				...args.data,
				password,
			},
		});

		return {
			user,
			token: generateToken(user.id),
		};
	},
	async login(parent, args, { prisma }, info) {
		const user = await prisma.query.user({
			where: {
				email: args.data.email,
			},
		});

		if (!user) {
			throw new Error('Unable to login');
		}

		const isMatch = await bcrypt.compare(args.data.password, user.password);

		if (!isMatch) {
			throw new Error('Unable to login');
		}

		return {
			user,
			token: generateToken(user.id),
		};
	},
	async updateUser(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		if (typeof args.data.password === 'string') {
			args.data.password = await hashPassword(args.data.password);
		}

		return prisma.mutation.updateUser(
			{
				where: {
					id: userId,
				},
				data: args.data,
			},
			info,
		);
	},

	async createFriendRequest(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const friend = await prisma.query.user({
			where: {
				username: args.data.to,
			},
		});

		const friendExists = await prisma.exists.User({
			id: userId,
			friends_some: {
				id: friend.id,
			},
		});

		const requestExists = await prisma.exists.FriendRequest({
			to: { id: friend.id },
			from: { id: userId },
		});

		if (friendExists || requestExists) throw new Error('Unable to add friend');

		return prisma.mutation.createFriendRequest({
			data: {
				to: {
					connect: {
						id: friend.id,
					},
				},
				from: {
					connect: {
						id: userId,
					},
				},
			},
		});
	},

	async respondFriendRequest(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		console.log(userId);
		const friendRequest = await prisma.query.friendRequests({
			where: {
				id: args.id,
				to: {
					id: userId,
				},
				status_in: [ 'NEW', 'PENDING' ],
			},
		});

		let newFriend = friendRequest[0];
		if (!friendRequest) throw new Error('something went wrong');

		const res = await prisma.mutation.updateFriendRequest({
			where: {
				id: args.id,
			},
			data: { status: args.status },
		});

		if (args.status === 'ACCEPTED') {
			const friend = prisma.mutation.updateUser({
				where: {
					id: userId,
				},
				data: {
					friends: {
						connect: [
							{
								id: newFriend,
							},
						],
					},
				},
			});

			return { message: 'You have a new friend' };
		} else return { message: 'The friend request has been deleted' };
	},

	async createRec(parent, { data }, { prisma, request }, info) {
		const userId = getUserId(request);

		return prisma.mutation.createRec(
			{
				data: {
					title: data.title,
					description: data.description,
					priority: data.priority,
					rating: data.rating,
					image: data.image,
					type: data.type,
					comments: {
						create: [
							{
								text: data.comment,
								author: {
									connect: {
										id: userId,
									},
								},
							},
						],
					},
					fromUser: {
						connect: {
							id: userId,
						},
					},
					toUser: {
						connect: {
							id: data.toUser,
						},
					},
				},
			},
			info,
		);
	},
};

module.exports = Mutation;
