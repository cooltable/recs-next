import React, { Component, Fragment } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from './Header';
import Meta from './Meta';

const theme = {
	colorPrimary: '#455a64',
	colorPrimaryLight: '#718792',
	colorPrimaryDark: '#1c313a',
	colorSecondary: '#ffab00',
	colorSecondaryLight: '#ffdd4b',
	colorSecondaryDark: '#c67c00',
	colorWhite: '#fff',
	colorBlack: '#000',
};

const GlobalStyle = createGlobalStyle`
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

html {
	font-size: 62.5%;
}

body {
	font-size: 1.6rem;
	font-family: "Open Sans", sans-serif;
	line-height: 1.5;
}

h1,
h2,
h3,
h4,
h5 {
	font-family: "Comfortaa", sans-serif;
	line-height: 1.5;
}
`;

class Page extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<div>
					<Meta />
					<Header />
					<GlobalStyle />
					<div>{this.props.children}</div>
				</div>
			</ThemeProvider>
		);
	}
}

export default Page;
