import jwt from 'jsonwebtoken';

const generateToken = userId => {
	return jwt.sign({ userId }, 'thisisasecret');
};

export default generateToken;
