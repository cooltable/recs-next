import Link from 'next/link';
import Router from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import User from '../queries/User';
import Signout from '../mutations/Signout';
import { theme } from './Page';

const StyledNav = styled.div`
	display: flex;
	align-items: center;
	padding: 3rem 0;
	color: ${props => props.theme.colorPrimaryDark};
`;

const NavBrand = styled.div`flex-grow: 1;`;

const Brand = styled.h2`
	display: inline;
	font-family: Charmonman;
	font-weight: 700;
	font-size: 40px;
	margin-left: 40px;
	cursor: pointer;
	&:hover {
		color: ${props => props.theme.colorSecondary};
	}
`;
const NavLinks = styled.div`margin-right: 30px;`;

const StyledLink = styled.a`
	border: none;
	text-decoration: none;
	color: ${props => props.theme.colorWhite};
	color: inherit;
	font-size: inherit;
	cursor: pointer;
	&:not(:last-child) {
		margin-right: 2rem;
	}
	&:hover {
		color: ${props => props.theme.colorSecondary};
	}
`;

const Header = () => (
	<ThemeProvider theme={theme}>
		<User>
			{({ client, data }) => {
				console.log(data);
				return (
					<StyledNav>
						<NavBrand>
							<Link href='/'>
								<Brand>Recs</Brand>
							</Link>
						</NavBrand>

						{data && data.me ? (
							<NavLinks>
								<Link href='/friends'>
									<StyledLink>Friends</StyledLink>
								</Link>
								<Link href='/recs'>
									<StyledLink>Recs</StyledLink>
								</Link>
								<Signout>
									{signout => (
										<StyledLink
											as='button'
											onClick={async () => {
												await signout();

												client
													.resetStore()
													.then(() => Router.push('/login'));
											}}
										>
											Log out {data.me.username}
										</StyledLink>
									)}
								</Signout>
							</NavLinks>
						) : (
							<NavLinks>
								<Link href='/register'>
									<StyledLink>Sign Up</StyledLink>
								</Link>
								<Link href='/login'>
									<StyledLink>Sign In</StyledLink>
								</Link>
							</NavLinks>
						)}
					</StyledNav>
				);
			}}
		</User>
	</ThemeProvider>
);

export default Header;
