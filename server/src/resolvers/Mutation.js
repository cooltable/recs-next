import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';
import getUserId from '../utils/getUserId';
import hashPassword from '../utils/hashPassword';

const Mutation = {
	async createUser(parent, args, { prisma, response }, info) {
		const password = await hashPassword(args.data.password);

		const user = await prisma.mutation.createUser({
			data: {
				...args.data,
				password,
			},
		});

		const token = generateToken(user.id);

		response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365,
		});

		return user;
	},
	async login(parent, args, { prisma, response }, info) {
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

		const token = generateToken(user.id);

		response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365,
		});

		return user;
	},
	signout(parent, args, { response }, info) {
		response.clearCookie('token');
		return { message: 'Goodbye!' };
	},
	async updateUser(parent, args, { prisma, request }, info) {
		const { userId } = request;

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
		const { userId } = request;
		if (!userId) {
			throw new Error('You must be logged in!');
		}
		const friend = await prisma.query.user({
			where: {
				id: args.data.to,
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
		console.log(friend.id, friendExists, requestExists);

		if (friendExists || requestExists) throw new Error('Unable to add friend');

		return prisma.mutation.createFriendRequest(
			{
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
			},
			info,
		);
	},

	async respondFriendRequest(parent, args, { prisma, request }, info) {
		const { userId } = request;
		if (!userId) {
			throw new Error('You must be logged in!');
		}
		console.log(userId);
		const [ friendRequest ] = await prisma.query.friendRequests(
			{
				where: {
					id: args.id,
					to: {
						id: userId,
					},
					status_in: [ 'NEW', 'PENDING' ],
				},
			},
			`{id to { id username } from { id username }}`,
		);

		let newFriend = friendRequest.from;
		if (!friendRequest) throw new Error('something went wrong');
		console.log(newFriend.id, userId);
		const res = await prisma.mutation.updateFriendRequest({
			where: {
				id: args.id,
			},
			data: { status: args.status },
		});

		if (args.status === 'ACCEPTED') {
			const friend = await prisma.mutation.updateUser({
				where: {
					id: userId,
				},
				data: {
					friends: {
						connect: [
							{
								id: newFriend.id,
							},
						],
					},
				},
			});

			const secondFriend = await prisma.mutation.updateUser({
				where: {
					id: newFriend.id,
				},
				data: {
					friends: {
						connect: [
							{
								id: userId,
							},
						],
					},
				},
			});

			return { message: 'You have a new friend' };
		} else return { message: 'The friend request has been deleted' };
	},

	async createRec(parent, { data }, { prisma, request }, info) {
		const { userId } = request;
		if (!userId) {
			throw new Error('You must be logged in!');
		}

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
