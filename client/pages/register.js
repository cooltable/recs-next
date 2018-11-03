import { useState, useEffect } from 'react';

import { AuthForm, AuthInput } from '../components/AuthForm';

class Register extends React.Component {
	state = { username: '', password: '', passwordCheck: '', first: '', last: '', email: '' };

	handleChange = (e, a) => {
		e.preventDefault();
		console.log(e, a);
	};
	render() {
		let { username, password, passwordCheck, first, last, email } = this.state;
		return (
			<AuthForm title="Sign Up" handleSubmit={() => console.log('hi')}>
				<AuthInput name="first" type="text" label="First" value={first} handleChange={this.handleChange} />
				<AuthInput name="last" type="text" label="Last" value={last} handleChange={this.handleChange} />
				<AuthInput name="email" type="email" label="Email" value={email} handleChange={this.handleChange} />
				<AuthInput
					name="username"
					type="text"
					label="Username"
					value={username}
					handleChange={this.handleChange}
				/>
				<AuthInput
					name="password"
					type="password"
					label="Password"
					value={password}
					handleChange={this.handleChange}
				/>
				<AuthInput
					name="passwordCheck"
					type="password"
					label="Re-enter Password"
					value={password}
					handleChange={this.handleChange}
				/>
			</AuthForm>
		);
	}
}

export default Register;
