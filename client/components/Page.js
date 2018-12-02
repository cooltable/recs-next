import React, { Component } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Color from "color";

import Meta from "./Meta";

export const theme = {
  colorPrimary: "#00ffae",
  colorPrimaryLight: Color("#00ffae")
    .lighten(0.2)
    .hsl()
    .string(),
  colorPrimaryDark: Color("#00ffae")
    .darken(0.2)
    .hsl()
    .string(),
  colorSecondary: "#ffab00",
  colorSecondaryLight: "#ffdd4b",
  colorSecondaryDark: "#c67c00",
  colorTertiary: "#ff00aa",
  colorTertiaryLight: Color("#ff00aa")
    .lighten(0.2)
    .hsl()
    .string(),
  colorTertiary: Color("#ff00aa")
    .darken(0.2)
    .hsl()
    .string(),
  colorWhite: "#eee",
  colorBlack: "#222",
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
          <GlobalStyle />
          <div>{this.props.children}</div>
        </div>
      </ThemeProvider>
    );
  }
}

export default Page;
