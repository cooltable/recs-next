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
};

const RecCategory = () => (
	<Wrapper>
		<h3>Movies</h3>
		<RecWrapper>
			<RecCard rec={rec} />
			<RecCard rec={rec} />
			<RecCard rec={rec} />
			<RecCard rec={rec} />
			<RecCard rec={rec} />
			<RecCard rec={rec} />
			<RecCard rec={rec} />
			<RecCard rec={rec} />
		</RecWrapper>
	</Wrapper>
);

export default RecCategory;
