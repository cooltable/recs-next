import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import createServer from './server';
import prisma from './prisma';

const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
	const { token } = req.cookies;

	if (token) {
		const { userId } = jwt.verify(token, 'thisisasecret');
		req.userId = userId;
	}
	console.log('first middleware ' + token);
	next();
});

server.express.use(async (req, res, next) => {
	console.log('second middleware ' + req.userId);
	if (!req.userId) return next();
	const user = await prisma.query.user(
		{
			where: { id: req.userId },
		},
		'{id, email, username, name}',
	);

	req.user = user;

	next();
});

server.start(
	{
		cors: {
			credentials: true,
			origin: 'http://localhost:7000',
		},
	},
	() => {
		console.log('The server is up!');
	},
);
