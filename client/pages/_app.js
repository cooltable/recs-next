import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { PageTransition } from 'next-page-transitions';
import { ThemeProvider } from 'styled-components';

import withData from '../lib/withData';
import Page from '../components/Page';
import Header from '../components/Header';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		// this exposes the query to the user
		pageProps.query = ctx.query;
		return { pageProps };
	}
	render() {
		const { Component, apollo, pageProps } = this.props;

		return (
			<Container>
				<ApolloProvider client={apollo}>
					<Header />
					<PageTransition timeout={300} classNames='page-transition'>
						<Page>
							<Component {...pageProps} />
						</Page>
					</PageTransition>
					<style jsx global>{`
						.page-transition-enter {
							opacity: 0;
							transform: translateX(-100px);
						}
						.page-transition-enter-active {
							opacity: 1;
							transition: all 300ms;
							transform: translateX(0);
						}
						.page-transition-exit {
							opacity: 1;
						}
						.page-transition-exit-active {
							opacity: 0;
							transition: opacity 300ms;
						}
					`}</style>
				</ApolloProvider>
			</Container>
		);
	}
}

export default withData(MyApp);
