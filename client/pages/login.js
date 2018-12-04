import { AuthForm, AuthInput, AuthButton } from '../components/AuthForm';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../queries/User';
import { ALL_RECS_QUERY } from '../queries/Recs';

const LOGIN_MUTATION = gql`
	mutation LOGIN_MUTATION($email: String!, $password: String!) {
		login(data: { email: $email, password: $password }) {
			id
			email
			name
			username
		}
	}
`;

class Login extends React.Component {
	state = { email: '', password: '' };

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		let { email, password } = this.state;
		return (
			<Mutation
				mutation={LOGIN_MUTATION}
				variables={this.state}
				refetchQueries={[ { query: CURRENT_USER_QUERY }, { query: ALL_RECS_QUERY } ]}
			>
				{(login, { error, loading }) => (
					<AuthForm
						title='Log In'
						handleSubmit={async e => {
							e.preventDefault();
							await login();
							Router.push('/recs');
						}}
					>
						<AuthInput
							name='email'
							type='email'
							label='Email'
							value={email}
							handleChange={this.handleChange}
						/>
						<AuthInput
							name='password'
							type='password'
							label='Password'
							value={password}
							handleChange={this.handleChange}
						/>
						<AuthButton />
					</AuthForm>
				)}
			</Mutation>
		);
	}
}

export default Login;
