import { AuthForm, AuthInput } from '../components/AuthForm';

class Register extends React.Component {
	state = { username: '', password: '', passwordCheck: '', firstName: '', lastName: '', email: '' };

	handleChange = (e, a) => {
		e.preventDefault();
		console.log(e, a);
	};
	render() {
		let { username, password, passwordCheck, firstName, lastName, email } = this.state;
		return (
			<AuthForm title="Sign Up" handleSubmit={() => console.log('hi')}>
				<AuthInput
					name="firstName"
					type="text"
					label="First"
					value={firstName}
					handleChange={this.handleChange}
				/>
				<AuthInput name="lastName" type="text" label="Last" value={lastName} handleChange={this.handleChange} />
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
					value={passwordCheck}
					handleChange={this.handleChange}
				/>
			</AuthForm>
		);
	}
}

export default Register;
