import Link from 'next/link';
import styled from 'styled-components';

const StyledNav = styled.div`
	display: flex;
	align-items: center;
	padding: 3rem 0;
	background-color: ${(props) => props.theme.colorPrimary};
	color: ${(props) => props.theme.colorWhite};
`;

const NavBrand = styled.div`flex-grow: 1;`;

const Brand = styled.h2`
	display: inline;
	font-family: Charmonman;
	font-weight: 700;
	font-size: 40px;
	margin-left: 40px;
	&:hover {
		color: ${(props) => props.theme.colorSecondary};
	}
`;
const NavLinks = styled.div`margin-right: 30px;`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 2rem;
  };
  &:hover {
		color: ${(props) => props.theme.colorSecondary};
	};
`;

const Header = () => (
	<StyledNav>
		<NavBrand>
			<Link href="/">
				<Brand>Recs</Brand>
			</Link>
		</NavBrand>
		<NavLinks>
			<StyledLink href="/register">
				<a>Sign Up</a>
			</StyledLink>
			<StyledLink href="/login">
				<a>Sign In</a>
			</StyledLink>
		</NavLinks>
	</StyledNav>
);

export default Header;
