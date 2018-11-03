import { AuthForm, AuthInput } from '../components/AuthForm';

class Login extends React.Component {
	state = { username: '', password: '' };

	handleChange = (e, a) => {
		e.preventDefault();
		console.log(e, a);
	};

	render() {
		let { username, password } = this.state;
		return (
			<AuthForm title="Log In" handleSubmit={() => console.log('hi')}>
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
			</AuthForm>
		);
	}
}

export default Login;
