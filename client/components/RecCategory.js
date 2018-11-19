import styled from 'styled-components';
import RecCard from './RecCard';

const Wrapper = styled.div`
	margin: 40px;

	h3 {
		text-align: left;
		text-transform: uppercase;
	}
`;

const RecWrapper = styled.div`
	display: flex;
	overflow: scroll;
	padding: 20px 0;
`;
const rec = {
	title: 'Bachelor in Paradise',
	description: 'best eva',
	status: 'NEW',
};
const rec3 = {
	title: 'Bachelor in Paradise',
	description: 'best eva',
	status: 'SEEN',
};
const rec2 = {
	title: 'Bachelor in Paradise',
	description: 'best eva',
	status: 'BOOKMARKED',
};

const RecCategory = () => (
	<Wrapper>
		<h3>Movies</h3>
		<RecWrapper>
			<RecCard rec={rec} />
			<RecCard rec={rec} />
			<RecCard rec={rec2} />
			<RecCard rec={rec2} />
			<RecCard rec={rec3} />
			<RecCard rec={rec3} />
			<RecCard rec={rec3} />
			<RecCard rec={rec3} />
		</RecWrapper>
	</Wrapper>
);

export default RecCategory;
