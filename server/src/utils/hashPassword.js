import bcrypt from 'bcryptjs';

const hashPassword = password => {
	if (password.length < 8) {
		throw new Error('must be 8 char or longer');
	}

	return bcrypt.hash(password, 10);
};

export default hashPassword;
