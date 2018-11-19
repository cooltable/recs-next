import Link from 'next/link';
import styled from 'styled-components';
import User from './User';

const StyledNav = styled.div`
	display: flex;
	align-items: center;
	padding: 3rem 0;
	background-color: ${props => props.theme.colorPrimary};
	color: ${props => props.theme.colorWhite};
`;

const NavBrand = styled.div`flex-grow: 1;`;

const Brand = styled.h2`
	display: inline;
	font-family: Charmonman;
	font-weight: 700;
	font-size: 40px;
	margin-left: 40px;
	&:hover {
		color: ${props => props.theme.colorSecondary};
	}
`;
const NavLinks = styled.div`margin-right: 30px;`;

const StyledLink = styled.a`
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
	<StyledNav>
		<NavBrand>
			<Link href='/'>
				<Brand>Recs</Brand>
			</Link>
		</NavBrand>
		<NavLinks>
			<Link href='/register'>
				<StyledLink>Sign Up</StyledLink>
			</Link>
			<Link href='/login'>
				<StyledLink>Sign In</StyledLink>
			</Link>
		</NavLinks>
	</StyledNav>
);

export default Header;
